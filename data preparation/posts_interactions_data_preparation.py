import pandas as pd
import numpy as np
import random

num_users = 11 
num_posts = 52
max_posts_seen = 30 
max_posts_liked = 29

user_ids = np.arange(1, num_users + 1)
post_ids = np.arange(1, num_posts + 1)

data = []
for user_id in user_ids:
    num_seen_posts = random.randint(10, max_posts_seen)  
    seen_posts = np.random.choice(post_ids, num_seen_posts, replace=False) 
    
    for post in seen_posts:
        data.append([user_id, post])

df_seen = pd.DataFrame(data, columns=['users_id', 'posts_id'])
df_seen.to_csv('users_posts_seen.csv', index=False)

df_liked = df_seen.groupby('users_id').apply(lambda x: x.sample(min(len(x), random.randint(5, max_posts_liked)))).reset_index(drop=True)
df_liked.to_csv('users_posts_liked.csv', index=False)

print('Data saved: users_posts_seen.csv and users_posts_liked.csv')
