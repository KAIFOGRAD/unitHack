package com.example.bot;

import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.Handler.Handlers;

@Component
@Primary
public class TelegramBot extends TelegramLongPollingBot {
    private final Handlers messageList;

    @Lazy
    public TelegramBot(Handlers handlers)
    {
        this.messageList = handlers;
    }

    @Override
    public void onUpdateReceived(Update update) {
        System.out.println(update.getMessage().getText());
        if (update.hasMessage() && update.getMessage().hasText()) {
            messageList.Handle(update);
        }

    }

    @Override
    public String getBotToken() {
        return System.getenv("TelegramBotNaumenToken");
    }

    @Override
    public String getBotUsername() {
        return System.getenv("TelegramBotNaumenName");
    }
}