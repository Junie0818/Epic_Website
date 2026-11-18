import http.server
import json
import os
import socketserver

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(DIRECTORY, "images")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}


class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path.split("?")[0] == "/api/images":
            files = []
            if os.path.isdir(IMAGES_DIR):
                for entry in sorted(os.listdir(IMAGES_DIR)):
                    ext = os.path.splitext(entry)[1].lower()
                    if ext in IMAGE_EXTENSIONS and os.path.isfile(os.path.join(IMAGES_DIR, entry)):
                        files.append(f"images/{entry}")
            payload = json.dumps({"images": files}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
    print(f"Serving Epic SJSU from {DIRECTORY} on port {PORT}. Open website on http://localhost:{PORT}.")
    httpd.serve_forever()
