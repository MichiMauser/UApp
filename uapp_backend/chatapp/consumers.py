import json

from channels.generic.websocket import WebsocketConsumer


class MyConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(text_data= json.dumps({
            'message': 'GeekForGeeks'
        }))
        
    def disconnect(self, code):
        pass
    
    def receive(self, text_data):
        pass