package com.example.Handlers;

import java.util.LinkedHashMap;
import java.util.Map;

public class Handler {
    private final Map<String,IHandle> commands = new LinkedHashMap<>();

    public Handler()
    {
        

    private void registerCommands() {
        new StartHandler().register(commands);
    }
}
