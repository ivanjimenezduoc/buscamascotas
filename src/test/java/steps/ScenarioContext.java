package steps;

import java.util.HashMap;
import java.util.Map;

/**
 * Clase para almacenar datos compartidos entre los pasos del escenario.
 */
public class ScenarioContext {
    private final Map<String, Object> context = new HashMap<>();

    public void set(String key, Object value) {
        context.put(key, value);
    }

    public Object get(String key) {
        return context.get(key);
    }

    public boolean containsKey(String key) {
        return context.containsKey(key);
    }
}
