import './style.css';
import EventSourceChat from './event-source';
import LongPollingChat from './long-polling';

const App = () => {

  return (
    <LongPollingChat />
    // або <EventSourceChat />
  );
};

export default App;
