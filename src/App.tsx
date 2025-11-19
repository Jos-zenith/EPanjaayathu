import { ChatInterface } from './components/ChatInterface';
import { ChatbotService } from './services/chatbotService';
import intentsData from './assets/intents.json';

const chatbotService = new ChatbotService(intentsData);

function App() {
  return <ChatInterface chatbotService={chatbotService} />;
}

export default App;
