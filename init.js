
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
      "title": "TNV - Tech na Várzea",
      "version": "1.0.0",
      "description": "",
      "contact": {
        "name": "Diego Melo - Desenvolvedor",
        "url": "https://github.com/DiegoHenriqueMelo",
        "email": "diegohenriquemelo14@gmail.com"
      },
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    "components": {
      "securitySchemes": {
        "BearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    },
    "paths": {
      "/api/team": {
        "post": {
          "summary": "Cria um time no sistema",
          "tags": [
            "Team"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "nome",
                    "cidade",
                    "corPrimaria",
                    "corSecundaria",
                    "fundacao"
                  ],
                  "properties": {
                    "nome": {
                      "type": "string",
                      "example": "Fio de Rabiola"
                    },
                    "cidade": {
                      "type": "string",
                      "example": "Franca"
                    },
                    "corPrimaria": {
                      "type": "string",
                      "example": "#ffffff"
                    },
                    "corSecundaria": {
                      "type": "string",
                      "example": "#000000"
                    },
                    "fundacao": {
                      "type": "string",
                      "example": "2020-09-20"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Time criado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Time criado com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "403": {
              "description": "Acesso negado - papel insuficiente"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        }
      },
      "/api/teams": {
        "get": {
          "summary": "Lista todos os times cadastrados",
          "tags": [
            "Team"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Times encontrados com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Times encontrados com sucesso"
                      },
                      "body": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 1
                            },
                            "nome": {
                              "type": "string",
                              "example": "Fio de Rabiola"
                            },
                            "sigla": {
                              "type": "string",
                              "example": "FIO"
                            },
                            "cidade": {
                              "type": "string",
                              "example": "Franca"
                            },
                            "corPrimaria": {
                              "type": "string",
                              "example": "#ffffff"
                            },
                            "corSecundaria": {
                              "type": "string",
                              "example": "#000000"
                            },
                            "fundacao": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "createdAt": {
                              "type": "string",
                              "format": "date-time"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        }
      },
      "/api/team/{id}": {
        "get": {
          "summary": "Busca um time pelo ID",
          "tags": [
            "Team"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID do time",
              "example": 1
            }
          ],
          "responses": {
            "200": {
              "description": "Time encontrado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Time encontrado com sucesso"
                      },
                      "body": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "nome": {
                            "type": "string",
                            "example": "Fio de Rabiola"
                          },
                          "sigla": {
                            "type": "string",
                            "example": "FIO"
                          },
                          "cidade": {
                            "type": "string",
                            "example": "Franca"
                          },
                          "corPrimaria": {
                            "type": "string",
                            "example": "#ffffff"
                          },
                          "corSecundaria": {
                            "type": "string",
                            "example": "#000000"
                          },
                          "fundacao": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "404": {
              "description": "Time não encontrado"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        },
        "put": {
          "summary": "Atualiza os dados de um time",
          "tags": [
            "Team"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID do time",
              "example": 1
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "nome",
                    "cidade",
                    "corPrimaria",
                    "corSecundaria",
                    "fundacao"
                  ],
                  "properties": {
                    "nome": {
                      "type": "string",
                      "example": "Fio de Rabiola FC"
                    },
                    "cidade": {
                      "type": "string",
                      "example": "Franca"
                    },
                    "corPrimaria": {
                      "type": "string",
                      "example": "#ffffff"
                    },
                    "corSecundaria": {
                      "type": "string",
                      "example": "#000000"
                    },
                    "fundacao": {
                      "type": "string",
                      "example": "2020-09-20"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Time atualizado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Time atualizado com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "403": {
              "description": "Acesso negado - papel insuficiente"
            },
            "404": {
              "description": "Time não encontrado"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        },
        "delete": {
          "summary": "Remove um time do sistema",
          "tags": [
            "Team"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID do time",
              "example": 1
            }
          ],
          "responses": {
            "200": {
              "description": "Time deletado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Time deletado com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "403": {
              "description": "Acesso negado - somente ADMINISTRADOR"
            },
            "404": {
              "description": "Time não encontrado"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        }
      },
      "/api/player": {
        "post": {
          "summary": "Cadastra um jogador no sistema",
          "description": "Cria um perfil de jogador vinculado a um usuário existente. Cada usuário pode ter apenas um jogador cadastrado. O campo `timeId` é opcional e permite já inserir o jogador em um time no cadastro.",
          "tags": [
            "Player"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "usuarioId"
                  ],
                  "properties": {
                    "usuarioId": {
                      "type": "integer",
                      "description": "ID do usuário ao qual o jogador pertence",
                      "example": 1
                    },
                    "nome": {
                      "type": "string",
                      "nullable": true,
                      "example": "João da Silva"
                    },
                    "numero": {
                      "type": "integer",
                      "nullable": true,
                      "example": 10
                    },
                    "posicao": {
                      "type": "string",
                      "nullable": true,
                      "example": "Atacante"
                    },
                    "dataNasc": {
                      "type": "string",
                      "nullable": true,
                      "example": "2000-03-15"
                    },
                    "timeId": {
                      "type": "integer",
                      "nullable": true,
                      "description": "ID do time ao qual o jogador será vinculado",
                      "example": 2
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Jogador criado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Jogador criado com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "403": {
              "description": "Acesso negado - papel insuficiente"
            },
            "409": {
              "description": "Usuário já possui um jogador cadastrado"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        }
      },
      "/api/players": {
        "get": {
          "summary": "Lista todos os jogadores cadastrados",
          "description": "Retorna todos os jogadores com informações do time e do usuário vinculado.",
          "tags": [
            "Player"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Jogadores encontrados com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Jogadores encontrados com sucesso"
                      },
                      "body": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 1
                            },
                            "usuarioId": {
                              "type": "integer",
                              "example": 1
                            },
                            "nome": {
                              "type": "string",
                              "example": "João da Silva"
                            },
                            "numero": {
                              "type": "integer",
                              "example": 10
                            },
                            "posicao": {
                              "type": "string",
                              "example": "Atacante"
                            },
                            "dataNasc": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "timeId": {
                              "type": "integer",
                              "example": 2
                            },
                            "time": {
                              "type": "object",
                              "nullable": true
                            },
                            "usuario": {
                              "type": "object"
                            },
                            "createdAt": {
                              "type": "string",
                              "format": "date-time"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        }
      },
      "/api/player/{id}": {
        "get": {
          "summary": "Busca um jogador pelo ID",
          "description": "Retorna os dados do jogador com informações do time e do usuário vinculado.",
          "tags": [
            "Player"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID do jogador",
              "example": 1
            }
          ],
          "responses": {
            "200": {
              "description": "Jogador encontrado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Jogador encontrado com sucesso"
                      },
                      "body": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "usuarioId": {
                            "type": "integer",
                            "example": 1
                          },
                          "nome": {
                            "type": "string",
                            "example": "João da Silva"
                          },
                          "numero": {
                            "type": "integer",
                            "example": 10
                          },
                          "posicao": {
                            "type": "string",
                            "example": "Atacante"
                          },
                          "dataNasc": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "timeId": {
                            "type": "integer",
                            "example": 2
                          },
                          "time": {
                            "type": "object",
                            "nullable": true
                          },
                          "usuario": {
                            "type": "object"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "404": {
              "description": "Jogador não encontrado"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        },
        "put": {
          "summary": "Atualiza os dados de um jogador",
          "description": "Atualiza as informações do jogador. Utilize `timeId` para vincular ou desvincular o jogador de um time (passe `null` para desvincular).",
          "tags": [
            "Player"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID do jogador",
              "example": 1
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nome": {
                      "type": "string",
                      "nullable": true,
                      "example": "João da Silva"
                    },
                    "numero": {
                      "type": "integer",
                      "nullable": true,
                      "example": 10
                    },
                    "posicao": {
                      "type": "string",
                      "nullable": true,
                      "example": "Atacante"
                    },
                    "dataNasc": {
                      "type": "string",
                      "nullable": true,
                      "example": "2000-03-15"
                    },
                    "timeId": {
                      "type": "integer",
                      "nullable": true,
                      "description": "ID do time. Passe null para desvincular o jogador do time atual.",
                      "example": 2
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Jogador atualizado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Jogador atualizado com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "403": {
              "description": "Acesso negado - papel insuficiente"
            },
            "404": {
              "description": "Jogador não encontrado"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        },
        "delete": {
          "summary": "Remove um jogador do sistema",
          "tags": [
            "Player"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "ID do jogador",
              "example": 1
            }
          ],
          "responses": {
            "200": {
              "description": "Jogador removido com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Jogador removido com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token inválido ou não fornecido"
            },
            "403": {
              "description": "Acesso negado - somente ADMINISTRADOR"
            },
            "404": {
              "description": "Jogador não encontrado"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        }
      },
      "/api/login": {
        "post": {
          "summary": "Libera acesso ao sistema",
          "tags": [
            "Login"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "example@email.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "sua_senha_segura"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Acesso liberado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Login realizado com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "422": {
              "description": "Dados inválidos"
            },
            "500": {
              "description": "Erro interno do servidor"
            }
          }
        }
      },
      "/api/create/user": {
        "post": {
          "summary": "cria um usuario no sistema",
          "tags": [
            "Login"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nome": {
                      "type": "string",
                      "example": "João da Silva"
                    },
                    "email": {
                      "type": "string",
                      "example": "example@email.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "sua_senha_segura"
                    },
                    "tipoUsuario": {
                      "type": "string",
                      "example": "ORGANIZADOR"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Usuario criado com sucesso",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "messageSistem": {
                        "type": "string",
                        "example": "Usuario criado com sucesso"
                      },
                      "body": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "422": {
              "description": "Dados inválidos"
            },
            "500": {
              "description": "Erro interno do servidor"
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
