#!/usr/bin/env python3
"""
Simple startup script for development
"""

import os
import sys
import subprocess

def main():
    """Start the development server"""
    print("🚀 Starting MyApp GraphQL Backend...")
    
    # Check if virtual environment exists
    if not os.path.exists("venv"):
        print("📦 Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", "venv"])
    
    # Activate virtual environment and install dependencies
    if os.name == 'nt':  # Windows
        activate_script = "venv\\Scripts\\activate"
        pip_path = "venv\\Scripts\\pip"
        python_path = "venv\\Scripts\\python"
    else:  # Unix/Linux/MacOS
        activate_script = "venv/bin/activate"
        pip_path = "venv/bin/pip"
        python_path = "venv/bin/python"
    
    print("📦 Installing dependencies...")
    subprocess.run([pip_path, "install", "-r", "requirements.txt"])
    
    print("🗄️  Initializing database...")
    subprocess.run([python_path, "-c", "from packages.dyna_modules.database import init_db; init_db()"])
    
    print("🌐 Starting server...")
    subprocess.run([python_path, "server.py"])

if __name__ == "__main__":
    main()
