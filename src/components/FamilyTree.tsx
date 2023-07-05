import { useEffect, useState ,useCallback } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';


import 'reactflow/dist/style.css';
import { useSelector } from 'react-redux';


const initialNodes = [
    { id: '1', position: { x: 50, y: 100 }, data: { label: 'Character->' } ,type: 'input'},
    { id: '2', position: { x: 50, y: 200 }, data: { label: 'Relations' }, type:'output' },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  interface ArrayItem {
    key: string;
    value: string;
  }


const FamilyTree = () => {

    const treeObect = useSelector((state:any) => state.treeObect);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const[gotTreeDestructuredObject, setGotTreeDestructuredObject] = useState<ArrayItem[]>([{
    key:'',
    value:''
  }])

  useEffect(() => {

    if (treeObect.length !== 0 && treeObect[0].charactername) {
        const array = [];
      
        for (const key in treeObect[0].characters) {
          if (key === "characterImageFull" || key === "characterImageThumb" || key === "actorLink" || key === "characterLink") {
            continue; // Skip the current iteration if the key is "characterImageFull"
          }
      
          const value = treeObect[0].characters[key];
      
          if (Array.isArray(value)) {
            const concatenatedValue = value.join(", ");
            array.push({ key, value: concatenatedValue });
          } else {
            array.push({ key, value });
          }
        }
      
        setGotTreeDestructuredObject(array);
      }
  }, [treeObect.length !== 0 && treeObect[0].charactername]);

  useEffect(()=> {

    if(treeObect.length !== 0 && treeObect[0].charactername){

          const generateRandomPosition = (centerX: number, centerY: number, radius: number) => {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * radius;
            const x = centerX + distance * Math.cos(angle);
            const y = centerY + distance * Math.sin(angle);
            return { x, y };
          };
       
    
    
          const updatedNodes = gotTreeDestructuredObject.map((obj, index) => {
            const { x, y } = generateRandomPosition(50, 100, 500);
            return {
              id: `${index + 2}`,
              position: { x, y },
              data: { label: `${obj.value}` },
              type: 'output',
            };
        });
    
            const edges = gotTreeDestructuredObject.map((obj, index)=> ({
                id: `e1-${index+2}`, source: '1', target: `${index+2}`, label: `${obj.key}`,animated: true
            }))
          
            const additionalNode = {
              id: '1',
              position: { x: 50, y: 100 },
              data: { label: `${treeObect[0].charactername}` },
              type: 'input',
            };
          
            const updatedNodesWithAdditionalNode = [additionalNode, ...updatedNodes];
          
            setNodes(updatedNodesWithAdditionalNode);
            setEdges(edges);
    
    }
    
  },[gotTreeDestructuredObject])


  return (
    <div style={{ width: 'auto', height: '350px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <h2>{treeObect.length === 0 ? "Select a Character" : treeObect[0].charactername}</h2>
        <Background gap={12} size={1} color="blueViolet"/>
      </ReactFlow>
    </div>
  );
}

export default FamilyTree
