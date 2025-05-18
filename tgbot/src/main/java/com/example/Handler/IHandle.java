package com.example.Handler;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

@Component
public interface IHandle {
    void handle(Update update);

    String getInfo();

    String getName();

    default void register(Map<String, IHandle> reg) {
        reg.put(getName(), this);
    }

}
