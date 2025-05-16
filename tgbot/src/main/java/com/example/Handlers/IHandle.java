package com.example.Handlers;


import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

public interface IHandle {
    SendMessage handle(Update update);

    String info();
    String name();
}
