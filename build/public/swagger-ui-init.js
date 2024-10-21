
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Api del juego  math - backend",
      "version": "1.0.0",
      "description": "\n             API del Juego de Matemáticas\n              | Es el API del juego de matemáticas que permite la autenticación de usuarios,\n              | manejo de puntuaciones, niveles, historial, y más.\n              | El proyecto está desarrollado en Node.js y TypeScript,\n              | utilizando tecnologías como Express, JWT, bcrypt y MongoDB.\n              \n            ",
      "contact": {
        "name": "Omar R Mamani Capcha"
      }
    },
    "servers": [
      {
        "url": "https://juego-math-back.vercel.app",
        "description": "Server vercel"
      }
    ],
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "apiKey",
          "in": "header",
          "name": "authorization",
          "description": "Ingresa el token , solo el codigo"
        }
      },
      "schemas": {
        "UserRegistration": {
          "type": "object",
          "required": [
            "usuario",
            "nombre",
            "apellido",
            "password",
            "password1"
          ],
          "properties": {
            "usuario": {
              "type": "string"
            },
            "nombre": {
              "type": "string"
            },
            "apellido": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "password1": {
              "type": "string"
            }
          }
        },
        "UserLogin": {
          "type": "object",
          "required": [
            "usuario",
            "password"
          ],
          "properties": {
            "usuario": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          }
        },
        "newHistory": {
          "type": "object",
          "required": [
            "score",
            "level",
            "duration"
          ],
          "properties": {
            "score": {
              "type": "number"
            },
            "level": {
              "type": "number"
            },
            "duration": {
              "type": "string"
            }
          }
        }
      }
    },
    "paths": {
      "/api/auth/register": {
        "post": {
          "summary": "Register a new user",
          "description": "Registers a new user with their credentials.",
          "tags": [
            "Authentication"
          ],
          "requestBody": {
            "description": "User registration data",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserRegistration"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/UserRegistration"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User registered successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "token": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Password mismatch or registration error"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/auth/login": {
        "post": {
          "summary": "User login",
          "description": "Logs in a user and returns a JWT token.",
          "tags": [
            "Authentication"
          ],
          "requestBody": {
            "description": "User login credentials",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserLogin"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/UserLogin"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successful",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "token": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid credentials"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/auth/logout": {
        "post": {
          "summary": "Logout the user",
          "description": "Logs out the current user by invalidating the session.",
          "tags": [
            "Authentication"
          ],
          "responses": {
            "200": {
              "description": "User logged out successfully"
            }
          }
        }
      },
      "/api/auth/forgot-password": {
        "post": {
          "summary": "Change user password",
          "description": "Changes the password of the logged-in user.",
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "description": "Current and new passwords",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "password",
                    "new_password"
                  ],
                  "properties": {
                    "password": {
                      "type": "string"
                    },
                    "new_password": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password changed successfully"
            },
            "400": {
              "description": "Error changing password"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/auth/reset-password": {
        "post": {
          "summary": "Reset a user's password",
          "description": "Resets the password for a specific user (requires role-based access).",
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "description": "User information and password reset",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "usuario"
                  ],
                  "properties": {
                    "usuario": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password reset successfully"
            },
            "400": {
              "description": "Error resetting password"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/auth/profile": {
        "get": {
          "summary": "Retrieve the logged-in user's profile",
          "description": "Retrieves the profile information of the logged-in user.",
          "tags": [
            "Profile"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Profile information retrieved successfully"
            },
            "400": {
              "description": "Error retrieving profile"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/game/": {
        "get": {
          "summary": "Game homepage",
          "description": "Fetches the main game information for the logged-in user.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Game"
          ],
          "responses": {
            "200": {
              "description": "Game data retrieved successfully"
            },
            "403": {
              "description": "Invalid token or permissions"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/game/get_users": {
        "get": {
          "summary": "List all users",
          "description": "Retrieves a list of all users with administrative access.",
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "List of users retrieved successfully"
            },
            "403": {
              "description": "Insufficient permissions"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/game/history_list": {
        "get": {
          "summary": "Get user history",
          "description": "Retrieves the history for the logged-in user.",
          "tags": [
            "History"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "History retrieved successfully"
            },
            "403": {
              "description": "Invalid token or permissions"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/game/new_history": {
        "post": {
          "summary": "Add a new game history entry",
          "description": "Adds a new history entry for the logged-in user.",
          "tags": [
            "History"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "description": "Game history details",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/newHistory"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/newHistory"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "New history added"
            },
            "403": {
              "description": "Invalid token or permissions"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/api/game/get_history/level/{nivel}": {
        "get": {
          "summary": "Get game history by level",
          "description": "Retrieves the history entries of a specific level for the logged-in user.",
          "tags": [
            "History"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nivel",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "The level to retrieve the history for."
            }
          ],
          "responses": {
            "200": {
              "description": "History retrieved successfully"
            },
            "403": {
              "description": "Invalid token or permissions"
            },
            "404": {
              "description": "No history found for this user at the specified level"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      }
    },
    "tags": []
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
