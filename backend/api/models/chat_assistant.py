import ollama

class OllamaInterface:
    def __init__(
        self, 
        model_name:str = "llama3"
    ):
        self.model_name = model_name

    def get_assistant_reponse(self, user_message, system_message):
        messages = [
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': user_message}
        ]
        response = ollama.chat(model=self.model_name, messages=messages)
        return response['message']['content']


    def list_models(self):
        return ollama.list()

    def show_model(self, model_name):
        return ollama.show(model_name)
    
if __name__ == "__main__":
    chat = OllamaInterface()
