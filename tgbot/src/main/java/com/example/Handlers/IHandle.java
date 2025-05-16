package com.example.Handlers;

import java.util.Map;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

public interface IHandle {
    SendMessage handle(Update update);

    String getInfo();

    String getName();
    default void register(Map<String,IHandle> reg)
    {
        reg.put(getName(),this);
    }
    
}
