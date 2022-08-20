from flask import Flask, Response, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def main_page():
    return Response(headers={'Access-Control-Allow-Origin': "*"})

#dicti = {"PlayerName": "Test", "Wins": 20, "Points": 22}
lst = []

@app.route("/user", methods=["GET", "POST"])
def get_details():
    data = request.get_json(silent=True)
    playerW = data["winner"]
    found = False
    for dictio in lst:
        if dictio["PlayerName"] == playerW:
            found = True
            dictio["Wins"] = dictio["Wins"] + 1
            dictio["Points"] = dictio["Points"] + data["points"]
    if found == False:
        lst.append({"PlayerName": playerW, "Wins": 1, "Points": data["points"]})
    return lst

if __name__ == "__main__":
    app.run(host="localhost", port=3001, debug=True)