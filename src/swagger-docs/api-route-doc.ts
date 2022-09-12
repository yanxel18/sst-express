const definition = {
    swagger: "2.0",
    info: {
        version: "1.0.0",
        title: "SST System API",
        description: "API Documentation for SST System - created by Bryan Fernandez",
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
        }
    },
    host: "localhost:3000",
    basePath: "/account/login",
    tags: [
        {
            name: "Users",
            description: "API for users in the system"
        }

    ],
    schemes: [
        "http",
        "https"
    ],
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    securityDefinitions: {
        ApiKeyAuth: {
            type: "apiKey",
            in: "headers",
            name: "authorization"
        }
    },
    paths: {
        "/authenticate": {
            post: {
                summary: "Login user",
                tags: [
                    "Users"
                ],
                description: "Login user in system",
                parameters: [
                    {
                        name: "user",
                        in: "body",
                        description: "Login user",
                        schema: {
                            $ref: "#/definitions/User"
                        }
                    }
                ],
                produces: [
                    "application/json"
                ],
                responses: {
                    200: {
                        description: "Token generate success!",
                        schema: {
                            $ref: "#/definitions/token"
                        }
                    },
                    400: {
                        description: "Username or password is incorrect!"
                    }
                }
            }
        }
    },

    definitions: {

        User: {
            properties: {
                usergid: {
                    type: "string"
                },
                userpass: {
                    type: "string"
                }
            }
        },
        userEmail: {
            properties: {
                email: {
                    type: "string"
                }
            }
        },
        token : {
            type: "string"
        }



    }

}

export default definition