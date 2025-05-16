package com.example.bot;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

import java.util.logging.Handler;

import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.Handler.Handlers;

public class TelegramBot extends TelegramLongPollingBot {

    @Override
    public void onUpdateReceived(Update update) {
        System.out.println(update.getMessage().getText());
        Handlers messageList = new Handlers();
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