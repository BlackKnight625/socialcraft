from nikolaik/python-nodejs:python3.10-nodejs16-alpine
LABEL socialcraft_agent=''

# Add Mineflayer modules
WORKDIR /agent
RUN npm install -g mineflayer mineflayer-pathfinder mineflayer-statemachine minecraft-data vec3 winston js-logger

# Add javascript module to python
RUN pip install javascript pika

COPY socialcraft_handler/ ./socialcraft_handler/

# Run Agent
EXPOSE 3000
CMD ["python", "-u", "main.py"]