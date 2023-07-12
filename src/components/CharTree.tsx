import { useEffect, useState ,useCallback } from 'react';
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
  } from 'reactflow';

const data = [
    {
        characterName: "Alton Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [],
        parentOf: [],
        siblings: [],
        marriedEngaged: []
    },
    {
        characterName: "Cersei Lannister",
        houseName: [
            "Lannister",
            "Baratheon"
        ],
        parents: [
            "Tywin Lannister"
        ],
        parentOf: [
            "Joffrey Baratheon",
            "Myrcella Baratheon",
            "Tommen Baratheon"
        ],
        siblings: [
            "Jaime Lannister",
            "Tyrion Lannister"
        ],
        marriedEngaged: [
            "Robert Baratheon"
        ]
    },
    {
        characterName: "Jaime Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [
            "Tywin Lannister"
        ],
        parentOf: [
            "Joffrey Baratheon",
            "Myrcella Baratheon",
            "Tommen Baratheon"
        ],
        siblings: [
            "Cersei Lannister",
            "Tyrion Lannister"
        ],
        marriedEngaged: []
    },
    {
        characterName: "Kevan Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [],
        parentOf: [
            "Lancel Lannister",
            "Martyn Lannister",
            "Willem Lannister"
        ],
        siblings: [
            "Tywin Lannister"
        ],
        marriedEngaged: []
    },
    {
        characterName: "Lancel Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [
            "Kevan Lannister"
        ],
        parentOf: [],
        siblings: [
            "Martyn Lannister",
            "Willem Lannister"
        ],
        marriedEngaged: []
    },
    {
        characterName: "Martyn Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [
            "Kevan Lannister"
        ],
        parentOf: [],
        siblings: [
            "Lancel Lannister",
            "Willem Lannister"
        ],
        marriedEngaged: []
    },
    {
        characterName: "Tyrion Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [
            "Tywin Lannister"
        ],
        parentOf: [],
        siblings: [
            "Cersei Lannister",
            "Jaime Lannister"
        ],
        marriedEngaged: [
            "Sansa Stark"
        ]
    },
    {
        characterName: "Tywin Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [],
        parentOf: [
            "Cersei Lannister",
            "Jaime Lannister",
            "Tyrion Lannister"
        ],
        siblings: [],
        marriedEngaged: []
    },
    {
        characterName: "Willem Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [
            "Kevan Lannister"
        ],
        parentOf: [],
        siblings: [
            "Lancel Lannister",
            "Martyn Lannister"
        ],
        marriedEngaged: []
    },
    {
        characterName: "Young Cersei Lannister",
        houseName: [
            "Lannister"
        ],
        parents: [],
        parentOf: [],
        siblings: [],
        marriedEngaged: []
    }
];

const CharTree = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const createNode = (id:any, label:any) => {
    return {
      id,
      data: { label },
      position: { x: 0, y: 0 }, // Adjust position as needed
    };
  };

  const createEdge = (source:any, target:any) => {
    return {
      id: `${source}-${target}`,
      source,
      target,
      animated: true,
    };
  };

  const processCharacter = (character:any) => {
    // Create character node
    const characterNode = createNode(character.characterName, character.characterName);
    nodes.push(characterNode);

    // Create nodes for parents
    character.parents.forEach((parent:any) => {
      const parentNode = createNode(parent, parent);
      nodes.push(parentNode);

      // Create edge from parent to character
      const edge = createEdge(parent, character.characterName);
      edges.push(edge);
    });

    // Create nodes for children
    character.parentOf.forEach((child:any) => {
      const childNode = createNode(child, child);
      nodes.push(childNode);

      // Create edge from character to child
      const edge = createEdge(character.characterName, child);
      edges.push(edge);
    });

    // Create nodes for siblings
    character.siblings.forEach((sibling:any) => {
      const siblingNode = createNode(sibling, sibling);
      nodes.push(siblingNode);

      // Create edge from sibling to character
      const edge = createEdge(sibling, character.characterName);
      edges.push(edge);
    });

    // Create nodes for married/engaged partners
    character.marriedEngaged.forEach((partner:any) => {
      const partnerNode = createNode(partner, partner);
      nodes.push(partnerNode);

      // Create edge from character to partner
      const edge = createEdge(character.characterName, partner);
      edges.push(edge);
    });
  };

  const processCharacters = () => {
    data.forEach((character:any) => {
      processCharacter(character);
    });
  };

  useEffect(()=> {
    processCharacters();
  },[])
  
  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ height: '500px', width: '800px' }}>
      <ReactFlow 
       nodes={nodes}
       edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       onConnect={onConnect}
       fitView
       >
        <Background gap={12} size={1} color="blueViolet"/>
      </ReactFlow>
    </div>
  );
};

export default CharTree;
