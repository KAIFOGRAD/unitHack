package com.example.bot;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;

public class TelegramBot extends TelegramLongPollingBot {

    @Override
    public void onUpdateReceived(Update update) {
        String messageText = update.getMessage().getText();
        long userId = Long.valueOf(update.getMessage().getChatId());

        SendMessage message = new SendMessage();
        message.setChatId(userId);
        message.setText(messageText);

    }

    @Override
    public String getBotToken() {
        return System.getenv("TelegramBotToken");
    }

    @Override
    public String getBotUsername() {
        return System.getenv("TelegramBotName");
    }
}