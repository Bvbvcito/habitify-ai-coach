import { LuBrainCircuit } from "react-icons/lu";
const ChatBot = ({
  habit_id,
  user_id,
}: {
  habit_id: string;
  user_id: string;
}) => {
  return (
    <>
      {/* If no task is selected, chatbot is idle */}
      {habit_id === "" && (
        <div className="flex  flex-col items-center">
          <div>
            <LuBrainCircuit className="h-12 w-12 text-slate-300 mb-4 animate-pulse" />
          </div>
          <div className="font-normal">Advisor is idle</div>
          <small>Please click on a task to get smart feedback</small>
        </div>
      )}

      {/* Display Chatbot if habit is selected */}

      {habit_id !== "" && (
        <div className="h-full w-full rounded-xl text-sm bg-black/40 p-4 text-gray-300 text-justify">
          {habit_id}
          <br />
          {user_id}
          La gastronomie est bien plus qu'une question de saveurs ; elle raconte
          l'histoire et les traditions d'un peuple. En parcourant les marchés
          locaux ou en partageant un repas en famille, on découvre des recettes
          transmises de génération en génération. Chaque plat, qu'il s'agisse
          d'une simple soupe ou d'un mets raffiné, porte en lui l'empreinte d'un
          terroir, d'une culture et de moments partagés. C'est ce patrimoine
          vivant qui fait de la cuisine un art universel, capable de réunir les
          cœurs autour d'une table. L'importance d
        </div>
      )}
    </>
  );
};

export default ChatBot;
