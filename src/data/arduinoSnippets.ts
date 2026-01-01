export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type Category = 'all' | 'servo' | 'lcd' | 'wifi' | 'sensor' | 'led' | 'motor' | 'neopixel' | 'oled';

export interface Snippet {
  id: string;
  code: string;
  filename: string;
  category: Category;
  difficulty: Difficulty;
  library: string;
}

export const snippets: Snippet[] = [
  // BEGINNER - Simple, short snippets
  {
    id: '1',
    code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}`,
    filename: 'Blink.ino',
    category: 'led',
    difficulty: 'beginner',
    library: 'Arduino Core'
  },
  {
    id: '2',
    code: `void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
}`,
    filename: 'LED.ino',
    category: 'led',
    difficulty: 'beginner',
    library: 'Arduino Core'
  },
  {
    id: '3',
    code: `void loop() {
  int val = analogRead(A0);
  Serial.println(val);
}`,
    filename: 'Analog.ino',
    category: 'sensor',
    difficulty: 'beginner',
    library: 'Arduino Core'
  },
  {
    id: '4',
    code: `void setup() {
  Serial.begin(9600);
  Serial.println("Hello!");
}`,
    filename: 'Serial.ino',
    category: 'all',
    difficulty: 'beginner',
    library: 'Arduino Core'
  },
  {
    id: '5',
    code: `void loop() {
  digitalWrite(LED, HIGH);
  delay(500);
  digitalWrite(LED, LOW);
  delay(500);
}`,
    filename: 'BlinkLoop.ino',
    category: 'led',
    difficulty: 'beginner',
    library: 'Arduino Core'
  },
  {
    id: '6',
    code: `int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}`,
    filename: 'PWM.ino',
    category: 'led',
    difficulty: 'beginner',
    library: 'Arduino Core'
  },

  // INTERMEDIATE - Library usage
  {
    id: '7',
    code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}`,
    filename: 'ServoBasic.ino',
    category: 'servo',
    difficulty: 'intermediate',
    library: 'Servo.h'
  },
  {
    id: '8',
    code: `void loop() {
  for (int pos = 0; pos <= 180; pos++) {
    myServo.write(pos);
    delay(15);
  }
}`,
    filename: 'ServoSweep.ino',
    category: 'servo',
    difficulty: 'intermediate',
    library: 'Servo.h'
  },
  {
    id: '9',
    code: `#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
}`,
    filename: 'LCD.ino',
    category: 'lcd',
    difficulty: 'intermediate',
    library: 'LiquidCrystal.h'
  },
  {
    id: '10',
    code: `void loop() {
  lcd.setCursor(0, 0);
  lcd.print("Hello World!");
  lcd.setCursor(0, 1);
  lcd.print("Arduino LCD");
}`,
    filename: 'LCDPrint.ino',
    category: 'lcd',
    difficulty: 'intermediate',
    library: 'LiquidCrystal.h'
  },
  {
    id: '11',
    code: `#include <DHT.h>

DHT dht(2, DHT11);

void setup() {
  dht.begin();
}`,
    filename: 'DHTSetup.ino',
    category: 'sensor',
    difficulty: 'intermediate',
    library: 'DHT.h'
  },
  {
    id: '12',
    code: `void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  Serial.print("Temp: ");
  Serial.println(temp);
}`,
    filename: 'DHTRead.ino',
    category: 'sensor',
    difficulty: 'intermediate',
    library: 'DHT.h'
  },
  {
    id: '13',
    code: `#include <Adafruit_NeoPixel.h>

Adafruit_NeoPixel strip(60, 6, NEO_GRB);

void setup() {
  strip.begin();
  strip.show();
}`,
    filename: 'NeoPixel.ino',
    category: 'neopixel',
    difficulty: 'intermediate',
    library: 'Adafruit_NeoPixel.h'
  },
  {
    id: '14',
    code: `void setColor(int r, int g, int b) {
  for (int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, strip.Color(r, g, b));
  }
  strip.show();
}`,
    filename: 'NeoColor.ino',
    category: 'neopixel',
    difficulty: 'intermediate',
    library: 'Adafruit_NeoPixel.h'
  },
  {
    id: '15',
    code: `#include <AFMotor.h>

AF_DCMotor motor(1);

void setup() {
  motor.setSpeed(200);
}`,
    filename: 'Motor.ino',
    category: 'motor',
    difficulty: 'intermediate',
    library: 'AFMotor.h'
  },

  // ADVANCED - Complex patterns
  {
    id: '16',
    code: `#include <WiFi.h>

const char* ssid = "MyNetwork";
const char* password = "MyPassword";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected!");
}`,
    filename: 'WiFiConnect.ino',
    category: 'wifi',
    difficulty: 'advanced',
    library: 'WiFi.h'
  },
  {
    id: '17',
    code: `#include <HTTPClient.h>

void fetchData() {
  HTTPClient http;
  http.begin("http://api.example.com/data");
  int httpCode = http.GET();
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload);
  }
  http.end();
}`,
    filename: 'HTTPClient.ino',
    category: 'wifi',
    difficulty: 'advanced',
    library: 'HTTPClient.h'
  },
  {
    id: '18',
    code: `#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
}`,
    filename: 'OLED.ino',
    category: 'oled',
    difficulty: 'advanced',
    library: 'Adafruit_SSD1306.h'
  },
  {
    id: '19',
    code: `void displayText(String text) {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println(text);
  display.display();
}`,
    filename: 'OLEDText.ino',
    category: 'oled',
    difficulty: 'advanced',
    library: 'Adafruit_SSD1306.h'
  },
  {
    id: '20',
    code: `void rainbow(int wait) {
  for (long hue = 0; hue < 65536; hue += 256) {
    for (int i = 0; i < strip.numPixels(); i++) {
      int pixelHue = hue + (i * 65536L / strip.numPixels());
      strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(pixelHue)));
    }
    strip.show();
    delay(wait);
  }
}`,
    filename: 'NeoRainbow.ino',
    category: 'neopixel',
    difficulty: 'advanced',
    library: 'Adafruit_NeoPixel.h'
  },
  {
    id: '21',
    code: `#define TRIG_PIN 9
#define ECHO_PIN 10

long measureDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration / 58;
}`,
    filename: 'Ultrasonic.ino',
    category: 'sensor',
    difficulty: 'advanced',
    library: 'Arduino Core'
  },
  {
    id: '22',
    code: `#include <EEPROM.h>

void saveValue(int addr, byte val) {
  EEPROM.write(addr, val);
}

byte loadValue(int addr) {
  return EEPROM.read(addr);
}`,
    filename: 'EEPROM.ino',
    category: 'all',
    difficulty: 'advanced',
    library: 'EEPROM.h'
  },

  // EXPERT - Complex multi-line patterns
  {
    id: '23',
    code: `#include <WebServer.h>

WebServer server(80);

void handleRoot() {
  server.send(200, "text/html", "<h1>Hello ESP32!</h1>");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  server.on("/", handleRoot);
  server.begin();
}`,
    filename: 'WebServer.ino',
    category: 'wifi',
    difficulty: 'expert',
    library: 'WebServer.h'
  },
  {
    id: '24',
    code: `#include <ArduinoOTA.h>

void setupOTA() {
  ArduinoOTA.setHostname("esp32-device");
  ArduinoOTA.onStart([]() {
    Serial.println("OTA Start");
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("OTA End");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\\r", (progress / (total / 100)));
  });
  ArduinoOTA.begin();
}`,
    filename: 'OTA.ino',
    category: 'wifi',
    difficulty: 'expert',
    library: 'ArduinoOTA.h'
  },
  {
    id: '25',
    code: `#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.println("]");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void setup() {
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}`,
    filename: 'MQTT.ino',
    category: 'wifi',
    difficulty: 'expert',
    library: 'PubSubClient.h'
  },
  {
    id: '26',
    code: `void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("connected");
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}`,
    filename: 'MQTTReconnect.ino',
    category: 'wifi',
    difficulty: 'expert',
    library: 'PubSubClient.h'
  },
  {
    id: '27',
    code: `#include <Preferences.h>

Preferences preferences;

void saveSettings(String ssid, String pass) {
  preferences.begin("wifi", false);
  preferences.putString("ssid", ssid);
  preferences.putString("password", pass);
  preferences.end();
}

void loadSettings() {
  preferences.begin("wifi", true);
  String ssid = preferences.getString("ssid", "");
  String pass = preferences.getString("password", "");
  preferences.end();
}`,
    filename: 'Preferences.ino',
    category: 'all',
    difficulty: 'expert',
    library: 'Preferences.h'
  },
  {
    id: '28',
    code: `void Task1(void *pvParameters) {
  for (;;) {
    Serial.println("Task 1 running");
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  xTaskCreate(Task1, "Task1", 10000, NULL, 1, NULL);
}`,
    filename: 'FreeRTOS.ino',
    category: 'all',
    difficulty: 'expert',
    library: 'FreeRTOS.h'
  },
  {
    id: '29',
    code: `#include <BLEDevice.h>

BLEServer *pServer;
BLEService *pService;
BLECharacteristic *pCharacteristic;

void setup() {
  BLEDevice::init("ESP32_BLE");
  pServer = BLEDevice::createServer();
  pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
    CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pService->start();
}`,
    filename: 'BLE.ino',
    category: 'wifi',
    difficulty: 'expert',
    library: 'BLEDevice.h'
  },
  {
    id: '30',
    code: `SemaphoreHandle_t mutex;

void Task1(void *pvParameters) {
  for (;;) {
    if (xSemaphoreTake(mutex, portMAX_DELAY)) {
      Serial.println("Task 1 has mutex");
      vTaskDelay(100 / portTICK_PERIOD_MS);
      xSemaphoreGive(mutex);
    }
  }
}

void setup() {
  mutex = xSemaphoreCreateMutex();
  xTaskCreate(Task1, "Task1", 10000, NULL, 1, NULL);
}`,
    filename: 'Mutex.ino',
    category: 'all',
    difficulty: 'expert',
    library: 'FreeRTOS.h'
  }
];

export const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'servo', label: 'Servo' },
  { value: 'lcd', label: 'LCD' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'sensor', label: 'Sensor' },
  { value: 'led', label: 'LED' },
  { value: 'motor', label: 'Motor' },
  { value: 'neopixel', label: 'NeoPixel' },
  { value: 'oled', label: 'OLED' }
];

export const difficulties: { value: Difficulty; label: string; description: string }[] = [
  { value: 'beginner', label: 'Beginner', description: 'Basic Arduino functions' },
  { value: 'intermediate', label: 'Intermediate', description: 'Library usage' },
  { value: 'advanced', label: 'Advanced', description: 'Complex patterns' },
  { value: 'expert', label: 'Expert', description: 'Professional code' }
];

export const durations = [30, 60, 120];

export function getFilteredSnippets(category: Category, difficulty: Difficulty): Snippet[] {
  return snippets.filter(s => {
    const matchCategory = category === 'all' || s.category === category;
    const matchDifficulty = s.difficulty === difficulty;
    return matchCategory && matchDifficulty;
  });
}

export function getRandomSnippet(category: Category, difficulty: Difficulty): Snippet {
  const filtered = getFilteredSnippets(category, difficulty);
  if (filtered.length === 0) {
    // Fallback to all snippets of that difficulty
    const fallback = snippets.filter(s => s.difficulty === difficulty);
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
}
