package com.example.backend.Common;

public class Response<T> {
    private int code;
    private T body;
    private String message;

    public Response(int code, T body, String message) {
        this.code = code;
        this.body = body;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public T getBody() {
        return body;
    }

    public String getMessage() {
        return message;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setBody(T body) {
        this.body = body;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
