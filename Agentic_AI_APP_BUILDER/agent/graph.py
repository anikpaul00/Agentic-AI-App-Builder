from dotenv import load_dotenv

load_dotenv()
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph
from agent.states import *
from agent.prompts import *
from agent.tools import write_file, read_file, get_current_directory, list_project_files
from langchain.agents import create_agent
from langgraph.constants import END
import json
import os

google_api_key = os.getenv("GOOGLE_API_KEY")


#llm = ChatGroq(model="llama-3.3-70b-versatile", max_tokens=10000)
#llm = ChatGroq(model="openai/gpt-oss-20b")
llm = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite-preview", google_api_key=google_api_key)

# this works as a team of software devs
coder_tools = [read_file, write_file, list_project_files, get_current_directory]
react_agent = create_agent(llm, coder_tools)


# planner agent
def planner_agent(state: dict) -> dict:
    user_prompt = state["user_prompt"]
    resp = llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt))
    # Plan = Schema class & planner_prompt is the prompt inside invoke

    if resp is None:
        raise ValueError("Planner did not return a valid response.")

    return {"plan": resp}

# architect agent
def architect_agent(state: dict) -> dict:
    plan: Plan = state["plan"]

    resp = llm.with_structured_output(TaskPlan).invoke(architect_prompt(plan=plan.model_dump_json()))

    if resp is None:
        raise ValueError("Planner did not return a valid response.")

    resp.plan = plan # for preserving the past knowledge with new knowledge
    print(resp.model_dump_json())
    return{"task_plan": resp}

# coder agent
def coder_agent(state: dict) -> dict:
    coder_state: CoderState = state.get("coder_state")
    if coder_state is None:
        coder_state = CoderState(task_plan=state["task_plan"], current_step_idx=0)
    steps = coder_state.task_plan.implementation_steps
    if coder_state.current_step_idx >= len(steps):
        return {"coder_state": coder_state, "status": "DONE"}

    current_task = steps[coder_state.current_step_idx]
    # existing_content = read_file(current_task.filepath)
    existing_content = read_file.invoke({"path": current_task.filepath})

    system_prompt = coder_system_prompt()

    user_prompt = (
        f"Task : {current_task.task_description}\n"
        f"File: {current_task.filepath}\n"
        f"Existing content:\n {existing_content}\n"
        "Use write_file(path, content) to save your changes."
    )

    react_agent.invoke({"messages": [{"role": "system", "content": system_prompt},
                                     {"role": "user", "content": user_prompt}]})

    coder_state.current_step_idx += 1
    return {"coder_state": coder_state}


# graph part begins here.....boom boom!
graph = StateGraph(dict)

graph.add_node("planner", planner_agent)
graph.add_node("architect", architect_agent)
graph.add_node("coder", coder_agent)

graph.add_edge("planner", "architect")
graph.add_edge("architect", "coder")

def route_fn(state):
    return "END" if state.get("status") == "DONE" else "coder"
graph.add_conditional_edges(
    "coder",
    path = route_fn,
    path_map={"END": END, "coder": "coder"}, # here, string for routing and END function for execution
)

graph.set_entry_point("planner")
agent = graph.compile()

if __name__ == "__main__":
    result = agent.invoke({"user_prompt": "Build a simple web-based calculator."},
                          config={"recursion_limit": 100})
    print("Final state:", result)

