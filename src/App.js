import * as React from "react";
import "./App.css";
import Tree from "react-d3-tree";
import { useEffect, useState } from "react";

function App() {
  const [injectedNodeNum, setInjectedNodeNum] = useState(0);
  const [tree, setTree] = useState({
    name: "Root",
    id: Math.random(),
    children: [],
  });
  useEffect(() => {}, [tree]);

  function getNode(id, currNode) {
    if (id === currNode.id) return currNode;
    if (currNode.children !== undefined && currNode.children !== null) {
      for (let i = 0; i < currNode.children.length; i++) {
        const foundNode = getNode(id, currNode.children[i]);
        if (foundNode !== undefined && foundNode !== null) {
          return foundNode;
        }
      }
    }
    return null;
  }

  function handleAddNode(datum) {
    const tempTree = Object.assign({}, tree);
    const nextData = getNode(datum.data.id, tempTree);
    const target = nextData.children;
    const inn = injectedNodeNum + 1;
    setInjectedNodeNum(inn);

    target.push({
      name: `Inserted Node ${injectedNodeNum}`,
      id: Math.random(),
      children: [],
    });
    setTree(tempTree);
  }

  //@ts-ignore
  return (
    <div
      id="treeWrapper"
      style={{ marginLeft:"10em", padding: "10em", width: "500em", height: "500em" }}
    >
      <Tree
        style={{ padding: "100em" }}
        data={tree}
        onNodeClick={handleAddNode}
      />
    </div>
  );
}

export default App;
