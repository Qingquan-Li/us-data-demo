from app import app

if __name__ == '__main__':
    # Enable hot reloading and shows Python errors in the browser:
    # app.run(debug=True)
    # debug should be False in production:
    app.run(debug=False)
