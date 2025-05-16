package com.example.bot;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

public class TelegramBot extends TelegramLongPollingBot {

    @Override
    public void onUpdateReceived(Update update) {
        String messageText = update.getMessage().getText();
        long userId = Long.valueOf(update.getMessage().getChatId());

        SendMessage message = new SendMessage();
        message.setChatId(userId);
        message.setText(messageText);
        try {
            execute(message);
        } catch (TelegramApiException e) {
            System.out.println("uncorrected"+e);
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