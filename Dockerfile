
FROM python:3.11-slim
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN git clone https://github.com/Shrey-N/ShellLite.git shell_lite

ENV PYTHONPATH=/app/shell_lite

COPY . /app/website

WORKDIR /app/website

EXPOSE 8080

CMD ["python", "/app/shell_lite/cli.py", "main.shl"]
