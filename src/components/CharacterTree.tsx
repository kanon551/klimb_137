import { useEffect, useState ,useCallback } from 'react';
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
  } from 'reactflow';
  import CustomCharcterHandleNode from './CustomCharcterHandleNode';
import { getAllHouseNamesAPI, getTree } from '../global/GlobalAPI';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

  const nodeTypes = {
    selectorNode: CustomCharcterHandleNode,
  };

  const initialNodes = [
    { id: '1', data: { label: 'Father' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Mother' }, position: { x: 400, y: 100 } },
    { id: '3', data: { label: 'Character' }, position: { x: 250, y: 250 } },
    { id: '4', data: { label: 'Character Sibling 1' }, position: { x: 100, y: 400 } },
    { id: '5', data: { label: 'Character Sibling 2' }, position: { x: 400, y: 400 } },
    { id: '6', data: { label: 'Character Child 1' }, position: { x: 100, y: 600 } },
    { id: '7', data: { label: 'Character Child 2' }, position: { x: 400, y: 600 } },
    { id: '8', data: { label: 'Character Marriage' }, position: { x: 250, y: 750 } },
  ];
  const initialEdges = [
    { id: 'e1-3', source: '1', target: '3', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e1-4', source: '1', target: '4', animated: true },
    { id: 'e2-5', source: '2', target: '5', animated: true },
    { id: 'e3-6', source: '3', target: '6', animated: true },
    { id: 'e3-7', source: '3', target: '7', animated: true },
    { id: 'e3-8', source: '3', target: '8', animated: true },
  ];

  


const CharacterTree = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
    const [familyData1, setFamilyData1] = useState([]);
    const [houseNames, setHouseNames] = useState<string[]>([]);

    const [nodePositions, setNodePositions] = useState<{ [key: string]: any }>({});
     
    const [selectedHouseName, setSelectedHouseName] = useState<string | null>('');

    const handleHouseNameSelection = (event: any, newValue: string | null) => {

      setSelectedHouseName(newValue);
      if(newValue !== null){
        getTreeAPI(newValue);
      }
      
      
    };


    useEffect(()=> {
        getHouseNames();
    },[])

    const getHouseNames = async()=> {
        try {
          const gotHouseNames = await getAllHouseNamesAPI();
          setHouseNames(gotHouseNames);
          setSelectedHouseName(gotHouseNames[0]);
          getTreeAPI(gotHouseNames[0]);
        } catch (error) {
          console.error("Failed to fetch HouseNames:", error);
          // Handle the error (e.g., display an error message)
        }
    
       
      }

    const getTreeAPI = async(houseName: string)=> {
        try {
            if(selectedHouseName !== null){
                const gotTree = await getTree(houseName);
                console.log(gotTree)
                  setFamilyData1(gotTree);
            }
            
          } catch (error) {
            console.error("Failed to fetch Tree", error);
            // Handle the error (e.g., display an error message)
          }
    }
    
    useEffect(() => {
        const mainNodes:any = []; // Declare mainNodes array here

        let mainCharacter = 1;
        let sideCharacter = 1;
        let lastCharacter = 1;
      const nodeMap = new Map();
      const edgeList:any = [];

      // Create nodes
      familyData1.forEach((member:any) => {
        const nodeId = member.characterName;
        const node = {
          id: nodeId,
          data: { label: nodeId },
          type: 'default',
          position: calculateNodePosition(member, nodeMap),
        };

        nodeMap.set(nodeId, node);

        for (const key in member) {
          if (key !== 'houseName' && Array.isArray(member[key])) {
            member[key].forEach((value:any) => {
              if (!nodeMap.has(value)) {
                const node = {
                  id: value,
                  data: { label: value },
                  type: 'default',
                  position: calculateNodePosition(member, nodeMap),
                };
                nodeMap.set(value, node);
              }
            });
          }
        }
      });
    
      // Create edges with labels
      const edgeMap = new Map(); // Map to track duplicate edges
    
      familyData1.forEach((member:any) => {
        const nodeId = member.characterName;
    
        member.parents.forEach((parent:any) => {
          const edgeId = `${parent}-${nodeId}`;
          const label = 'parent';
    
          if (!edgeMap.has(edgeId)) {
            const edge = {
              id: edgeId,
              source: parent,
              target: nodeId,
              type: 'default',
              label: label,
              animated: true,
            };
    
            edgeMap.set(edgeId, true);
            edgeList.push(edge);
          }
        });

        member.parentOf.forEach((child:any) => {
          const edgeId = `${nodeId}-${child}`;
          const label = 'parentOf';
    
          if (!edgeMap.has(edgeId)) {
            const edge = {
              id: edgeId,
              source: nodeId,
              target: child,
              type: 'default',
              label: label,
              animated: true,
            };
    
            edgeMap.set(edgeId, true);
            edgeList.push(edge);
          }
        });
    
        member.siblings.forEach((sibling:any) => {
          const edgeId1 = `${nodeId}-${sibling}`;
          const edgeId2 = `${sibling}-${nodeId}`;
          const label = 'sibling';
    
          if (!edgeMap.has(edgeId1) && !edgeMap.has(edgeId2)) {
            const edge = {
              id: edgeId1,
              source: nodeId,
              target: sibling,
              type: 'default',
              label: label,
              animated: true,
            };
    
            edgeMap.set(edgeId1, true);
            edgeList.push(edge);
          }
        });

        
    
        member.marriedEngaged.forEach((spouse:any) => {
          const edgeId = `${nodeId}-${spouse}`;
          const label = 'married/engaged';
    
          if (!edgeMap.has(edgeId)) {
            const edge = {
              id: edgeId,
              source: nodeId,
              target: spouse,
              type: 'default',
              label: label,
              animated: true,
            };
    
            edgeMap.set(edgeId, true);
            edgeList.push(edge);
          }
        });
      });
    
      setNodes(Array.from(nodeMap.values()));
      setEdges(edgeList);

     

  function calculateNodePosition(member:any, nodeMap:any) {
    if (member.parents.length === 0 && !mainNodes.includes(member.characterName)) {
      const x = mainCharacter * 400;
      const y = 100;
      mainCharacter++;
      mainNodes.push(member.characterName);
      return { x, y };
    } else if(!mainNodes.includes(member.characterName)){
        console.log(member)
        const x = sideCharacter * 250;
        const y = 350;
        sideCharacter++;
        mainNodes.push(member.characterName);
      return { x, y };
    }
    else{
        const x = lastCharacter * 200;
        const y = 650;
        lastCharacter++;
        return {x,y};
    }
  }


    }, [familyData1]);
    
    
      const handleGetPositionClick = () => {
    const positions: { [key: string]: any } = {};
    nodes.forEach((node) => {
      positions[node.id] = node.position;
    });
    setNodePositions(positions);
  };
  
  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  console.log(selectedHouseName)

  return (
    <div style={{ height: '500px', width: '800px' }}>
      <ReactFlow 
       nodes={nodes}
       edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       onConnect={onConnect}
       nodeTypes={nodeTypes}
       fitView
       >
        <Background gap={12} size={1} color="blueViolet"/>
      </ReactFlow>
      <Autocomplete
                      sx={{marginBottom:'2vh'}}
                      fullWidth
                      value={selectedHouseName}
                      onChange={handleHouseNameSelection}
                      id="controllable-states-demo"
                      options={houseNames}
                      renderInput={(params) => <TextField {...params} label="Filter by HouseName" sx={{background:'white'}}/>}
                      />
      <button onClick={handleGetPositionClick}>Get Node Positions</button>
      <pre>{JSON.stringify(nodePositions, null, 2)}</pre>

    </div>
  );
};

export default CharacterTree;
