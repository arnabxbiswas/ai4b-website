## BACKEND DEPLOYMENT STEPS

## Step 1: Install Caddy

Run the following commands to install Caddy on the server:

```
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /usr/share/keyrings/caddy-stable-archive-keyring.gpg > /dev/null
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
```

## Step 2: Create a tmux Session

Create a new tmux session to keep your backend running in the background:

```
tmux new -s backend_website
```

You can later reattach to this session using:

```
tmux attach -t backend_website
```

## Step 3: Create a Conda Environment

Create a Conda environment and install all dependencies from the `backend/requirements.txt` file.

```
conda create -n web_backend python=<your_python_version>
conda activate web_backend
pip install -r backend/requirements.txt
```

## Step 4: Install Gunicorn

Install Gunicorn in the environment:

```
pip install gunicorn
```

## Step 5: Configure Django Settings

In your `backend/settings.py` file, update the following configurations:

- Set `DEBUG=False`
- Add your domain or IP to `ALLOWED_HOSTS`
- Update `DATABASES` with your database credentials (or leave as default SQLite for local use)

Also, in your environment file (e.g., `.env`), include:

```
DJANGO_SETTINGS_MODULE=backend.settings
SECRET_KEY='replace-with-your-key'
```

Also configure the CORs and Reddis configuration as required in the `backend/settings.py`

```
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_HEADERS = {}
```

## Step 6: Run Database Migrations

In the backend directory, run the following command:

```

python manage.py migrate

```

## Step 7: Start Gunicorn

In the same tmux session (`backend_website`), start Gunicorn using:

```

gunicorn backend.wsgi

```

## Step 8: Configure Caddy

Create a Caddy configuration file at `backend/Caddyfile`. Replace placeholders with your actual paths and domain:

```

<your-domain-name> {
handle_path /static/\* {
file_server {
root "/<path-to-root-directory>/backend/static"
}
}

    handle_path /media/* {
    	file_server {
    		root "/<path-to-root-directory>/backend/media"
    	}
    }

    handle {
    	reverse_proxy <local-port-where-gunicorn-is-running>
    }

}

```

## Step 9: Run Caddy in the Background

Start Caddy manually in the background using:

```

sudo caddy start --config <root-dir-of-app>/backend/Caddyfile

```
