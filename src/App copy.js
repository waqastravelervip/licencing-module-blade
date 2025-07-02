// To enable auto-layout, run: npm install dagre
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

const nodeWidth = 240;
const nodeHeight = 140;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, nodesep: 40, ranksep: 60 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
        sourcePosition: direction === 'LR' ? 'right' : 'bottom',
        targetPosition: direction === 'LR' ? 'left' : 'top',
      };
    }),
    edges,
  };
};

const nodes = [
  // Title
  {
    id: 'title',
    position: { x: 1100, y: 0 },
    data: {
      label: (
        <div style={{ fontWeight: 'bold', fontSize: 24, color: '#1a237e', textAlign: 'center' }}>
          <span role="img" aria-label="users">👥</span> Blade User Licensing
        </div>
      ),
    },
    style: {
      border: '2px solid #2196f3',
      background: '#fff',
      borderRadius: 10,
      padding: 12,
      minWidth: 340,
      boxShadow: '0 2px 8px #e3eafc',
    },
    draggable: false,
    type: 'input',
  },
  // Use Case 1 (left)
  {
    id: 'testcase',
    position: { x: 250, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e8f5e9', borderRadius: 10, padding: 12, border: '2px solid #43a047', textAlign: 'center' }}>
          <div style={{ color: '#43a047', fontWeight: 'bold', fontSize: 16 }}>✔ Use Case 1</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Successful Login within License Limit</div>
          <div style={{ fontSize: 13, color: '#333' }}>Max Concurrent Users: 2</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: {
      minWidth: 250,
    },
  },
  // Use Case 2 (middle left)
  {
    id: 'testcase2',
    position: { x: 900, y: 140 },
    data: {
      label: (
        <div style={{ background: '#fffde7', borderRadius: 10, padding: 12, border: '2px solid #ffd600', textAlign: 'center' }}>
          <div style={{ color: '#ffb300', fontWeight: 'bold', fontSize: 16 }}>✖ Use Case 2</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Login Denied Beyond License Limit</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: {
      minWidth: 250,
    },
  },
  // Use Case 3 (middle right)
  {
    id: 'testcase3',
    position: { x: 1500, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: 12, border: '2px solid #1976d2', textAlign: 'center' }}>
          <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 16 }}>🔄 Use Case 3</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Reclaim License on Logout</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: {
      minWidth: 250,
    },
  },
  // Use Case 4 (rightmost)
  {
    id: 'testcase4',
    position: { x: 2100, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e8f5e9', borderRadius: 10, padding: 12, border: '2px solid #43a047', textAlign: 'center' }}>
          <div style={{ color: '#43a047', fontWeight: 'bold', fontSize: 16 }}>✅ Use Case 4</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Module Access within Limit</div>
          <div style={{ fontSize: 13, color: '#333' }}>Stock = 2 users<br/>Picking = 1 user</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: {
      minWidth: 250,
    },
  },
  // Use Case 5 (rightmost)
  {
    id: 'testcase5',
    position: { x: 2700, y: 0 },
    data: {
      label: (
        <div style={{ background: '#ffebee', borderRadius: 10, padding: 12, border: '2px solid #d32f2f', textAlign: 'center' }}>
          <div style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: 16 }}>⛔ Use Case 5</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Module Access Denied on Limit</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: {
      minWidth: 250,
    },
  },
  // Use Case 6 (rightmost)
  {
    id: 'testcase6',
    position: { x: 3200, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: 12, border: '2px solid #1976d2', textAlign: 'center' }}>
          <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 16 }}>🔁 Use Case 6</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Same Module in New Tab (No Extra License Count)</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: {
      minWidth: 250,
    },
  },
  // Use Case 7 (rightmost)
  {
    id: 'testcase7',
    position: { x: 3700, y: 0 },
    data: {
      label: (
        <div style={{ background: '#fffde7', borderRadius: 10, padding: 12, border: '2px solid #ffd600', textAlign: 'center' }}>
          <div style={{ color: '#ffb300', fontWeight: 'bold', fontSize: 16 }}>⏰ Use Case 7</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Reclaim Module License on TTL Expiry</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: { minWidth: 250 },
  },
  // Use Case 8 (rightmost)
  {
    id: 'testcase8',
    position: { x: 4200, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e8f5e9', borderRadius: 10, padding: 12, border: '2px solid #43a047', textAlign: 'center' }}>
          <div style={{ color: '#43a047', fontWeight: 'bold', fontSize: 16 }}>✅ Use Case 8</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>License Retained by Heartbeat</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: { minWidth: 250 },
  },
  // Use Case 9 (rightmost)
  {
    id: 'testcase9',
    position: { x: 4700, y: 0 },
    data: {
      label: (
        <div style={{ background: '#fffde7', borderRadius: 10, padding: 12, border: '2px solid #ffd600', textAlign: 'center' }}>
          <div style={{ color: '#ff9800', fontWeight: 'bold', fontSize: 16 }}>⚠️ Use Case 9</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Redis Down, Fallback to DB</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: { minWidth: 250 },
  },
  // Use Case 10 (rightmost)
  {
    id: 'testcase10',
    position: { x: 5200, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: 12, border: '2px solid #1976d2', textAlign: 'center' }}>
          <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 16 }}>�� Use Case 10</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Redis Rehydration After Restart</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: { minWidth: 250 },
  },
  // Use Case 11 (rightmost)
  {
    id: 'testcase11',
    position: { x: 5700, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e8f5e9', borderRadius: 10, padding: 12, border: '2px solid #43a047', textAlign: 'center' }}>
          <div style={{ color: '#43a047', fontWeight: 'bold', fontSize: 16 }}>✅ Use Case 11</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Auto Logout on Row Deletion</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: { minWidth: 250 },
  },
  // Use Case 12 (rightmost)
  {
    id: 'testcase12',
    position: { x: 6200, y: 0 },
    data: {
      label: (
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: 12, border: '2px solid #1976d2', textAlign: 'center' }}>
          <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 16 }}>�� Use Case 12</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>License Downgrade</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: { minWidth: 250 },
  },
  // Use Case 13 (rightmost)
  {
    id: 'testcase13',
    position: { x: 6700, y: 0 },
    data: {
      label: (
        <div style={{ background: '#ffebee', borderRadius: 10, padding: 12, border: '2px solid #d32f2f', textAlign: 'center' }}>
          <div style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: 16 }}>�� Use Case 13</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Unlicensed Module Access</div>
        </div>
      ),
    },
    draggable: false,
    type: 'default',
    style: { minWidth: 250 },
  },
  // Use Case 1 Flow
  {
    id: 'userA',
    position: { x: 100, y: 200 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User A Login</div>
          <div style={{ fontSize: 12 }}>First user attempts login</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'userB',
    position: { x: 400, y: 200 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User B Login</div>
          <div style={{ fontSize: 12 }}>Second user attempts login</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'licenseA',
    position: { x: 100, y: 320 },
    data: {
      label: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>License Check</div>
          <div style={{ fontSize: 12 }}>Current: 0/2</div>
          <div style={{ color: '#388e3c', fontSize: 13 }}>✓ Within limit</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #bdbdbd',
      background: '#fff',
      borderRadius: 10,
      minWidth: 140,
    },
    draggable: false,
  },
  {
    id: 'licenseB',
    position: { x: 400, y: 320 },
    data: {
      label: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>License Check</div>
          <div style={{ fontSize: 12 }}>Current: 1/2</div>
          <div style={{ color: '#388e3c', fontSize: 13 }}>✓ Within limit</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #bdbdbd',
      background: '#fff',
      borderRadius: 10,
      minWidth: 140,
    },
    draggable: false,
  },
  {
    id: 'successA',
    position: { x: 100, y: 440 },
    data: {
      label: (
        <div style={{ color: '#388e3c', textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>✔</div>
          <div style={{ fontWeight: 'bold' }}>Login Success</div>
          <div style={{ fontSize: 12 }}>User A logged in</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #a5d6a7',
      background: '#e8f5e9',
      borderRadius: 10,
      minWidth: 140,
    },
    draggable: false,
  },
  {
    id: 'successB',
    position: { x: 400, y: 440 },
    data: {
      label: (
        <div style={{ color: '#388e3c', textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>✔</div>
          <div style={{ fontWeight: 'bold' }}>Login Success</div>
          <div style={{ fontSize: 12 }}>User B logged in</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #a5d6a7',
      background: '#e8f5e9',
      borderRadius: 10,
      minWidth: 140,
    },
    draggable: false,
  },
  {
    id: 'testPassed',
    position: { x: 250, y: 580 },
    data: {
      label: (
        <div style={{ background: '#e8f5e9', borderRadius: 10, padding: 12, border: '2px solid #43a047', textAlign: 'center' }}>
          <div style={{ color: '#43a047', fontWeight: 'bold' }}>✔ Test Passed</div>
          <div>Both users successfully logged in</div>
          <div style={{ fontSize: 12, color: '#333' }}>License limit: 2/2 used</div>
        </div>
      ),
    },
    draggable: false,
    type: 'output',
  },
  // Expected Results (directly below testPassed)
  {
    id: 'expected',
    position: { x: 250, y: 740 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
        </div>
      ),
    },
    draggable: false,
  },
  {
    id: 'postgres',
    position: { x: 150, y: 830 },
    data: {
      label: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🗄️</div>
          <div style={{ fontWeight: 'bold' }}>PostgreSQL</div>
          <div style={{ fontSize: 13 }}>current_users table</div>
          <div style={{ color: '#388e3c', fontSize: 13 }}>2 active records</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'redis',
    position: { x: 350, y: 830 },
    data: {
      label: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🗄️</div>
          <div style={{ fontWeight: 'bold', color: '#d32f2f' }}>Redis Cache</div>
          <div style={{ fontSize: 13 }}>Active users count</div>
          <div style={{ color: '#388e3c', fontSize: 13 }}>Shows: 2 users</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #ef9a9a',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  // Use Case 2 Flow
  {
    id: 'userC',
    position: { x: 890, y: 300 },
    data: {
      label: (
        <div style={{ color: '#b71c1c', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>Login User C</div>
          <div style={{ fontSize: 12 }}>Attempts login after A & B</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #ef9a9a',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'loginDenied',
    position: { x: 870, y: 420 },
    data: {
      label: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#d32f2f', fontWeight: 'bold' }}>Login Failed</div>
          <div style={{ fontSize: 13, color: '#b71c1c' }}>
            "Maximum concurrent user limit reached."
          </div>
          <div style={{ fontSize: 12, color: '#333' }}>
            No entry in <b>current_users</b>
          </div>
        </div>
      ),
    },
    style: {
      border: '2px solid #d32f2f',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 220,
    },
    draggable: false,
    type: 'output',
  },
  // Use Case 3 Flow
  {
    id: 'userBLogout',
    position: { x: 1500, y: 180 },
    data: {
      label: (
        <div style={{ color: '#1976d2', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🚪</div>
          <div style={{ fontWeight: 'bold' }}>User B Logs Out</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#e3f2fd',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'userCRetry',
    position: { x: 1500, y: 300 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User C Retries Login</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'successC',
    position: { x: 1500, y: 420 },
    data: {
      label: (
        <div style={{ color: '#388e3c', textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>✔</div>
          <div style={{ fontWeight: 'bold' }}>Login Success</div>
          <div style={{ fontSize: 12 }}>User C logged in</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #a5d6a7',
      background: '#e8f5e9',
      borderRadius: 10,
      minWidth: 140,
    },
    draggable: false,
  },
  // Use Case 3 Expected Results
  {
    id: 'expected3',
    position: { x: 1500, y: 540 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>User B's record removed from <b>current_users</b></div>
          <div style={{ fontSize: 13 }}>Redis key for User B deleted</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 4 Flow
  {
    id: 'userAStock',
    position: { x: 2000, y: 180 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User A opens Stock</div>
          <div style={{ fontSize: 12 }}>allowed</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'userBStock',
    position: { x: 2200, y: 180 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User B opens Stock</div>
          <div style={{ fontSize: 12 }}>allowed</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'expected4',
    position: { x: 2100, y: 320 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Both users get access.</div>
          <div style={{ fontSize: 13 }}>Redis keys created:</div>
          <div style={{ fontSize: 12 }}>module_access:&#123;tenant&#125;:stock:&#123;user_id&#125;</div>
          <div style={{ fontSize: 12 }}>module_counter:&#123;tenant&#125;:stock = 2</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 5 Flow
  {
    id: 'userCStock',
    position: { x: 2700, y: 180 },
    data: {
      label: (
        <div style={{ color: '#b71c1c', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User C opens Stock</div>
          <div style={{ fontSize: 12 }}>limit already reached</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #ef9a9a',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'deniedCStock',
    position: { x: 2700, y: 320 },
    data: {
      label: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#d32f2f', fontWeight: 'bold' }}>Access Denied</div>
          <div style={{ fontSize: 13, color: '#b71c1c' }}>"Module license limit reached."</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #d32f2f',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 220,
    },
    draggable: false,
    type: 'output',
  },
  // Use Case 6 Flow
  {
    id: 'userAStockTab2',
    position: { x: 3200, y: 180 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User A opens Stock (2nd tab)</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 170,
    },
    draggable: false,
  },
  {
    id: 'expected6',
    position: { x: 3200, y: 320 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Still only 1 license counted for User A.</div>
          <div style={{ fontSize: 13 }}>No additional Redis counter increment.</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 7 Flow
  {
    id: 'openModule7',
    position: { x: 3700, y: 180 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>Open Module</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'idleTTL7',
    position: { x: 3700, y: 300 },
    data: {
      label: (
        <div style={{ color: '#1976d2', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>💤</div>
          <div style={{ fontWeight: 'bold' }}>Tab idle &gt; TTL</div>
          <div style={{ fontSize: 12 }}>Wait for TTL expiry</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #1976d2',
      background: '#e3f2fd',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'redisExpiry7',
    position: { x: 3700, y: 420 },
    data: {
      label: (
        <div style={{ color: '#d32f2f', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🗄️</div>
          <div style={{ fontWeight: 'bold' }}>Check Redis Key Auto-Expiry</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #ef9a9a',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'expected7',
    position: { x: 3700, y: 540 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Key auto-deletes</div>
          <div style={{ fontSize: 13 }}>License counter decreases</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 8 Flow
  {
    id: 'openModule8',
    position: { x: 4200, y: 180 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>Open Module Tab</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'heartbeat8',
    position: { x: 4200, y: 300 },
    data: {
      label: (
        <div style={{ color: '#1976d2', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>💓</div>
          <div style={{ fontWeight: 'bold' }}>Heartbeat pings every 30s</div>
          <div style={{ fontSize: 12 }}>(via Angular service)</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #1976d2',
      background: '#e3f2fd',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'expected8',
    position: { x: 4200, y: 420 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>TTL gets refreshed</div>
          <div style={{ fontSize: 13 }}>License is not revoked</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 9 Flow
  {
    id: 'stopRedis9',
    position: { x: 4700, y: 180 },
    data: {
      label: (
        <div style={{ color: '#d32f2f', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🛑</div>
          <div style={{ fontWeight: 'bold' }}>Stop Redis</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #d32f2f',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'accessModule9',
    position: { x: 4700, y: 300 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>Access module or login</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'expected9',
    position: { x: 4700, y: 420 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Backend checks PostgreSQL</div>
          <div style={{ fontSize: 13 }}>Access granted/denied based on DB</div>
          <div style={{ fontSize: 13 }}>Logs show fallback triggered</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 10 Flow
  {
    id: 'restartRedis10',
    position: { x: 5200, y: 180 },
    data: {
      label: (
        <div style={{ color: '#1976d2', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔄</div>
          <div style={{ fontWeight: 'bold' }}>Restart Redis</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #1976d2',
      background: '#e3f2fd',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'triggerSync10',
    position: { x: 5200, y: 300 },
    data: {
      label: (
        <div style={{ color: '#1565c0', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔁</div>
          <div style={{ fontWeight: 'bold' }}>Trigger sync logic</div>
          <div style={{ fontSize: 12 }}>(background rehydration or on-demand check)</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #90caf9',
      background: '#f5faff',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'expected10',
    position: { x: 5200, y: 420 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Active license states reinserted into Redis from PostgreSQL</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 11 Flow
  {
    id: 'adminDelete11',
    position: { x: 5700, y: 180 },
    data: {
      label: (
        <div style={{ color: '#d32f2f', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🗑️</div>
          <div style={{ fontWeight: 'bold' }}>Admin deletes record from current_users</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #d32f2f',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'debeziumKafka11',
    position: { x: 5700, y: 300 },
    data: {
      label: (
        <div style={{ color: '#1976d2', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔔</div>
          <div style={{ fontWeight: 'bold' }}>Debezium detects delete → Kafka event</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #1976d2',
      background: '#e3f2fd',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'expected11',
    position: { x: 5700, y: 420 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Spring Boot service listens → revokes Keycloak session</div>
          <div style={{ fontSize: 13 }}>Redis keys for the user deleted</div>
          <div style={{ fontSize: 13 }}>User is forcibly logged out on the frontend</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 12 Flow
  {
    id: 'adminReduceLicense12',
    position: { x: 6200, y: 180 },
    data: {
      label: (
        <div style={{ color: '#d32f2f', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>⬇️</div>
          <div style={{ fontWeight: 'bold' }}>Admin reduces module license 2 → 1 in DB</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #d32f2f',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'redisSync12',
    position: { x: 6200, y: 300 },
    data: {
      label: (
        <div style={{ color: '#1976d2', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔄</div>
          <div style={{ fontWeight: 'bold' }}>Redis updated via sync job</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #1976d2',
      background: '#e3f2fd',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'expected12',
    position: { x: 6200, y: 420 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Excess users denied new sessions</div>
          <div style={{ fontSize: 13 }}>Existing users retained until TTL or logout</div>
        </div>
      ),
    },
    draggable: false,
  },
  // Use Case 13 Flow
  {
    id: 'userUnlicensed13',
    position: { x: 6700, y: 180 },
    data: {
      label: (
        <div style={{ color: '#b71c1c', textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🧑‍💻</div>
          <div style={{ fontWeight: 'bold' }}>User attempts unlicensed module (Transport)</div>
        </div>
      ),
    },
    style: {
      border: '2px solid #ef9a9a',
      background: '#ffebee',
      borderRadius: 10,
      minWidth: 260,
    },
    draggable: false,
  },
  {
    id: 'expected13',
    position: { x: 6700, y: 320 },
    data: {
      label: (
        <div style={{ background: '#ede7f6', borderRadius: 10, padding: 8, border: '2px solid #ab47bc', textAlign: 'center' }}>
          <div style={{ color: '#ab47bc', fontWeight: 'bold' }}>Expected Results</div>
          <div style={{ fontSize: 13 }}>Immediate denial</div>
          <div style={{ fontSize: 13 }}>No Redis key created</div>
        </div>
      ),
    },
    draggable: false,
  },
];

const edges = [
  // Use Case 1 flow
  { id: 'e-title-testcase', source: 'title', target: 'testcase', type: 'smoothstep', animated: true },
  { id: 'e-testcase-userA', source: 'testcase', target: 'userA', type: 'smoothstep', animated: true },
  { id: 'e-testcase-userB', source: 'testcase', target: 'userB', type: 'smoothstep', animated: true },
  { id: 'e-userA-licenseA', source: 'userA', target: 'licenseA', type: 'smoothstep', animated: true },
  { id: 'e-userB-licenseB', source: 'userB', target: 'licenseB', type: 'smoothstep', animated: true },
  { id: 'e-licenseA-successA', source: 'licenseA', target: 'successA', type: 'smoothstep', animated: true },
  { id: 'e-licenseB-successB', source: 'licenseB', target: 'successB', type: 'smoothstep', animated: true },
  { id: 'e-successA-testPassed', source: 'successA', target: 'testPassed', type: 'smoothstep', animated: true },
  { id: 'e-successB-testPassed', source: 'successB', target: 'testPassed', type: 'smoothstep', animated: true },
  // Connect testPassed to expected (now directly below)
  { id: 'e-testPassed-expected', source: 'testPassed', target: 'expected', type: 'smoothstep', animated: true },
  { id: 'e-expected-postgres', source: 'expected', target: 'postgres', type: 'smoothstep', animated: true },
  { id: 'e-expected-redis', source: 'expected', target: 'redis', type: 'smoothstep', animated: true },
  // Use Case 2 flow
  { id: 'e-title-testcase2', source: 'title', target: 'testcase2', type: 'smoothstep', animated: true },
  { id: 'e-testcase2-userC', source: 'testcase2', target: 'userC', type: 'smoothstep', animated: true },
  { id: 'e-userC-loginDenied', source: 'userC', target: 'loginDenied', type: 'smoothstep', animated: true },
  // Use Case 3 flow
  { id: 'e-title-testcase3', source: 'title', target: 'testcase3', type: 'smoothstep', animated: true },
  { id: 'e-testcase3-userBLogout', source: 'testcase3', target: 'userBLogout', type: 'smoothstep', animated: true },
  { id: 'e-userBLogout-userCRetry', source: 'userBLogout', target: 'userCRetry', type: 'smoothstep', animated: true },
  { id: 'e-userCRetry-successC', source: 'userCRetry', target: 'successC', type: 'smoothstep', animated: true },
  { id: 'e-successC-expected3', source: 'successC', target: 'expected3', type: 'smoothstep', animated: true },
  // Use Case 4 flow
  { id: 'e-title-testcase4', source: 'title', target: 'testcase4', type: 'smoothstep', animated: true },
  { id: 'e-testcase4-userAStock', source: 'testcase4', target: 'userAStock', type: 'smoothstep', animated: true },
  { id: 'e-testcase4-userBStock', source: 'testcase4', target: 'userBStock', type: 'smoothstep', animated: true },
  { id: 'e-userAStock-expected4', source: 'userAStock', target: 'expected4', type: 'smoothstep', animated: true },
  { id: 'e-userBStock-expected4', source: 'userBStock', target: 'expected4', type: 'smoothstep', animated: true },
  // Use Case 5 flow
  { id: 'e-title-testcase5', source: 'title', target: 'testcase5', type: 'smoothstep', animated: true },
  { id: 'e-testcase5-userCStock', source: 'testcase5', target: 'userCStock', type: 'smoothstep', animated: true },
  { id: 'e-userCStock-deniedCStock', source: 'userCStock', target: 'deniedCStock', type: 'smoothstep', animated: true },
  // Use Case 6 flow
  { id: 'e-title-testcase6', source: 'title', target: 'testcase6', type: 'smoothstep', animated: true },
  { id: 'e-testcase6-userAStockTab2', source: 'testcase6', target: 'userAStockTab2', type: 'smoothstep', animated: true },
  { id: 'e-userAStockTab2-expected6', source: 'userAStockTab2', target: 'expected6', type: 'smoothstep', animated: true },
  // Use Case 7 flow
  { id: 'e-title-testcase7', source: 'title', target: 'testcase7', type: 'smoothstep', animated: true },
  { id: 'e-testcase7-openModule7', source: 'testcase7', target: 'openModule7', type: 'smoothstep', animated: true },
  { id: 'e-openModule7-idleTTL7', source: 'openModule7', target: 'idleTTL7', type: 'smoothstep', animated: true },
  { id: 'e-idleTTL7-redisExpiry7', source: 'idleTTL7', target: 'redisExpiry7', type: 'smoothstep', animated: true },
  { id: 'e-redisExpiry7-expected7', source: 'redisExpiry7', target: 'expected7', type: 'smoothstep', animated: true },
  // Use Case 8 flow
  { id: 'e-title-testcase8', source: 'title', target: 'testcase8', type: 'smoothstep', animated: true },
  { id: 'e-testcase8-openModule8', source: 'testcase8', target: 'openModule8', type: 'smoothstep', animated: true },
  { id: 'e-openModule8-heartbeat8', source: 'openModule8', target: 'heartbeat8', type: 'smoothstep', animated: true },
  { id: 'e-heartbeat8-expected8', source: 'heartbeat8', target: 'expected8', type: 'smoothstep', animated: true },
  // Use Case 9 flow
  { id: 'e-title-testcase9', source: 'title', target: 'testcase9', type: 'smoothstep', animated: true },
  { id: 'e-testcase9-stopRedis9', source: 'testcase9', target: 'stopRedis9', type: 'smoothstep', animated: true },
  { id: 'e-stopRedis9-accessModule9', source: 'stopRedis9', target: 'accessModule9', type: 'smoothstep', animated: true },
  { id: 'e-accessModule9-expected9', source: 'accessModule9', target: 'expected9', type: 'smoothstep', animated: true },
  // Use Case 10 flow
  { id: 'e-title-testcase10', source: 'title', target: 'testcase10', type: 'smoothstep', animated: true },
  { id: 'e-testcase10-restartRedis10', source: 'testcase10', target: 'restartRedis10', type: 'smoothstep', animated: true },
  { id: 'e-restartRedis10-triggerSync10', source: 'testcase10', target: 'triggerSync10', type: 'smoothstep', animated: true },
  { id: 'e-triggerSync10-expected10', source: 'triggerSync10', target: 'expected10', type: 'smoothstep', animated: true },
  // Use Case 11 flow
  { id: 'e-title-testcase11', source: 'title', target: 'testcase11', type: 'smoothstep', animated: true },
  { id: 'e-testcase11-adminDelete11', source: 'testcase11', target: 'adminDelete11', type: 'smoothstep', animated: true },
  { id: 'e-adminDelete11-debeziumKafka11', source: 'adminDelete11', target: 'debeziumKafka11', type: 'smoothstep', animated: true },
  { id: 'e-debeziumKafka11-expected11', source: 'debeziumKafka11', target: 'expected11', type: 'smoothstep', animated: true },
  // Use Case 12 flow
  { id: 'e-title-testcase12', source: 'title', target: 'testcase12', type: 'smoothstep', animated: true },
  { id: 'e-testcase12-adminReduceLicense12', source: 'testcase12', target: 'adminReduceLicense12', type: 'smoothstep', animated: true },
  { id: 'e-adminReduceLicense12-redisSync12', source: 'adminReduceLicense12', target: 'redisSync12', type: 'smoothstep', animated: true },
  { id: 'e-redisSync12-expected12', source: 'redisSync12', target: 'expected12', type: 'smoothstep', animated: true },
  // Use Case 13 flow
  { id: 'e-title-testcase13', source: 'title', target: 'testcase13', type: 'smoothstep', animated: true },
  { id: 'e-testcase13-userUnlicensed13', source: 'testcase13', target: 'userUnlicensed13', type: 'smoothstep', animated: true },
  { id: 'e-userUnlicensed13-expected13', source: 'userUnlicensed13', target: 'expected13', type: 'smoothstep', animated: true },
];

const layouted = getLayoutedElements(nodes, edges, 'TB'); // 'TB' for top-bottom layout

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f5f7fa' }}>
      <ReactFlow nodes={layouted.nodes} edges={layouted.edges} fitView>
        <Background variant="dots" gap={16} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
