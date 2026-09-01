# EXOVOX - Especificación de la app móvil

> **Tu reciclaje tiene voz.**

## 1. Propósito

La app EXOVOX permite que una persona se identifique ante una VoxStation, reciba puntos por envases físicamente aceptados, encuentre estaciones y canjee recompensas. Es la interfaz personal de un sistema mayor compuesto por estaciones IoT, backend transaccional, panel operativo y cadena de valorización.

La app no decide por sí sola si una botella es válida. La estación realiza la validación física y el backend registra el resultado de manera segura.

## 2. Alcance del MVP

### Incluido

- onboarding y permisos progresivos;
- cuenta e inicio de sesión;
- mapa/lista de estaciones;
- detalle y estado de una estación;
- lector QR para iniciar una sesión;
- sesión de reciclaje en tiempo real;
- saldo y movimientos de puntos;
- catálogo y detalle de recompensas;
- reserva/canje y cupón dinámico;
- historial de reciclaje y canjes;
- impacto personal;
- notificaciones;
- soporte, privacidad y eliminación de cuenta;
- operación básica con conectividad intermitente;
- analítica y observabilidad sin datos sensibles.

### Fuera del MVP

- pagos o retiros de efectivo;
- marketplace completo;
- transferencias de puntos entre personas;
- gamificación social pública;
- reconocimiento de botellas con la cámara del teléfono;
- soporte para múltiples materiales en una misma estación;
- rutas de recolección para operadores dentro de la app ciudadana;
- datos B2B y administración desde móvil;
- blockchain o tokens negociables.

## 3. Plataformas y recomendación tecnológica

### Cliente móvil

**Flutter** para Android e iOS, con prioridad de prueba en Android:

- una base de código;
- buen control de cámara, QR y estados en tiempo real;
- interfaz consistente en equipos de distinta gama;
- posibilidad de añadir modo kiosco u otra app operativa en el futuro.

Alternativa válida: React Native si el equipo ya domina TypeScript. La decisión debe basarse en capacidades del equipo, no en tendencia.

### Backend sugerido

- API: NestJS/TypeScript o FastAPI/Python;
- base de datos transaccional: PostgreSQL;
- caché, sesiones efímeras y límites: Redis;
- mensajería IoT: MQTT con TLS;
- eventos internos: cola administrada o broker según escala;
- archivos/evidencias: almacenamiento de objetos;
- autenticación: proveedor administrado o implementación OIDC;
- notificaciones: Firebase Cloud Messaging y APNs;
- panel web: aplicación separada con control por roles.

### Hardware de VoxStation

- microcontrolador para sensores y actuadores;
- computador de borde para pantalla, cámara y clasificación;
- agente IoT que firma y publica eventos;
- almacenamiento local cifrado o protegido para cola offline;
- reloj sincronizado y mecanismo de actualización remota firmado.

## 4. Roles

### En la app ciudadana

- visitante;
- usuario registrado;
- usuario con cuenta limitada/revisada por riesgo;
- soporte, únicamente mediante herramientas internas.

### Fuera de la app

- operador de estación;
- técnico de mantenimiento;
- operador de retiro;
- administrador EXOVOX;
- aliado de recompensas;
- analista de campaña;
- auditor de impacto.

La aplicación ciudadana no debe incluir menús ocultos de administración.

## 5. Personas de usuario

### Camila, 20, estudiante

Quiere reciclar las botellas que consume en el campus y obtener descuentos útiles. Necesita una experiencia rápida, instrucciones claras y recompensas alcanzables.

### Diego, 27, joven profesional

Usa varias ubicaciones y valora ver su historial e impacto. Le preocupa la privacidad y no quiere publicidad invasiva.

### Ana, 18, primera experiencia

No conoce los tipos de plástico. Necesita que la estación explique por qué acepta o rechaza un envase sin lenguaje técnico.

## 6. Principios de experiencia

1. **Primero la acción:** abrir, escanear y reciclar con pocos pasos.
2. **Estado visible:** la persona siempre sabe si la estación está conectada, validando, aceptando o rechazando.
3. **Recompensa transparente:** puntos, vigencia y condiciones se muestran sin letra escondida.
4. **Error recuperable:** cada rechazo explica qué hacer.
5. **Privacidad por defecto:** ubicación y notificaciones son opcionales y se solicitan cuando aportan valor.
6. **Accesibilidad:** contraste, texto escalable, lector de pantalla, vibración y señales no basadas solo en color.
7. **No greenwashing:** impacto personal basado en depósitos y peso documentado.

## 7. Navegación

Barra inferior de cuatro secciones:

1. **Inicio**
2. **Ubicaciones**
3. **Puntos**
4. **Perfil**

Acción principal flotante o destacada:

- **Escanear VoxStation**

La sesión de reciclaje se abre como flujo dedicado y bloquea acciones que puedan hacer perder el contexto.

## 8. Mapa de pantallas

```text
Splash
└── Estado del servicio / actualización obligatoria
    ├── Onboarding
    │   ├── Beneficio
    │   ├── Funcionamiento
    │   ├── Materiales
    │   └── Crear cuenta / explorar
    ├── Autenticación
    │   ├── Teléfono o correo
    │   ├── Código de verificación
    │   ├── Datos mínimos
    │   └── Términos y privacidad
    └── App
        ├── Inicio
        │   ├── Escanear VoxStation
        │   ├── Estación cercana
        │   ├── Saldo
        │   ├── Reto activo
        │   └── Actividad reciente
        ├── Ubicaciones
        │   ├── Mapa/lista
        │   ├── Filtros
        │   └── Detalle de estación
        ├── Sesión de reciclaje
        │   ├── Escáner QR
        │   ├── Conexión
        │   ├── Instrucciones
        │   ├── Envase aceptado/rechazado
        │   └── Resumen
        ├── Puntos
        │   ├── Saldo y movimientos
        │   ├── Recompensas
        │   ├── Detalle
        │   ├── Confirmar canje
        │   └── Mis cupones
        └── Perfil
            ├── Impacto
            ├── Historial
            ├── Preferencias
            ├── Privacidad y datos
            ├── Ayuda
            └── Cerrar/eliminar cuenta
```

## 9. Flujos principales

### 9.1 Registro

1. La persona elige teléfono o correo.
2. Recibe un código de un solo uso.
3. Define nombre visible o alias.
4. Informa rango de edad, ciudad y acepta términos vigentes.
5. Puede habilitar notificaciones y ubicación; ambas solicitudes son contextuales y opcionales.
6. La app crea una billetera de puntos con saldo cero.

Datos que no son necesarios para el MVP:

- cédula;
- domicilio exacto;
- fecha completa de nacimiento;
- contactos;
- género;
- datos de pago.

Si se permite participación de menores, los términos y el flujo de consentimiento deben revisarse legalmente antes del lanzamiento.

### 9.2 Encontrar estación

1. Inicio muestra la estación cercana solo si existe permiso de ubicación.
2. Ubicaciones ofrece mapa y lista.
3. El usuario filtra por disponibilidad, horario o distancia.
4. La ficha muestra dirección, anfitrión, estado, material aceptado, horario, accesibilidad y última actualización.
5. Puede abrir navegación externa.

Estados de estación:

- disponible;
- casi llena;
- llena;
- temporalmente fuera de servicio;
- sin conexión;
- cerrada por horario;
- mantenimiento programado.

### 9.3 Iniciar sesión en VoxStation

1. La app solicita cámara la primera vez que se toca “Escanear”.
2. Escanea un QR mostrado por la estación.
3. El QR contiene un identificador de estación y un desafío efímero firmado; no contiene datos personales.
4. La app envía el token al backend autenticada.
5. El backend valida firma, vencimiento, estado de estación y ausencia de otra sesión incompatible.
6. Se crea una `recycling_session` corta.
7. El backend notifica a la VoxStation mediante canal en tiempo real.
8. La pantalla muestra un alias enmascarado y la app confirma “VoxStation conectada”.

Si la estación usa un QR adhesivo estático en el primer prototipo, el backend debe añadir un desafío mostrado en pantalla o una confirmación física. Un QR estático por sí solo puede fotografiarse y usarse fuera del lugar.

### 9.4 Depositar envases

Por cada objeto:

1. la estación detecta presencia;
2. bloquea la entrada de un segundo objeto;
3. intenta leer código de barras;
4. captura características físicas;
5. mide peso y dimensiones aproximadas;
6. clasifica y ejecuta reglas;
7. acepta o devuelve;
8. confirma la caída en el depósito;
9. publica un evento firmado con ID único;
10. el backend lo procesa de forma idempotente;
11. el libro mayor acredita puntos;
12. app y pantalla actualizan conteo y saldo.

Estados visibles:

- “Acerca una botella”;
- “Validando”;
- “Botella aceptada: +N puntos”;
- “No pudimos leer el código: gira la botella”;
- “La botella todavía tiene líquido”;
- “Este material aún no está habilitado”;
- “Retira la botella e inténtalo nuevamente”;
- “VoxStation llena: no ingreses más envases”.

La pantalla física es la fuente inmediata de instrucción. La app complementa, no obliga a mirar dos pantallas al mismo tiempo.

### 9.5 Cerrar sesión

Se cierra por:

- botón “Terminar”;
- inactividad;
- límite de tiempo;
- estación llena/falla;
- pérdida de conexión prolongada;
- decisión de seguridad del backend.

El resumen muestra:

- envases aceptados;
- rechazados y causas;
- puntos obtenidos;
- saldo nuevo;
- impacto registrado;
- ubicación y hora;
- enlace de ayuda si existe discrepancia.

### 9.6 Canjear recompensa

1. La persona abre una recompensa.
2. Ve aliado, costo en puntos, existencia, ubicación, vigencia, restricciones y política de devolución.
3. Toca “Canjear”.
4. Una pantalla de confirmación informa que los puntos se descontarán.
5. El backend ejecuta en una transacción: reservar inventario, debitar puntos y emitir cupón.
6. El cupón aparece en “Mis cupones”.
7. Para usarlo, genera QR/código dinámico con vencimiento corto o un código de un solo uso.
8. El comercio valida mediante portal o integración.
9. Se registra `redeemed` con comercio, hora y operador/sistema.

Nunca usar una imagen estática de cupón como única prueba.

## 10. Especificación por pantalla

### 10.1 Splash y estado

Contenido:

- logo EXOVOX;
- versión;
- carga silenciosa de configuración remota;
- aviso de mantenimiento;
- actualización obligatoria solo por incompatibilidad o riesgo.

Criterio: no bloquear por una petición analítica o contenido promocional.

### 10.2 Onboarding

Tres o cuatro páginas como máximo:

1. Recicla botellas PET.
2. Escanea una VoxStation y deposita.
3. Suma puntos y canjea.
4. Sigue el impacto del material.

Incluir “Omitir” y no pedir permisos todavía.

### 10.3 Inicio

Jerarquía:

- saludo/alias;
- saldo de puntos;
- botón Escanear VoxStation;
- estación más cercana o acceso al mapa;
- reto/campaña activa claramente etiquetada;
- actividad reciente;
- acceso a recompensa destacada.

No convertir la pantalla en un muro publicitario.

### 10.4 Ubicaciones

- selector mapa/lista;
- buscador por zona o lugar;
- filtros;
- tarjetas con estado y distancia;
- leyenda de estados;
- estado sin ubicación: pedir zona manual;
- estado sin resultados: sugerir limpiar filtros o proponer ubicación.

### 10.5 Detalle de estación

- nombre público;
- anfitrión;
- dirección;
- horario;
- estado y última telemetría;
- PET aceptado y restricciones;
- accesibilidad;
- recompensas/campañas especiales;
- botón navegar;
- botón reportar problema.

### 10.6 Escáner

- marco claro;
- linterna;
- guía “Escanea el QR de la VoxStation, no el código de la botella”;
- alternativa accesible para ingresar un código corto mostrado en la máquina;
- explicación de permiso de cámara;
- manejo de QR vencido, estación inválida o sesión ocupada.

### 10.7 Sesión activa

- estación conectada;
- cronómetro o tiempo restante;
- conteo aceptado/rechazado;
- puntos de la sesión;
- última validación;
- instrucciones breves;
- botón Terminar;
- ayuda sin abandonar la sesión.

### 10.8 Puntos

- saldo disponible;
- puntos pendientes, si existe validación posterior;
- próxima expiración;
- movimientos con origen;
- filtros: ganados, usados, ajustes, vencidos;
- enlace a reglas del programa.

### 10.9 Recompensas

- categorías y búsqueda;
- costo en puntos;
- stock/estado;
- vigencia;
- ubicación o canal;
- patrocinio claramente identificado;
- orden por relevancia, no por manipulación opaca.

Estados:

- disponible;
- poco stock;
- agotada;
- próxima;
- no elegible;
- pausada;
- vencida.

### 10.10 Mis cupones

Pestañas:

- disponibles;
- usados;
- vencidos/cancelados.

Cada cupón muestra condiciones completas y un código dinámico solo cuando la persona toca “Usar ahora”.

### 10.11 Impacto

- envases aceptados;
- kg estimados o verificados, diferenciados;
- racha/recurrencia opcional;
- material valorizado correspondiente a retiros confirmados;
- metodología y fecha;
- contribución colectiva sin exponer ranking personal por defecto.

### 10.12 Perfil y privacidad

- alias y datos de contacto;
- ciudad/zona aproximada;
- preferencias de comunicación;
- sesiones/dispositivos;
- descargar datos;
- eliminar cuenta;
- política y términos con versión;
- soporte;
- cerrar sesión.

## 11. Motor de puntos

### Reglas

Las reglas viven en el backend y se versionan. Pueden considerar:

- material;
- tamaño o SKU;
- patrocinador;
- estación;
- periodo;
- primer depósito;
- reto;
- límite por usuario/día;
- riesgo antifraude.

Ejemplo conceptual:

```text
puntos = base_material
       + bono_campaña
       + bono_reto
       - ajustes_no_aplicables
```

No codificar valores fijos en la app.

### Libro mayor

Cada movimiento es inmutable:

- crédito por depósito;
- débito por canje;
- reversión;
- ajuste manual autorizado;
- vencimiento;
- migración/promoción.

Campos mínimos:

- `ledger_entry_id`;
- `wallet_id`;
- `amount` positivo o negativo;
- `type`;
- `source_id`;
- `rule_version`;
- `created_at`;
- `idempotency_key`;
- saldo resultante o referencia de cálculo.

No actualizar un único número de saldo sin conservar movimientos auditables.

## 12. QR y sesión segura

### Contenido conceptual del QR dinámico

```json
{
  "v": 1,
  "station_id": "st_...",
  "nonce": "random...",
  "issued_at": 0,
  "expires_at": 0,
  "signature": "..."
}
```

Puede codificarse en una URL universal corta. El backend debe validar firma y vencimiento; la app no confía solo en el contenido visual.

### Reglas de sesión

- una sesión activa por usuario;
- una sesión ciudadana por VoxStation, salvo diseño multiusuario explícito;
- vencimiento corto;
- token no reutilizable;
- alias enmascarado en pantalla;
- cierre automático;
- reanudación limitada si la app pierde conexión;
- todos los eventos vinculados a `session_id`.

## 13. Validación de envases

### Catálogo de producto

Entidad `product_sku`:

- GTIN/EAN/UPC;
- marca y fabricante;
- nombre/formato;
- material esperado;
- volumen;
- peso vacío y tolerancia;
- color;
- dimensiones/rangos;
- campaña elegible;
- estado y fuente de validación.

Los códigos comerciales se repiten entre envases. No son identificadores únicos ni prueba suficiente de consumo.

### Resultado de clasificación

- `accepted`;
- `rejected_unknown_code`;
- `rejected_material`;
- `rejected_weight`;
- `rejected_shape`;
- `rejected_liquid`;
- `rejected_duplicate_event`;
- `rejected_station_full`;
- `manual_review`, solo para pruebas controladas.

### Privacidad visual

La cámara interna debe encuadrar únicamente el objeto y el compartimento. No debe capturar rostros ni el entorno. Las imágenes se procesan en el borde cuando sea viable; si se almacenan muestras para mejorar el modelo, se requiere una finalidad, retención limitada y controles específicos.

## 14. Arquitectura de eventos

```text
App ──HTTPS/WebSocket── API EXOVOX ──PostgreSQL/Redis
                            │
                            ├── Motor de puntos
                            ├── Recompensas
                            ├── Notificaciones
                            ├── Analítica agregada
                            └── Servicio de sesiones
                                      │
                                  MQTT/TLS
                                      │
                                  VoxStation
                         sensores -> borde -> actuadores
```

Evento de depósito conceptual:

```json
{
  "event_id": "evt_unique",
  "station_id": "st_123",
  "session_id": "ses_123",
  "device_timestamp": "ISO-8601",
  "sequence": 15,
  "barcode": "...",
  "classification": "accepted",
  "confidence": 0.98,
  "measured_weight_g": 22.4,
  "sensor_summary": {},
  "firmware_version": "...",
  "signature": "..."
}
```

El servidor valida firma, secuencia, duplicados, sesión y reglas antes de acreditar.

## 15. Modelo de datos principal

### Identidad

- `users`;
- `user_consents`;
- `devices`;
- `auth_sessions`;
- `privacy_requests`.

### Estaciones

- `stations`;
- `station_components`;
- `station_telemetry`;
- `station_status_history`;
- `maintenance_tickets`;
- `station_firmware`.

### Reciclaje

- `recycling_sessions`;
- `deposit_events`;
- `deposit_classifications`;
- `product_skus`;
- `material_types`;
- `fraud_signals`.

### Puntos y recompensas

- `wallets`;
- `points_ledger`;
- `points_rules`;
- `partners`;
- `rewards`;
- `reward_inventory`;
- `reward_redemptions`;
- `coupons`.

### Circularidad

- `pickup_orders`;
- `pickup_batches`;
- `batch_weights`;
- `chain_of_custody_events`;
- `recyclers_or_processors`;
- `destination_evidence`.

### Campañas

- `campaigns`;
- `campaign_eligibility`;
- `campaign_budget`;
- `sponsor_reports`.

## 16. API mínima

### Autenticación

- `POST /v1/auth/request-code`
- `POST /v1/auth/verify-code`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`

### Usuario

- `GET /v1/me`
- `PATCH /v1/me`
- `GET /v1/me/consents`
- `POST /v1/me/privacy-export`
- `DELETE /v1/me`

### Estaciones

- `GET /v1/stations`
- `GET /v1/stations/{id}`
- `POST /v1/stations/resolve-qr`

### Sesiones

- `POST /v1/recycling-sessions`
- `GET /v1/recycling-sessions/{id}`
- `POST /v1/recycling-sessions/{id}/close`
- canal WebSocket/SSE para actualizaciones.

### Puntos

- `GET /v1/wallet`
- `GET /v1/wallet/ledger`

### Recompensas

- `GET /v1/rewards`
- `GET /v1/rewards/{id}`
- `POST /v1/rewards/{id}/redeem`
- `GET /v1/coupons`
- `POST /v1/coupons/{id}/activate`

### Impacto e historial

- `GET /v1/me/deposits`
- `GET /v1/me/impact`

Todas las operaciones que crean créditos, débitos o canjes requieren clave de idempotencia.

## 17. Operación sin conexión

### App

- puede mostrar contenido cacheado, saldo con marca temporal y ubicaciones recientes;
- no debe confirmar puntos nuevos sin respuesta del backend;
- si pierde conexión durante una sesión, conserva el contexto y reintenta durante una ventana corta;
- muestra claramente “Pendiente de sincronización” cuando corresponda.

### VoxStation

- puede validar y almacenar eventos firmados en cola;
- el modo offline debe tener límites de tiempo y cantidad;
- los puntos quedan pendientes hasta sincronización;
- secuencias y timestamps permiten detectar repeticiones;
- al exceder el umbral, la estación se pausa de forma segura.

Nunca mostrar como definitivo un saldo que aún no fue confirmado por el libro mayor.

## 18. Prevención de fraude y abuso

- QR dinámico y de corta duración;
- eventos firmados por dispositivo;
- claves únicas almacenadas de forma segura;
- `event_id` y secuencia monotónica;
- confirmación física de caída;
- peso y visión dentro de tolerancias;
- límites diarios configurables;
- velocidad máxima razonable por depósito;
- detección de sesiones simultáneas;
- análisis de anomalías por estación/usuario/SKU;
- revisión y bloqueo gradual, no sanción automática opaca;
- trazabilidad de ajustes manuales;
- cupón de un solo uso y verificación en línea cuando sea posible.

## 19. Seguridad

### Aplicación

- tokens cortos y refresh seguro;
- almacenamiento en Keychain/Keystore;
- no guardar códigos OTP ni secretos en logs;
- protección contra capturas solo en cupones si aporta valor y no afecta accesibilidad;
- validación de enlaces universales;
- detección de versión vulnerable;
- dependencias revisadas y actualizadas.

### API

- TLS;
- autorización por recurso y rol;
- límites de tasa;
- protección contra enumeración de cuentas;
- secretos fuera del repositorio;
- cifrado de datos sensibles en reposo;
- registros de auditoría;
- copias de seguridad y prueba de restauración;
- separación de ambientes;
- pruebas de abuso del motor de puntos.

### IoT

- identidad única por estación;
- certificados rotables;
- firmware firmado;
- puertos físicos restringidos;
- arranque seguro si el hardware lo permite;
- actualizaciones remotas con rollback;
- red segmentada en ubicaciones anfitrionas;
- detección de puerta abierta y manipulación.

## 20. Privacidad

### Finalidades

- operar cuenta y sesión;
- acreditar puntos;
- prevenir fraude;
- entregar recompensas;
- brindar soporte;
- medir impacto y desempeño de manera agregada;
- enviar comunicaciones con consentimiento.

### Minimización

- ubicación precisa solo mientras se usa el mapa o una función explícita;
- almacenar zona aproximada si basta para análisis;
- no compartir historial individual con marcas;
- separar datos de contacto del repositorio analítico;
- anonimizar o agregar reportes;
- retención diferenciada para cuenta, seguridad, contabilidad y telemetría.

### Derechos y controles

- consultar y corregir datos;
- descargar información;
- retirar consentimiento de marketing;
- eliminar cuenta, respetando obligaciones legítimas de conservación;
- conocer versiones de términos aceptadas;
- contactar a privacidad/soporte.

## 21. Recompensas y reglas comerciales

Cada recompensa debe definir:

- aliado responsable;
- descripción y valor;
- costo en puntos;
- stock total y por periodo;
- inicio y fin;
- ciudades/locales;
- horarios y exclusiones;
- edad mínima, si aplica;
- combinabilidad;
- política de cancelación;
- quién asume costo y conciliación;
- código de campaña.

El inventario se reserva de manera atómica al canjear. Si la emisión falla, puntos e inventario se revierten en la misma operación o mediante una compensación auditada.

## 22. Notificaciones

Tipos permitidos:

- resumen de sesión;
- cupón próximo a vencer;
- puntos próximos a vencer;
- estación favorita disponible o temporalmente fuera de servicio;
- nueva recompensa relevante;
- reto aceptado;
- seguridad de cuenta;
- cambios materiales en términos.

Preferencias separadas:

- transaccionales;
- operativas;
- recompensas;
- marketing.

No usar notificaciones de culpa ni afirmar un impacto no verificado.

## 23. Analítica de producto

### Embudo

```text
instalación
-> registro verificado
-> mapa/detalle
-> QR escaneado
-> sesión iniciada
-> primer envase aceptado
-> segunda sesión
-> recompensa vista
-> recompensa canjeada
-> cupón utilizado
```

Eventos sugeridos:

- `onboarding_completed`;
- `station_map_opened`;
- `station_detail_opened`;
- `station_qr_scanned`;
- `recycling_session_started`;
- `deposit_result_received` con categoría, no imagen;
- `recycling_session_completed`;
- `reward_viewed`;
- `reward_redeemed`;
- `coupon_activated`;
- `support_issue_created`;
- `privacy_setting_changed`.

No enviar a analítica:

- correo o teléfono;
- QR crudo;
- token de sesión;
- cupón completo;
- imágenes de envases;
- ubicación precisa persistente;
- contenido libre de soporte.

## 24. Métricas del MVP

### Adopción

- registros verificados;
- usuarios activos mensuales;
- conversión registro -> primer depósito;
- tiempo hasta primer depósito;
- recurrencia a 7, 30 y 60 días.

### Experiencia

- tiempo QR -> sesión;
- tiempo de validación por envase;
- tasa de aceptación/rechazo y causas;
- sesiones abandonadas;
- errores por versión/dispositivo;
- satisfacción posterior a sesión.

### Recompensas

- puntos emitidos;
- pasivo de puntos;
- tasa de canje;
- tasa de uso de cupón;
- costo por recompensa/acción;
- stock vencido o agotado.

### Operación

- disponibilidad por estación;
- llenado y tiempo hasta retiro;
- diferencia conteo-peso;
- merma/contaminación;
- incidentes y mantenimiento.

## 25. Accesibilidad

- etiquetas semánticas para lector de pantalla;
- texto escalable sin cortes;
- contraste AA;
- botones de al menos 44 x 44 px;
- vibración y texto para aceptación/rechazo;
- no depender de rojo/verde;
- modo de alto contraste;
- reducción de animaciones;
- alternativa al escaneo QR mediante código corto;
- instrucciones de VoxStation a altura y lenguaje accesibles;
- pruebas con usuarios reales y distintos dispositivos.

## 26. Diseño y sistema visual

- sistema propio, no replicar interfaz ni colores de BioBox;
- lenguaje visual de puntos que se agregan y rutas que se conectan;
- componentes reutilizables para estados de estación, saldo y cupones;
- animación breve de punto acreditado, sin retrasar la siguiente botella;
- modo claro como base y modo oscuro opcional;
- iconografía acompañada de texto en acciones críticas;
- imágenes reales del piloto cuando estén disponibles.

## 27. Pruebas

### Funcionales

- autenticación y recuperación;
- permisos denegados/aceptados;
- QR válido, vencido, fotografiado y manipulado;
- estación ocupada, llena, offline o en mantenimiento;
- depósito aceptado/rechazado;
- evento duplicado;
- pérdida de conexión;
- cierre por inactividad;
- canje con y sin saldo;
- carrera por último cupón;
- reversión de operación fallida;
- eliminación de cuenta.

### Dispositivos

- Android de gama baja/media;
- versiones mínimas soportadas;
- cámaras con enfoque lento;
- pantallas pequeñas y texto grande;
- red 3G/4G inestable;
- batería baja;
- zonas horarias y reloj incorrecto.

### Hardware-in-the-loop

- catálogo de botellas válidas;
- botella con líquido;
- objeto con código pegado;
- dos botellas simultáneas;
- intento de retirar y reinsertar;
- botella aplastada;
- código ilegible;
- caída no confirmada;
- depósito lleno;
- apertura de puerta técnica;
- reinicio durante sesión.

### Seguridad y privacidad

- abuso de OTP;
- acceso horizontal a historial/cupones;
- repetición de eventos;
- manipulación de puntos;
- exportaciones B2B;
- secretos en logs;
- retención y borrado;
- imágenes sin rostro/entorno.

## 28. Criterios de aceptación del MVP

- El usuario registrado puede iniciar una sesión escaneando un QR vigente.
- Una estación válida recibe la sesión y muestra confirmación.
- Cada evento aceptado se acredita una sola vez aunque sea reenviado.
- La app refleja puntos y depósitos en menos de cinco segundos en condiciones normales.
- Un rechazo no suma puntos y muestra una causa accionable.
- El saldo coincide con la suma del libro mayor.
- Un canje descuenta puntos e inventario de forma atómica.
- Un cupón no puede usarse dos veces.
- La estación puede operar de forma segura ante una caída breve de red.
- La app indica cuando un valor es pendiente.
- Ubicación y notificaciones funcionan aun si el usuario niega permisos.
- El usuario puede consultar privacidad, cambiar preferencias y solicitar eliminación.
- Los reportes de aliado no exponen identidad ni historial individual.
- Todo retiro del piloto puede vincularse a peso y destino.

## 29. Backlog por entregas

### Entrega 0 - Simulador y contratos

- especificación de eventos;
- simulador de VoxStation;
- API de sesión;
- catálogo de SKU inicial;
- motor de puntos mínimo;
- threat model.

### Entrega 1 - Alpha interna

- autenticación;
- QR;
- sesión y eventos simulados;
- saldo/historial;
- estación única;
- telemetría y logs.

### Entrega 2 - Beta cerrada

- integración con prototipo físico;
- mapa;
- rechazos completos;
- recompensas y cupones;
- soporte;
- antifraude inicial;
- privacidad y analítica.

### Entrega 3 - Piloto público

- tres ubicaciones;
- monitoreo y SLA;
- operación offline limitada;
- panel de aliados;
- cadena de custodia;
- reportes de impacto;
- pruebas de carga y seguridad.

### Después del piloto

- retos segmentados;
- estaciones favoritas;
- campañas intercampus;
- latas u otros materiales;
- integraciones con POS o transporte;
- predicción de llenado y optimización de rutas;
- soporte multilingüe validado.

## 30. Equipo técnico mínimo

- product owner;
- diseñador UX/UI;
- desarrollador Flutter;
- desarrollador backend;
- ingeniero IoT/embebidos;
- ingeniero mecánico/electrónico;
- QA con pruebas hardware-software;
- DevOps/seguridad parcial;
- operaciones y soporte;
- analista de datos/impacto.

## 31. Entornos y entrega continua

- `development`, `staging`, `pilot`, `production`;
- estaciones de prueba separadas de las productivas;
- datos sintéticos fuera de producción;
- compilaciones firmadas;
- revisión automática, tests y escaneo de dependencias;
- despliegues graduales;
- feature flags para campañas y reglas;
- rollback de app/backend/firmware;
- tablero de disponibilidad y alertas.

## 32. Observabilidad

Correlacionar sin exponer datos sensibles:

- `request_id`;
- `station_id`;
- `session_id` seudónimo;
- `event_id`;
- versión de app, backend y firmware;
- latencia por etapa;
- resultado y código de error;
- estado de sincronización.

Alertas críticas:

- divergencia de saldo;
- tasa inusual de depósitos;
- estación acepta sin confirmar caída;
- llenado crítico;
- puerta técnica abierta;
- cola offline creciente;
- alta tasa de rechazo;
- canjes duplicados;
- certificados próximos a vencer.

## 33. Decisiones pendientes

- teléfono, correo o ambos para autenticación;
- edad mínima y consentimiento;
- valor y vencimiento de puntos;
- política de reversión y reclamos;
- proveedor de mapas;
- backend/proveedor de identidad;
- modelo de validación visual en borde;
- tamaños de PET iniciales;
- modo offline exacto;
- portal de validación de comercios;
- SLA y soporte;
- retenciones legales y operativas;
- stack final según equipo y capital.

## 34. Documentos relacionados

- Estrategia y modelo completo: `../01.PROJECT/EXOVOX-Proyecto.md`
- Estructura de landing: `./EXOVOX-Landing-Page.md`

## 35. Definición de terminado para el piloto

El producto estará listo para un piloto público cuando exista una cadena completa y probada:

```text
cuenta -> QR -> sesión -> validación física -> evento firmado
-> puntos -> recompensa -> cupón usado
-> retiro -> peso -> destino -> reporte agregado
```

Si alguno de esos eslabones depende de una operación manual no documentada, debe declararse, asignarse y medirse antes de abrir el piloto.
