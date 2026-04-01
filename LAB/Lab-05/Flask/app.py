from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # This sends data to the HTML template
    return render_template('index.html', message="Flask is active!")

if __name__ == '__main__':
    app.run(debug=True)