from flask import Flask, request, jsonify
from redis import Redis

app = Flask(__name__)
redis_client = Redis(host='localhost', port=6379, db=0)

@app.route('/recommendations/<int:user_id>', methods=['GET'])
def recommend(user_id):
    cache_key = f"user_recommendations_{user_id}"
    
    # Check if recommendations are in cache
    cached_data = redis_client.get(cache_key)
    if cached_data:
        return jsonify({"recommendations": cached_data.decode('utf-8'), "source": "cache"})

    # If not in cache, compute recommendations
    recommendations = "dsadasd"

    # Store recommendations in cache for 30 minutes
    redis_client.set(cache_key, json.dumps(recommendations), ex=1800)

    return jsonify({"recommendations": recommendations, "source": "computed"})

if __name__ == '__main__':
    app.run(debug=True)
