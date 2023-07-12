import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface memoProperty {
    data: any;
    isConnectable: any;
}

export default memo(({ data, isConnectable }: memoProperty) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="parents"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        id="siblings"
        position={Position.Left}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div>
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="marriedEngaged"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="parentOf"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
});
