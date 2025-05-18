package com.example.bot;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.bots.AbsSender;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class Executer {
    private final AbsSender absSender;

    public Executer(AbsSender absSender) {
        this.absSender = absSender;
    }

    public void sendMessage(String text, Long chatId) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId.toString());
        message.setText(text);

        try {
            absSender.execute(message);
        } catch (TelegramApiException e) {
            System.err.println("Ошибка отправки сообщения: " + e.getMessage());
        }
    }

    private InlineKeyboardButton buttonCreator(String text, String callBack) {
        InlineKeyboardButton Button = new InlineKeyboardButton();
        Button.setText(text);
        Button.setCallbackData(callBack);
        return Button;
    }

    public void startKeyboardCreator(long chatId, List<String> buttonText, String text) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        message.setText(text);
        ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
        keyboardMarkup.setSelective(true);
        keyboardMarkup.setResizeKeyboard(true);
        keyboardMarkup.setOneTimeKeyboard(false);
        List<KeyboardRow> keyboard = new ArrayList<>();
        List<KeyboardRow> keyboardRows = new ArrayList<>();
        KeyboardRow currentRow = new KeyboardRow();
        List<String> keysList = buttonText;

        for (int i = 0; i < buttonText.size(); i++) {
            currentRow.add(new KeyboardButton(keysList.get(i)));
            if ((i + 1) % 3 == 0 || i == buttonText.size()-1) {
                keyboardRows.add(currentRow);
                currentRow = new KeyboardRow();
            }
        }
        keyboardMarkup.setKeyboard(keyboardRows);
        message.setReplyMarkup(keyboardMarkup);
        try {
            absSender.execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    public KeyboardRow keyboardRows(LinkedHashMap buttonText) {
        KeyboardRow rows = new KeyboardRow();
        List<String> keysList = new ArrayList<>(buttonText.keySet());
        for (int i = 0; i < keysList.size(); i++) {
            rows.add(new KeyboardButton(keysList.get(i)));
        }
        return rows;
    }

}
