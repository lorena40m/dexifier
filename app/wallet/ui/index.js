var r2 = Object.defineProperty;
var o = (e, t) => r2(e, "name", { value: t, configurable: !0 });
import { i18n as $1 } from "@lingui/core";
import { I18nProvider as i2 } from "@lingui/react";
import a2, { useEffect as jt, useReducer as s2 } from "react";
var It = JSON.parse(
  `{"Bridge Limit Error":"Br\xFCckenbegrenzungsfehler","Minimum required slippage: {minRequiredSlippage}":["Minimal ben\xF6tigte Slippage: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Ihre: ",["userSlippage"]],"Select chain types":"Kettentypen ausw\xE4hlen","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Diese Brieftasche unterst\xFCtzt mehrere Ketten. W\xE4hlen Sie aus, zu welcher Kette Sie sich verbinden m\xF6chten.","Something went wrong":"Etwas ist schief gelaufen","Something went wrong. Please refresh the app.":"Etwas ist schief gelaufen. Bitte aktualisieren Sie die App.","No results found":"Keine Ergebnisse gefunden","Try using different keywords":"Versuchen Sie, andere Stichw\xF6rter zu verwenden","Select Blockchain":"Blockchain ausw\xE4hlen","All":"Alle","More +{count}":["Mehr +",["count"]],"Activate this tab":"Diesen Tab aktivieren","Another tab is open and handles transactions.":"Ein weiterer Tab ist ge\xF6ffnet und bearbeitet Transaktionen.","Activate current tab":"Aktuellen Tab aktivieren","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"Derzeit laufen einige Transaktionen und werden von einem anderen Browser-Tab abgewickelt. Wenn Sie diesen Tab aktivieren, werden alle Transaktionen, die sich bereits im Schritt zum Transaktionszeichen befinden, ablaufen.","Confirm":"Best\xE4tigen","Your {blockchainName} wallets":["Ihre ",["blockchainName"]," Wallets"],"Insufficient account balance":"Unzureichender Kontostand","Proceed anyway":"Trotzdem fortfahren","You need to connect a {blockchainName} wallet.":["Sie m\xFCssen eine ",["blockchainName"]," Wallet verbinden."],"Send to a different address":"An eine andere Adresse senden","Your destination address":"Ihre Zieladresse","Address {destination} doesn't match the blockchain address pattern.":["Adresse ",["destination"]," stimmt nicht mit dem Blockchain-Adressmuster \xFCberein."],"Add {chain} chain":[["chain"]," Kette hinzuf\xFCgen"],"Add {blockchainDisplayName} Chain":[["blockchainDisplayName"]," Kette hinzuf\xFCgen"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["Sie sollten eine ",["blockchainDisplayName"]," unterst\xFCtzte Brieftasche verbinden oder eine andere ",["blockchainDisplayName"]," Adresse w\xE4hlen"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," Kette hinzugef\xFCgt"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," wird Ihrer Brieftasche hinzugef\xFCgt, Sie k\xF6nnen sie zum Tausch verwenden."],"Request Rejected":"Anfrage abgelehnt","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Sie haben das Hinzuf\xFCgen von ",["blockchainDisplayName"]," Kette zu Ihrer Brieftasche abgelehnt."],"Show more wallets":"Mehr Brieftaschen anzeigen","Cancel":"Abbrechen","Refresh":"Aktualisieren","Notifications":"Benachrichtigungen","Settings":"Einstellungen","Transactions History":"Transaktionsverlauf","Connect Wallet":"Wallet verbinden","Today":"Heute","Swaps steps":"Swaps Schritte","Retry":"Wiederholen","Reset":"Reset","There are no notifications.":"Keine Benachrichtigungen vorhanden.","Slippage Error":"Slippage Fehler","Slippage Warning":"Slippage Warnung","Yours: {amount} {symbol}":["Ihre: ",["amount"]," ",["symbol"]],"See All Routes":"Alle Routen anzeigen","View more info":"Mehr Infos anzeigen","Gas & Fee Explanation":"Gas- & Geb\xFChrenerkl\xE4rung","Details":"Details","Total Payable Fee":"Gesamtgeb\xFChr","Hide non-payable fees":"Nicht zu zahlende Geb\xFChren ausblenden","Show non-payable fees":"Nicht zahlbare Geb\xFChren anzeigen","Description":"Beschreibung","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"Die folgenden Geb\xFChren werden in der Transaktionsleistung ber\xFCcksichtigt und\\n                Sie brauchen kein zus\xE4tzliches Gas daf\xFCr zu bezahlen.","Swap input":"Swap input","Estimated output":"Gesch\xE4tzte Ausgabe","Via:":"Via:","Chains:":"Ketten:","Sort by":"Sortieren nach","Smart Routing":"Intelligente Routing","Lowest Fee":"Niedrigste Geb\xFChr","Fastest Transfer":"Schnellste \xDCbertragung","Maximum Return":"Maximale Retoure","Maximum Output":"Maximale Ausgabe","Swapping":"Swapping","Gas cost":"Gaskosten","Receiving":"Empfangen","Price impact":"Preisauswirkung","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Sie m\xFCssen den Slippage f\xFCr diese Route auf mindestens ",["minRequiredSlippage"]," erh\xF6hen."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Wir empfehlen Ihnen, den Slippage auf mindestens ",["minRequiredSlippage"]," f\xFCr diese Route zu erh\xF6hen."],"Caution, your slippage is high.":"Vorsicht, Ihre Slippage ist hoch.","Change":"\xC4ndern","Change settings":"Einstellungen \xE4ndern","High slippage":"Hoher Slippage","Low slippage":"Niedrige Slippage"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Achtung, Ihr Slippage ist hoch (=",["userSlippage"],"). Ihr Handel k\xF6nnte vorderhand laufen."],"Confirm anyway":"Trotzdem best\xE4tigen","Slippage tolerance per swap":"Slippage Toleranz pro Tausch","Custom":"Eigene","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Ihre Transaktion wird r\xFCckg\xE4ngig gemacht, wenn sich der Preis ung\xFCnstig um mehr als diesen Prozentsatz \xE4ndert","Warning":"Warnung","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"Diese Einstellung wird pro Schritt angewendet (z.B. 1Inch, Thorchain usw.), was bedeutet, dass nur der Schritt r\xFCckg\xE4ngig gemacht wird, nicht die gesamte Transaktion.","Swap and Bridge":"Tauschen und Br\xFCcke","Request ID":"Anfrage-ID","Not found":"Nicht gefunden","Swap with request ID = {requestId} not found.":["Swap mit Request ID = ",["requestId"]," nicht gefunden."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["Sie haben ",["amount"]," ",["token"]," in ",["conciseAddress"]," Wallet auf ",["chain"]," Kette erhalten."],"Transaction was not sent.":"Transaktion wurde nicht versendet.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," auf ",["blockchain"]," verbleiben in Ihrer Brieftasche"],"Delete":"L\xF6schen","Try again":"Erneut versuchen","View transaction":"Transaktion anzeigen","Connect":"Verbinden","Swap Successful":"Tausch erfolgreich","Transaction Failed":"Transaktion fehlgeschlagen","Done":"Fertig","Diagnosis":"Diagnose","See Details":"Details ansehen","Cancel Swap":"Tausch abbrechen","Are you sure you want to cancel this swap?":"Sind Sie sicher, dass Sie diesen Swap abbrechen m\xF6chten?","Yes, Cancel it":"Ja, abbrechen","No, Continue":"Nein, Fortfahren","Delete Transaction":"Transaktion l\xF6schen","Are you sure you want to delete this swap?":"Sind Sie sicher, dass Sie diesen Swap l\xF6schen m\xF6chten?","Yes, Delete it":"Ja, l\xF6schen","No, Cancel":"Nein, abbrechen","Change Network":"Netzwerk \xE4ndern","Network Changed":"Netzwerk ge\xE4ndert","Select Token":"Token ausw\xE4hlen","Wallet Connected":"Wallet verbunden","Your wallet is connected, you can use it to swap.":"Ihre Brieftasche ist verbunden, Sie k\xF6nnen sie zum Tausch verwenden.","Failed to Connect":"Verbindung fehlgeschlagen","Your wallet is not connected. Please try again.":"Ihre Brieftasche ist nicht verbunden. Bitte versuchen Sie es erneut.","Connecting to your wallet":"Verbinde mit Ihrer Brieftasche","Click connect in your wallet popup.":"Klicken Sie in Ihrem Wallet-Popup auf Verbinden.","Failed Network, Please retry your swap.":"Netzwerk fehlgeschlagen, bitte versuche deinen Swap.","Please reset your liquidity sources.":"Bitte setzen Sie Ihre Liquidit\xE4tsquellen zur\xFCck.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Sie haben die Liquidit\xE4tsquellen begrenzt und dies k\xF6nnte dazu f\xFChren, dass Rango keine Routen findet. Bitte \xFCberlegen Sie Ihre Liquidit\xE4tsquellen zur\xFCckzusetzen.","No Routes Found.":"Keine Routen gefunden.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Gr\xFCnde warum Rango keine Route finden konnte: geringe Liquidit\xE4t beim Token, sehr geringe Eingabeaufforderung oder keine Routen f\xFCr die gew\xE4hlte Kombination aus Ein-/Ausgabe-Token.","Bridge Limit Error: Please increase your amount.":"Bridge-Limit-Fehler: Bitte erh\xF6hen Sie Ihren Betrag.","Bridge Limit Error: Please decrease your amount.":"Br\xFCckenbegrenzung Fehler: Bitte verringern Sie Ihren Betrag.","High Price Impact":"Hohe Preisbelastung","Price impact is too high!":"Preisauswirkungen sind zu hoch!","The price impact is significantly higher than the allowed amount.":"Die Preisauswirkungen sind deutlich h\xF6her als der zul\xE4ssige Betrag.","Confirm high price impact":"Best\xE4tigen Sie den hohen Preisaussto\xDF","Route updated and price impact is too high, try again later!":"Route aktualisiert und Preis Auswirkungen ist zu hoch, versuchen Sie es sp\xE4ter noch einmal!","USD Price Unknown":"USD Preis unbekannt","USD Price Unknown, Cannot calculate Price Impact.":"USD-Preis unbekannt, Preisauswirkungen k\xF6nnen nicht berechnet werden.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD-Preis unbekannt, Preisauswirkungen k\xF6nnen nicht berechnet werden. Der Preisaussto\xDF kann h\xF6her sein als \xFCblich. M\xF6chten Sie den Swap wirklich fortsetzen?","Confirm USD Price Unknown":"USD-Preis unbekannt best\xE4tigen","Swap":"Tausch","Swap anyway":"Trotzdem tauschen","The route goes through Ethereum. Continue?":"Die Route geht durch Ethereum. Weiter?","Network Fee":"Netzwerkgeb\xFChr","Protocol Fee":"Protokollgeb\xFChr","Affiliate Fee":"Affiliate-Geb\xFChr","Outbound Fee":"Ausgehende Geb\xFChr","Rango Fee":"Rango-Geb\xFChr","Route has been updated.":"Route wurde aktualisiert.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Ausgabebetrag wurde auf ",["newOutputAmount"]," ge\xE4ndert (",["percentageChange"],"% \xC4nderung)."],"Route swappers has been updated.":"Route Swappers wurde aktualisiert.","Route internal coins has been updated.":"Interne Routenm\xFCnzen wurden aktualisiert.","Routes":"Routen","From":"Von","To":"An","Light":"Hell","Dark":"Dunkel","Auto":"Auto","Loading failed":"Laden fehlgeschlagen","Bridges":"Br\xFCcken","Exchanges":"Austausche","Language":"Sprache","Infinite approval":"Unendliche Genehmigung","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Das Aktivieren des 'Infinite approval' Modus gew\xE4hrt uneingeschr\xE4nkten Zugriff auf intelligente Vertr\xE4ge von DEXes/Bridges, so dass diese den genehmigten Tokenbetrag uneingeschr\xE4nkt nutzen k\xF6nnen.","Theme":"Thema","Confirm Swap":"Swap best\xE4tigen","Start Swap":"Swap starten","You get":"Du bekommst","History":"Verlauf","Search Transaction":"Transaktion durchsuchen","language":"sprache","Deselect all":"Alle abw\xE4hlen","Select all":"Alles ausw\xE4hlen","Search {sourceType}":["Suche ",["sourceType"]],"Search Blockchain":"Blockchain durchsuchen","Source":"Quelle","Destination":"Ziel","Swap {type}":[["type"]," tauschen"],"Search Token":"Such-Token","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Derzeit sind Sie im Kampagnenmodus mit Beschr\xE4nkungen f\xFCr Liquidit\xE4tsquellen. M\xF6chten Sie aus diesem Modus ausschalten und alle verf\xFCgbaren Liquidit\xE4tsquellen nutzen?","The request ID is necessary to display the swap details.":"Die Request-ID ist notwendig, um die Swap-Details anzuzeigen.","Connect Wallets":"Wallets verbinden","Choose a wallet to connect.":"Wallet zum Verbinden ausw\xE4hlen.","This week":"Diese Woche","This month":"Diesen Monat","This year":"Dieses Jahr","Required: >= {min} {symbol}":["Erforderlich: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Erforderlich: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Erforderlich: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Erforderlich: < ",["max"]," ",["symbol"]]," for network fee":" f\xFCr Netzwerkgeb\xFChr"," for swap":" f\xFCr Tausch"," for input and network fee":" f\xFCr Eingabe und Netzwerkgeb\xFChr","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Ben\xF6tigt <unk> ",["requiredAmount"]," ",["symbol"],["reason"],", aber Sie haben ",["currentAmount"]," ",["symbol"]," in Ihrem ",["blockchain"]," Wallet."],"Waiting for connecting wallet":"Warte auf Verbindung der Brieftasche","Waiting for other running tasks to be finished":"Warte auf Beendigung anderer laufender Aufgaben","Waiting for changing wallet network":"Warte auf \xC4nderung des Wallet-Netzwerks","Sunday":"Sonntag","Monday":"Montag","Tuesday":"Dienstag","Wednesday":"Mittwoch","Thursday":"Donnerstag","Friday":"Freitag","Saturday":"Samstag","Powered By":"Powered by","Aggregated Transaction":"Gesamte Transaktion","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Tausch auf ",["fromChain"]," \xFCber ",["swapper"]],"Bridge to {toChain} via {swapper}":["Br\xFCcke zu ",["toChain"]," \xFCber ",["swapper"]],"Failed":"Fehler","Completed":"Abgeschlossen","In progress":"In Bearbeitung","Waiting for bridge transaction":"Warte auf Bridge-Transaktion","Connected":"Verbunden","Disconnect":"Verbindung trennen","Install":"Installieren","Connecting...":"Verbinden...","Connecting":"Verbinden","Disconnected":"Verbindung getrennt","you need to pass a correct state to Wallet.":"Sie m\xFCssen einen korrekten Zustand an Wallet \xFCbergeben.","Balance":"Saldo","Max":"Max.","Token":"Token","Chain":"Kette"}`,
);
var Pt = JSON.parse(
  `{"Bridge Limit Error":"\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u039F\u03C1\u03AF\u03BF\u03C5 \u0393\u03AD\u03C6\u03C5\u03C1\u03B1\u03C2","Minimum required slippage: {minRequiredSlippage}":["\u0395\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03B7 \u03B1\u03C0\u03B1\u03B9\u03C4\u03BF\u03CD\u03BC\u03B5\u03BD\u03B7 \u03BF\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Yours: ",["userSlippage"]],"Select chain types":"\u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5 \u03C4\u03CD\u03C0\u03BF\u03C5\u03C2 \u03B1\u03BB\u03C5\u03C3\u03AF\u03B4\u03B1\u03C2","This wallet supports multiple chains. Select which chain you'd like to connect to.":"\u0391\u03C5\u03C4\u03CC \u03C4\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03AF\u03B6\u03B5\u03B9 \u03C0\u03BF\u03BB\u03BB\u03B1\u03C0\u03BB\u03AD\u03C2 \u03B1\u03BB\u03C5\u03C3\u03AF\u03B4\u03B5\u03C2. \u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5 \u03C3\u03B5 \u03C0\u03BF\u03B9\u03B1 \u03B1\u03BB\u03C5\u03C3\u03AF\u03B4\u03B1 \u03B8\u03B1 \u03B8\u03AD\u03BB\u03B1\u03C4\u03B5 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B8\u03B5\u03AF\u03C4\u03B5.","Something went wrong":"\u039A\u03AC\u03C4\u03B9 \u03C0\u03AE\u03B3\u03B5 \u03C3\u03C4\u03C1\u03B1\u03B2\u03AC","Something went wrong. Please refresh the app.":"\u039A\u03AC\u03C4\u03B9 \u03C0\u03AE\u03B3\u03B5 \u03C3\u03C4\u03C1\u03B1\u03B2\u03AC. \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03B1\u03BD\u03B1\u03BD\u03B5\u03CE\u03C3\u03C4\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE.","No results found":"\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1","Try using different keywords":"\u0394\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BD\u03B1 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B4\u03B9\u03B1\u03C6\u03BF\u03C1\u03B5\u03C4\u03B9\u03BA\u03AD\u03C2 \u03BB\u03AD\u03BE\u03B5\u03B9\u03C2-\u03BA\u03BB\u03B5\u03B9\u03B4\u03B9\u03AC","Select Blockchain":"\u0395\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE Blockchain","All":"\u038C\u03BB\u03B1","More +{count}":["More +",["count"]],"Activate this tab":"\u0395\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u03B1\u03C5\u03C4\u03AE\u03C2 \u03C4\u03B7\u03C2 \u03BA\u03B1\u03C1\u03C4\u03AD\u03BB\u03B1\u03C2","Another tab is open and handles transactions.":"\u039C\u03B9\u03B1 \u03AC\u03BB\u03BB\u03B7 \u03BA\u03B1\u03C1\u03C4\u03AD\u03BB\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B1\u03BD\u03BF\u03B9\u03C7\u03C4\u03AE \u03BA\u03B1\u03B9 \u03C7\u03B5\u03B9\u03C1\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AD\u03C2.","Activate current tab":"\u0395\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u03C4\u03C1\u03AD\u03C7\u03BF\u03C5\u03C3\u03B1\u03C2 \u03BA\u03B1\u03C1\u03C4\u03AD\u03BB\u03B1\u03C2","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"\u0395\u03C0\u03AF \u03C4\u03BF\u03C5 \u03C0\u03B1\u03C1\u03CC\u03BD\u03C4\u03BF\u03C2, \u03BF\u03C1\u03B9\u03C3\u03BC\u03AD\u03BD\u03B5\u03C2 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AD\u03C2 \u03B5\u03BA\u03C4\u03B5\u03BB\u03BF\u03CD\u03BD\u03C4\u03B1\u03B9 \u03BA\u03B1\u03B9 \u03B1\u03BD\u03C4\u03B9\u03BC\u03B5\u03C4\u03C9\u03C0\u03AF\u03B6\u03BF\u03BD\u03C4\u03B1\u03B9 \u03B1\u03C0\u03CC \u03AC\u03BB\u03BB\u03B7 \u03BA\u03B1\u03C1\u03C4\u03AD\u03BB\u03B1 \u03C0\u03B5\u03C1\u03B9\u03B7\u03B3\u03B7\u03C4\u03AE. \u0395\u03AC\u03BD \u03B5\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B1\u03C5\u03C4\u03AE\u03BD \u03C4\u03B7\u03BD \u03BA\u03B1\u03C1\u03C4\u03AD\u03BB\u03B1, \u03CC\u03BB\u03B5\u03C2 \u03BF\u03B9 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AD\u03C2 \u03C0\u03BF\u03C5 \u03B2\u03C1\u03AF\u03C3\u03BA\u03BF\u03BD\u03C4\u03B1\u03B9 \u03AE\u03B4\u03B7 \u03C3\u03C4\u03BF \u03B2\u03AE\u03BC\u03B1 \u03C4\u03BF\u03C5 \u03C3\u03AE\u03BC\u03B1\u03C4\u03BF\u03C2 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2 \u03B8\u03B1 \u03BB\u03AE\u03BE\u03BF\u03C5\u03BD.","Confirm":"\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7","Your {blockchainName} wallets":["\u03A4\u03B1 ",["blockchainName"]," \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9\u03B1 \u03C3\u03B1\u03C2"],"Insufficient account balance":"\u0391\u03BD\u03B5\u03C0\u03B1\u03C1\u03BA\u03AD\u03C2 \u03C5\u03C0\u03CC\u03BB\u03BF\u03B9\u03C0\u03BF \u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03BF\u03CD","Proceed anyway":"\u03A3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03C4\u03B5 \u03BF\u03CD\u03C4\u03C9\u03C2 \u03AE \u03AC\u03BB\u03BB\u03C9\u03C2","You need to connect a {blockchainName} wallet.":["\u03A0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B4\u03AD\u03C3\u03B5\u03C4\u03B5 \u03AD\u03BD\u03B1 ",["blockchainName"]," \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9."],"Send to a different address":"\u0391\u03C0\u03BF\u03C3\u03C4\u03BF\u03BB\u03AE \u03C3\u03B5 \u03B4\u03B9\u03B1\u03C6\u03BF\u03C1\u03B5\u03C4\u03B9\u03BA\u03AE \u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7","Your destination address":"\u0394\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 \u03C0\u03C1\u03BF\u03BF\u03C1\u03B9\u03C3\u03BC\u03BF\u03CD \u03C3\u03B1\u03C2","Address {destination} doesn't match the blockchain address pattern.":["\u0394\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 ",["destination"]," \u03B4\u03B5\u03BD \u03C4\u03B1\u03B9\u03C1\u03B9\u03AC\u03B6\u03B5\u03B9 \u03BC\u03B5 \u03C4\u03BF \u03BC\u03BF\u03C4\u03AF\u03B2\u03BF \u03B4\u03B9\u03B5\u03C5\u03B8\u03CD\u03BD\u03C3\u03B5\u03C9\u03BD blockchain."],"Add {chain} chain":["\u03A0\u03C1\u03BF\u03C3\u03B8\u03AE\u03BA\u03B7 ",["chain"]," \u03B1\u03BB\u03C5\u03C3\u03AF\u03B4\u03B1\u03C2"],"Add {blockchainDisplayName} Chain":["Add ",["blockchainDisplayName"]," Chain"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["\u0398\u03B1 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B4\u03AD\u03C3\u03B5\u03C4\u03B5 \u03AD\u03BD\u03B1 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 ",["blockchainDisplayName"]," \u03AE \u03BD\u03B1 \u03B5\u03C0\u03B9\u03BB\u03AD\u03BE\u03B5\u03C4\u03B5 \u03BC\u03B9\u03B1 \u03B4\u03B9\u03B1\u03C6\u03BF\u03C1\u03B5\u03C4\u03B9\u03BA\u03AE \u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 ",["blockchainDisplayName"]],"{blockchainDisplayName} Chain Added":["\u03A0\u03C1\u03BF\u03C3\u03C4\u03AD\u03B8\u03B7\u03BA\u03B5 ",["blockchainDisplayName"]," \u0391\u03BB\u03C5\u03C3\u03AF\u03B4\u03B1"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":["\u03A4\u03BF ",["blockchainDisplayName"]," \u03C0\u03C1\u03BF\u03C3\u03C4\u03AF\u03B8\u03B5\u03C4\u03B1\u03B9 \u03C3\u03C4\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C3\u03B1\u03C2, \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03C4\u03BF \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03B1\u03BD\u03C4\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE."],"Request Rejected":"\u0391\u03AF\u03C4\u03B7\u03C3\u03B7 \u0391\u03C0\u03BF\u03C1\u03C1\u03AF\u03C6\u03B8\u03B7\u03BA\u03B5","You've rejected adding {blockchainDisplayName} chain to your wallet.":["\u0391\u03C0\u03BF\u03C1\u03C1\u03AF\u03C8\u03B1\u03C4\u03B5 \u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03C3\u03B8\u03AE\u03BA\u03B7 \u03B1\u03BB\u03C5\u03C3\u03AF\u03B4\u03B1\u03C2 ",["blockchainDisplayName"]," \u03C3\u03C4\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C3\u03B1\u03C2."],"Show more wallets":"\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03C9\u03BD \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03BF\u03BB\u03B9\u03CE\u03BD","Cancel":"\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7","Refresh":"\u0391\u03BD\u03B1\u03BD\u03AD\u03C9\u03C3\u03B7","Notifications":"\u0395\u03B9\u03B4\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03B9\u03C2","Settings":"\u03A1\u03C5\u03B8\u03BC\u03AF\u03C3\u03B5\u03B9\u03C2","Transactions History":"\u0399\u03C3\u03C4\u03BF\u03C1\u03B9\u03BA\u03CC \u03A3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03CE\u03BD","Connect Wallet":"\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7 \u03A0\u03BF\u03C1\u03C4\u03BF\u03C6\u03BF\u03BB\u03B9\u03BF\u03CD","Today":"\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1","Swaps steps":"\u0392\u03AE\u03BC\u03B1\u03C4\u03B1 swaps","Retry":"\u0395\u03C0\u03B1\u03BD\u03AC\u03BB\u03B7\u03C8\u03B7","Reset":"Reset","There are no notifications.":"\u0394\u03B5\u03BD \u03C5\u03C0\u03AC\u03C1\u03C7\u03BF\u03C5\u03BD \u03B5\u03B9\u03B4\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03B9\u03C2.","Slippage Error":"\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u039F\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7\u03C2","Slippage Warning":"\u03A0\u03C1\u03BF\u03B5\u03B9\u03B4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u039F\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7\u03C2","Yours: {amount} {symbol}":["Yours: ",["amount"]," ",["symbol"]],"See All Routes":"\u0394\u03B5\u03AF\u03C4\u03B5 \u038C\u03BB\u03B5\u03C2 \u03A4\u03B9\u03C2 \u0394\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AD\u03C2","View more info":"\u0394\u03B5\u03AF\u03C4\u03B5 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03B5\u03C2 \u03C0\u03BB\u03B7\u03C1\u03BF\u03C6\u03BF\u03C1\u03AF\u03B5\u03C2","Gas & Fee Explanation":"\u0395\u03BE\u03AE\u03B3\u03B7\u03C3\u03B7 \u0391\u03B5\u03C1\u03AF\u03BF\u03C5 & \u03A7\u03C1\u03AD\u03BF\u03C5\u03C2","Details":"\u039B\u03B5\u03C0\u03C4\u03BF\u03BC\u03AD\u03C1\u03B5\u03B9\u03B5\u03C2","Total Payable Fee":"\u03A3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03AE \u03A0\u03BB\u03B7\u03C1\u03C9\u03C4\u03AD\u03B1 \u03A7\u03C1\u03AD\u03C9\u03C3\u03B7","Hide non-payable fees":"\u0391\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B7 \u03BC\u03B7 \u03C0\u03BB\u03B7\u03C1\u03C9\u03C4\u03AD\u03C9\u03BD \u03C4\u03B5\u03BB\u03CE\u03BD","Show non-payable fees":"\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03BC\u03B7 \u03C0\u03BB\u03B7\u03C1\u03C9\u03C4\u03AD\u03C9\u03BD \u03C4\u03B5\u03BB\u03CE\u03BD","Description":"\u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"\u039F\u03B9 \u03B1\u03BA\u03CC\u03BB\u03BF\u03C5\u03B8\u03B5\u03C2 \u03C7\u03C1\u03B5\u03CE\u03C3\u03B5\u03B9\u03C2 \u03BB\u03B1\u03BC\u03B2\u03AC\u03BD\u03BF\u03BD\u03C4\u03B1\u03B9 \u03C5\u03C0\u03CC\u03C8\u03B7 \u03C3\u03C4\u03B7\u03BD \u03C0\u03B1\u03C1\u03B1\u03B3\u03C9\u03B3\u03AE \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2 \u03BA\u03B1\u03B9\\n                \u03B4\u03B5\u03BD \u03B8\u03B1 \u03C7\u03C1\u03B5\u03B9\u03B1\u03C3\u03C4\u03B5\u03AF \u03BD\u03B1 \u03C0\u03BB\u03B7\u03C1\u03CE\u03C3\u03B5\u03C4\u03B5 \u03B5\u03C0\u03B9\u03C0\u03BB\u03AD\u03BF\u03BD \u03C6\u03C5\u03C3\u03B9\u03BA\u03CC \u03B1\u03AD\u03C1\u03B9\u03BF \u03B3\u03B9\u03B1 \u03B1\u03C5\u03C4\u03BF\u03CD\u03C2.","Swap input":"Swap input","Estimated output":"\u0395\u03BA\u03C4\u03B9\u03BC\u03CE\u03BC\u03B5\u03BD\u03B7 \u03AD\u03BE\u03BF\u03B4\u03BF\u03C2","Via:":"\u0392\u03B9\u03AD\u03BD\u03BD\u03B7:","Chains:":"\u0391\u03BB\u03C5\u03C3\u03AF\u03B4\u03B5\u03C2:","Sort by":"\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC","Smart Routing":"\u0388\u03BE\u03C5\u03C0\u03BD\u03B7 \u0394\u03C1\u03BF\u03BC\u03BF\u03BB\u03CC\u03B3\u03B7\u03C3\u03B7","Lowest Fee":"\u03A7\u03B1\u03BC\u03B7\u03BB\u03CC\u03C4\u03B5\u03C1\u03B7 \u03A7\u03C1\u03AD\u03C9\u03C3\u03B7","Fastest Transfer":"\u03A4\u03B1\u03C7\u03CD\u03C4\u03B5\u03C1\u03B7 \u039C\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC","Maximum Return":"\u039C\u03AD\u03B3\u03B9\u03C3\u03C4\u03B7 \u0395\u03C0\u03B9\u03C3\u03C4\u03C1\u03BF\u03C6\u03AE","Maximum Output":"\u039C\u03AD\u03B3\u03B9\u03C3\u03C4\u03B7 \u0388\u03BE\u03BF\u03B4\u03BF\u03C2","Swapping":"Swapping","Gas cost":"\u039A\u03CC\u03C3\u03C4\u03BF\u03C2 \u03B1\u03B5\u03C1\u03AF\u03BF\u03C5","Receiving":"\u039B\u03AE\u03C8\u03B7","Price impact":"\u0391\u03BD\u03C4\u03AF\u03BA\u03C4\u03C5\u03C0\u03BF\u03C2 \u03C4\u03B9\u03BC\u03AE\u03C2","You need to increase slippage to at least {minRequiredSlippage} for this route.":["You need to increase slippage to at least ",["minRequiredSlippage"]," for this route."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["\u03A3\u03B1\u03C2 \u03C3\u03C5\u03BD\u03B9\u03C3\u03C4\u03BF\u03CD\u03BC\u03B5 \u03BD\u03B1 \u03B1\u03C5\u03BE\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03B7\u03BD \u03BF\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7 \u03C3\u03B5 \u03C4\u03BF\u03C5\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03BF\u03BD ",["minRequiredSlippage"]," \u03B3\u03B9\u03B1 \u03B1\u03C5\u03C4\u03AE \u03C4\u03B7 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE."],"Caution, your slippage is high.":"\u03A0\u03C1\u03BF\u03C3\u03BF\u03C7\u03AE, \u03B7 \u03BF\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7 \u03C3\u03B1\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C5\u03C8\u03B7\u03BB\u03AE.","Change":"\u0391\u03BB\u03BB\u03B1\u03B3\u03AE","Change settings":"\u0391\u03BB\u03BB\u03B1\u03B3\u03AE \u03C1\u03C5\u03B8\u03BC\u03AF\u03C3\u03B5\u03C9\u03BD","High slippage":"\u03A5\u03C8\u03B7\u03BB\u03AE \u03BF\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7","Low slippage":"\u03A7\u03B1\u03BC\u03B7\u03BB\u03AE \u03BF\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Caution, your slippage is high (=",["userSlippage"],"). Your trade may be front run."],"Confirm anyway":"\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7 \u03BF\u03CD\u03C4\u03C9\u03C2 \u03AE \u03AC\u03BB\u03BB\u03C9\u03C2","Slippage tolerance per swap":"\u0391\u03BD\u03BF\u03C7\u03AE \u03BF\u03BB\u03AF\u03C3\u03B8\u03B7\u03C3\u03B7\u03C2 \u03B1\u03BD\u03AC \u03B1\u03BD\u03C4\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE","Custom":"\u03A0\u03C1\u03BF\u03C3\u03B1\u03C1\u03BC\u03BF\u03C3\u03BC\u03AD\u03BD\u03BF","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"\u0397 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03C3\u03B1\u03C2 \u03B8\u03B1 \u03B5\u03C0\u03B1\u03BD\u03AD\u03BB\u03B8\u03B5\u03B9 \u03B1\u03BD \u03B7 \u03C4\u03B9\u03BC\u03AE \u03B1\u03BB\u03BB\u03AC\u03BE\u03B5\u03B9 \u03B4\u03C5\u03C3\u03BC\u03B5\u03BD\u03CE\u03C2 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03BF \u03B1\u03C0\u03CC \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03C0\u03BF\u03C3\u03BF\u03C3\u03C4\u03CC","Warning":"\u03A0\u03C1\u03BF\u03B5\u03B9\u03B4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"\u0391\u03C5\u03C4\u03AE \u03B7 \u03C1\u03CD\u03B8\u03BC\u03B9\u03C3\u03B7 \u03B5\u03C6\u03B1\u03C1\u03BC\u03CC\u03B6\u03B5\u03C4\u03B1\u03B9 \u03B1\u03BD\u03AC \u03B2\u03AE\u03BC\u03B1 (\u03C0.\u03C7. 1Inch, Thorchain, \u03BA\u03BB\u03C0) \u03C0\u03BF\u03C5 \u03C3\u03B7\u03BC\u03B1\u03AF\u03BD\u03B5\u03B9 \u03CC\u03C4\u03B9 \u03B8\u03B1 \u03B5\u03C0\u03B1\u03BD\u03AD\u03BB\u03B8\u03B5\u03B9 \u03BC\u03CC\u03BD\u03BF \u03C4\u03BF \u03B2\u03AE\u03BC\u03B1, \u03CC\u03C7\u03B9 \u03BF\u03BB\u03CC\u03BA\u03BB\u03B7\u03C1\u03B7 \u03B7 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE.","Swap and Bridge":"\u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03BA\u03B1\u03B9 \u03B3\u03AD\u03C6\u03C5\u03C1\u03B1","Request ID":"\u0391\u03BD\u03B1\u03B3\u03BD\u03C9\u03C1\u03B9\u03C3\u03C4\u03B9\u03BA\u03CC \u0391\u03AF\u03C4\u03B7\u03C3\u03B7\u03C2","Not found":"\u0394\u03B5 \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5","Swap with request ID = {requestId} not found.":["Swap with request ID = ",["requestId"]," not found."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["\u0388\u03C7\u03B5\u03C4\u03B5 \u03BB\u03AC\u03B2\u03B5\u03B9 ",["amount"]," ",["token"]," \u03C3\u03C4\u03BF ",["conciseAddress"]," \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C3\u03C4\u03BF ",["chain"]," chain."],"Transaction was not sent.":"\u0397 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03B4\u03B5\u03BD \u03C3\u03C4\u03AC\u03BB\u03B8\u03B7\u03BA\u03B5.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," \u03C3\u03C4\u03BF ",["blockchain"]," \u03C0\u03B1\u03C1\u03B1\u03BC\u03AD\u03BD\u03BF\u03C5\u03BD \u03C3\u03C4\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C3\u03B1\u03C2"],"Delete":"\u0394\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE","Try again":"\u03A0\u03C1\u03BF\u03C3\u03C0\u03B1\u03B8\u03AE\u03C3\u03C4\u03B5 \u03BE\u03B1\u03BD\u03AC","View transaction":"\u03A0\u03C1\u03BF\u03B2\u03BF\u03BB\u03AE \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2","Connect":"\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7","Swap Successful":"Swap \u0395\u03C0\u03B9\u03C4\u03C5\u03C7\u03AE\u03C2","Transaction Failed":"\u0397 \u03A3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u0391\u03C0\u03AD\u03C4\u03C5\u03C7\u03B5","Done":"\u039F\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5","Diagnosis":"\u0394\u03B9\u03AC\u03B3\u03BD\u03C9\u03C3\u03B7","See Details":"\u0394\u03B5\u03AF\u03C4\u03B5 \u039B\u03B5\u03C0\u03C4\u03BF\u03BC\u03AD\u03C1\u03B5\u03B9\u03B5\u03C2","Cancel Swap":"\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7 \u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2","Are you sure you want to cancel this swap?":"\u0395\u03AF\u03C3\u03C4\u03B5 \u03B2\u03AD\u03B2\u03B1\u03B9\u03BF\u03B9 \u03CC\u03C4\u03B9 \u03B8\u03AD\u03BB\u03B5\u03C4\u03B5 \u03BD\u03B1 \u03B1\u03BA\u03C5\u03C1\u03CE\u03C3\u03B5\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF swap?","Yes, Cancel it":"\u039D\u03B1\u03B9, \u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7","No, Continue":"\u038C\u03C7\u03B9, \u03A3\u03C5\u03BD\u03AD\u03C7\u03B5\u03B9\u03B1","Delete Transaction":"\u0394\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE \u03A3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2","Are you sure you want to delete this swap?":"\u0395\u03AF\u03C3\u03C4\u03B5 \u03B2\u03AD\u03B2\u03B1\u03B9\u03BF\u03B9 \u03CC\u03C4\u03B9 \u03B8\u03AD\u03BB\u03B5\u03C4\u03B5 \u03BD\u03B1 \u03B4\u03B9\u03B1\u03B3\u03C1\u03AC\u03C8\u03B5\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF swap?","Yes, Delete it":"\u039D\u03B1\u03B9, \u03BD\u03B1 \u03B4\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03BF\u03CD\u03BD","No, Cancel":"\u038C\u03C7\u03B9, \u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7","Change Network":"\u0391\u03BB\u03BB\u03B1\u03B3\u03AE \u0394\u03B9\u03BA\u03C4\u03CD\u03BF\u03C5","Network Changed":"\u03A4\u03BF \u0394\u03AF\u03BA\u03C4\u03C5\u03BF \u0386\u03BB\u03BB\u03B1\u03BE\u03B5","Select Token":"\u0395\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u0394\u03B9\u03B1\u03BA\u03C1\u03B9\u03C4\u03B9\u03BA\u03BF\u03CD","Wallet Connected":"\u03A3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF \u03A0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9","Your wallet is connected, you can use it to swap.":"\u03A4\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C3\u03B1\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF, \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03C4\u03BF \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03B1\u03BD\u03C4\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE.","Failed to Connect":"\u0391\u03C0\u03BF\u03C4\u03C5\u03C7\u03AF\u03B1 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7\u03C2","Your wallet is not connected. Please try again.":"\u03A4\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C3\u03B1\u03C2 \u03B4\u03B5\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF. \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03B4\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BE\u03B1\u03BD\u03AC.","Connecting to your wallet":"\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7 \u03C3\u03C4\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03C3\u03B1\u03C2","Click connect in your wallet popup.":"\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03C3\u03C4\u03B7 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7 \u03C3\u03C4\u03BF \u03B1\u03BD\u03B1\u03B4\u03C5\u03CC\u03BC\u03B5\u03BD\u03BF \u03C0\u03B1\u03C1\u03AC\u03B8\u03C5\u03C1\u03BF \u03C4\u03BF\u03C5 \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03BF\u03BB\u03B9\u03BF\u03CD.","Failed Network, Please retry your swap.":"\u0391\u03C0\u03BF\u03C4\u03C5\u03C7\u03AF\u03B1 \u03B4\u03B9\u03BA\u03C4\u03CD\u03BF\u03C5, \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03B4\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BE\u03B1\u03BD\u03AC \u03C4\u03BF swap.","Please reset your liquidity sources.":"\u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03AD\u03C1\u03B5\u03C4\u03B5 \u03C4\u03B9\u03C2 \u03C0\u03B7\u03B3\u03AD\u03C2 \u03C1\u03B5\u03C5\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"\u0388\u03C7\u03B5\u03C4\u03B5 \u03C0\u03B5\u03C1\u03B9\u03BF\u03C1\u03AF\u03C3\u03B5\u03B9 \u03C4\u03B9\u03C2 \u03C0\u03B7\u03B3\u03AD\u03C2 \u03C1\u03B5\u03C5\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2 \u03BA\u03B1\u03B9 \u03B1\u03C5\u03C4\u03CC \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03BF\u03B4\u03B7\u03B3\u03AE\u03C3\u03B5\u03B9 \u03C3\u03B5 Rango \u03B5\u03CD\u03C1\u03B5\u03C3\u03B7 \u03BA\u03B1\u03BC\u03AF\u03B1 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE. \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03C3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03AD\u03C1\u03B5\u03C4\u03B5 \u03C4\u03B9\u03C2 \u03C0\u03B7\u03B3\u03AD\u03C2 \u03C1\u03B5\u03C5\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2.","No Routes Found.":"\u0394\u03B5\u03BD \u0392\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u0394\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AD\u03C2.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"\u039B\u03CC\u03B3\u03BF\u03B9 \u03B3\u03B9\u03B1 \u03C4\u03BF\u03C5\u03C2 \u03BF\u03C0\u03BF\u03AF\u03BF\u03C5\u03C2 \u03C4\u03BF Rango \u03B4\u03B5\u03BD \u03BC\u03C0\u03CC\u03C1\u03B5\u03C3\u03B5 \u03BD\u03B1 \u03B2\u03C1\u03B5\u03B9 \u03BC\u03B9\u03B1 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE: \u03C7\u03B1\u03BC\u03B7\u03BB\u03AE \u03C1\u03B5\u03C5\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1 \u03C3\u03C4\u03BF token, \u03C0\u03BF\u03BB\u03CD \u03C7\u03B1\u03BC\u03B7\u03BB\u03CC \u03C0\u03BF\u03C3\u03CC \u03B5\u03B9\u03C3\u03B1\u03B3\u03C9\u03B3\u03AE\u03C2 \u03AE \u03BA\u03B1\u03BC\u03AF\u03B1 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B7 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE \u03B3\u03B9\u03B1 \u03C4\u03BF\u03BD \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03BF \u03C3\u03C5\u03BD\u03B4\u03C5\u03B1\u03C3\u03BC\u03CC \u03B5\u03B9\u03C3\u03CC\u03B4\u03BF\u03C5/\u03B5\u03BE\u03CC\u03B4\u03BF\u03C5 token.","Bridge Limit Error: Please increase your amount.":"\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BF\u03C1\u03AF\u03BF\u03C5 \u03B3\u03AD\u03C6\u03C5\u03C1\u03B1\u03C2: \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03B1\u03C5\u03BE\u03AE\u03C3\u03C4\u03B5 \u03C4\u03BF \u03C0\u03BF\u03C3\u03CC \u03C3\u03B1\u03C2.","Bridge Limit Error: Please decrease your amount.":"\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BF\u03C1\u03AF\u03BF\u03C5 \u03B3\u03AD\u03C6\u03C5\u03C1\u03B1\u03C2: \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03BC\u03B5\u03B9\u03CE\u03C3\u03C4\u03B5 \u03C4\u03BF \u03C0\u03BF\u03C3\u03CC \u03C3\u03B1\u03C2.","High Price Impact":"\u0395\u03C0\u03B9\u03C0\u03C4\u03CE\u03C3\u03B5\u03B9\u03C2 \u03A5\u03C8\u03B7\u03BB\u03AE\u03C2 \u03A4\u03B9\u03BC\u03AE\u03C2","Price impact is too high!":"\u039F \u03B1\u03BD\u03C4\u03AF\u03BA\u03C4\u03C5\u03C0\u03BF\u03C2 \u03C3\u03C4\u03B7\u03BD \u03C4\u03B9\u03BC\u03AE \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03C5\u03C8\u03B7\u03BB\u03CC\u03C2!","The price impact is significantly higher than the allowed amount.":"\u039F \u03B1\u03BD\u03C4\u03AF\u03BA\u03C4\u03C5\u03C0\u03BF\u03C2 \u03C3\u03C4\u03B7\u03BD \u03C4\u03B9\u03BC\u03AE \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C3\u03B7\u03BC\u03B1\u03BD\u03C4\u03B9\u03BA\u03AC \u03C5\u03C8\u03B7\u03BB\u03CC\u03C4\u03B5\u03C1\u03BF\u03C2 \u03B1\u03C0\u03CC \u03C4\u03BF \u03B5\u03C0\u03B9\u03C4\u03C1\u03B5\u03C0\u03CC\u03BC\u03B5\u03BD\u03BF \u03C0\u03BF\u03C3\u03CC.","Confirm high price impact":"\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03B9\u03CE\u03C3\u03C4\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C0\u03AF\u03B4\u03C1\u03B1\u03C3\u03B7 \u03C5\u03C8\u03B7\u03BB\u03AE\u03C2 \u03C4\u03B9\u03BC\u03AE\u03C2","Route updated and price impact is too high, try again later!":"\u0397 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE \u03B5\u03BD\u03B7\u03BC\u03B5\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5 \u03BA\u03B1\u03B9 \u03BF \u03B1\u03BD\u03C4\u03AF\u03BA\u03C4\u03C5\u03C0\u03BF\u03C2 \u03C4\u03C9\u03BD \u03C4\u03B9\u03BC\u03CE\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03C5\u03C8\u03B7\u03BB\u03CC\u03C2, \u03B4\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BE\u03B1\u03BD\u03AC \u03B1\u03C1\u03B3\u03CC\u03C4\u03B5\u03C1\u03B1!","USD Price Unknown":"\u03A4\u03B9\u03BC\u03AE USD \u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03B7","USD Price Unknown, Cannot calculate Price Impact.":"\u03A4\u03B9\u03BC\u03AE USD \u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF, \u03B4\u03B5\u03BD \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03AF\u03C3\u03B5\u03B9 \u03C4\u03B7\u03BD \u03B5\u03C0\u03AF\u03C0\u03C4\u03C9\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03C4\u03B9\u03BC\u03AE\u03C2.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"\u03A4\u03B9\u03BC\u03AE USD \u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF, \u03B4\u03B5\u03BD \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03AF\u03C3\u03B5\u03B9 \u03C4\u03B7\u03BD \u03B5\u03C0\u03AF\u03C0\u03C4\u03C9\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03C4\u03B9\u03BC\u03AE\u03C2. \u039F \u03B1\u03BD\u03C4\u03AF\u03BA\u03C4\u03C5\u03C0\u03BF\u03C2 \u03C4\u03B7\u03C2 \u03C4\u03B9\u03BC\u03AE\u03C2 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C5\u03C8\u03B7\u03BB\u03CC\u03C4\u03B5\u03C1\u03B7 \u03B1\u03C0\u03CC \u03C4\u03BF \u03C3\u03C5\u03BD\u03B7\u03B8\u03B9\u03C3\u03BC\u03AD\u03BD\u03BF. \u0395\u03AF\u03C3\u03C4\u03B5 \u03B2\u03AD\u03B2\u03B1\u03B9\u03BF\u03B9 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03B5\u03C4\u03B5 \u03C4\u03B7\u03BD Swap?","Confirm USD Price Unknown":"\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7 \u03A4\u03B9\u03BC\u03AE\u03C2 Usd \u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF","Swap":"\u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE","Swap anyway":"\u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03BF\u03CD\u03C4\u03C9\u03C2 \u03AE \u03AC\u03BB\u03BB\u03C9\u03C2","The route goes through Ethereum. Continue?":"\u0397 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE \u03C0\u03B5\u03C1\u03BD\u03AC\u03B5\u03B9 \u03B1\u03C0\u03CC \u03C4\u03BF Ethereum. \u03A3\u03C5\u03BD\u03AD\u03C7\u03B5\u03B9\u03B1?","Network Fee":"\u03A4\u03AD\u03BB\u03BF\u03C2 \u0394\u03B9\u03BA\u03C4\u03CD\u03BF\u03C5","Protocol Fee":"\u03A4\u03AD\u03BB\u03BF\u03C2 \u03A0\u03C1\u03C9\u03C4\u03BF\u03BA\u03CC\u03BB\u03BB\u03BF\u03C5","Affiliate Fee":"\u03A7\u03C1\u03AD\u03C9\u03C3\u03B7 \u03A3\u03C5\u03BD\u03B5\u03C1\u03B3\u03AC\u03C4\u03B7","Outbound Fee":"\u0395\u03BE\u03B5\u03C1\u03C7\u03CC\u03BC\u03B5\u03BD\u03B7 \u03A7\u03C1\u03AD\u03C9\u03C3\u03B7","Rango Fee":"\u03A7\u03C1\u03AD\u03C9\u03C3\u03B7 Rango","Route has been updated.":"\u0397 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE \u03AD\u03C7\u03B5\u03B9 \u03B5\u03BD\u03B7\u03BC\u03B5\u03C1\u03C9\u03B8\u03B5\u03AF.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Output amount changed to ",["newOutputAmount"]," (",["percentageChange"],"% change)."],"Route swappers has been updated.":"\u03A4\u03B1 swappers \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03CE\u03BD \u03AD\u03C7\u03BF\u03C5\u03BD \u03B5\u03BD\u03B7\u03BC\u03B5\u03C1\u03C9\u03B8\u03B5\u03AF.","Route internal coins has been updated.":"\u03A4\u03B1 \u03B5\u03C3\u03C9\u03C4\u03B5\u03C1\u03B9\u03BA\u03AC \u03BD\u03BF\u03BC\u03AF\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B4\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AE\u03C2 \u03AD\u03C7\u03BF\u03C5\u03BD \u03B5\u03BD\u03B7\u03BC\u03B5\u03C1\u03C9\u03B8\u03B5\u03AF.","Routes":"\u0394\u03B9\u03B1\u03B4\u03C1\u03BF\u03BC\u03AD\u03C2","From":"\u0391\u03C0\u03CC","To":"\u03A0\u03C1\u03BF\u03C2","Light":"\u03A6\u03C9\u03C4\u03B5\u03B9\u03BD\u03CC","Dark":"\u03A3\u03BA\u03BF\u03C4\u03B5\u03B9\u03BD\u03CC","Auto":"\u0391\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03BF","Loading failed":"\u0391\u03C0\u03BF\u03C4\u03C5\u03C7\u03AF\u03B1 \u03C6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7\u03C2","Bridges":"\u0393\u03AD\u03C6\u03C5\u03C1\u03B5\u03C2","Exchanges":"\u0391\u03BD\u03C4\u03B1\u03BB\u03BB\u03B1\u03B3\u03AD\u03C2","Language":"\u0393\u03BB\u03CE\u03C3\u03C3\u03B1","Infinite approval":"\u0386\u03C0\u03B5\u03B9\u03C1\u03B7 \u03AD\u03B3\u03BA\u03C1\u03B9\u03C3\u03B7","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"\u0397 \u03B5\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03BB\u03B5\u03B9\u03C4\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1\u03C2 '\u0386\u03C0\u03B5\u03B9\u03C1\u03B7 \u03AD\u03B3\u03BA\u03C1\u03B9\u03C3\u03B7' \u03C0\u03B1\u03C1\u03AD\u03C7\u03B5\u03B9 \u03B1\u03C0\u03B5\u03C1\u03B9\u03CC\u03C1\u03B9\u03C3\u03C4\u03B7 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7 \u03C3\u03B5 \u03AD\u03BE\u03C5\u03C0\u03BD\u03B5\u03C2 \u03C3\u03C5\u03BC\u03B2\u03AC\u03C3\u03B5\u03B9\u03C2 DEXes/Bridges, \u03B5\u03C0\u03B9\u03C4\u03C1\u03AD\u03C0\u03BF\u03BD\u03C4\u03AC\u03C2 \u03C4\u03BF\u03C5\u03C2 \u03BD\u03B1 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03BF\u03C5\u03BD \u03C4\u03BF \u03B5\u03B3\u03BA\u03B5\u03BA\u03C1\u03B9\u03BC\u03AD\u03BD\u03BF \u03C0\u03BF\u03C3\u03CC token \u03C7\u03C9\u03C1\u03AF\u03C2 \u03C0\u03B5\u03C1\u03B9\u03BF\u03C1\u03B9\u03C3\u03BC\u03BF\u03CD\u03C2.","Theme":"\u0398\u03AD\u03BC\u03B1","Confirm Swap":"\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7 \u0391\u03BD\u03C4\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2","Start Swap":"\u0388\u03BD\u03B1\u03C1\u03BE\u03B7 \u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2","You get":"\u03A0\u03B1\u03AF\u03C1\u03BD\u03B5\u03C4\u03B5","History":"\u0399\u03C3\u03C4\u03BF\u03C1\u03B9\u03BA\u03CC","Search Transaction":"\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03A3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2","language":"\u03B3\u03BB\u03CE\u03C3\u03C3\u03B1","Deselect all":"\u0391\u03C0\u03BF\u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03CC\u03BB\u03C9\u03BD","Select all":"\u0395\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03CC\u03BB\u03C9\u03BD","Search {sourceType}":["Search ",["sourceType"]],"Search Blockchain":"\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 Blockchain","Source":"\u03A0\u03B7\u03B3\u03AE","Destination":"\u03A0\u03C1\u03BF\u03BF\u03C1\u03B9\u03C3\u03BC\u03CC\u03C2","Swap {type}":["Swap ",["type"]],"Search Token":"\u0394\u03B9\u03B1\u03BA\u03C1\u03B9\u03C4\u03B9\u03BA\u03CC \u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7\u03C2","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"\u0395\u03C0\u03AF \u03C4\u03BF\u03C5 \u03C0\u03B1\u03C1\u03CC\u03BD\u03C4\u03BF\u03C2, \u03B5\u03AF\u03C3\u03C4\u03B5 \u03C3\u03B5 \u03BB\u03B5\u03B9\u03C4\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1 \u03BA\u03B1\u03BC\u03C0\u03AC\u03BD\u03B9\u03B1\u03C2 \u03BC\u03B5 \u03C0\u03B5\u03C1\u03B9\u03BF\u03C1\u03B9\u03C3\u03BC\u03BF\u03CD\u03C2 \u03C3\u03C4\u03B9\u03C2 \u03C0\u03B7\u03B3\u03AD\u03C2 \u03C1\u03B5\u03C5\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2. \u0398\u03B1 \u03B8\u03AD\u03BB\u03B1\u03C4\u03B5 \u03BD\u03B1 \u03B2\u03B3\u03B5\u03AF\u03C4\u03B5 \u03B1\u03C0\u03CC \u03B1\u03C5\u03C4\u03AE \u03C4\u03B7 \u03BB\u03B5\u03B9\u03C4\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1 \u03BA\u03B1\u03B9 \u03BD\u03B1 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03CC\u03BB\u03B5\u03C2 \u03C4\u03B9\u03C2 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B5\u03C2 \u03C0\u03B7\u03B3\u03AD\u03C2 \u03C1\u03B5\u03C5\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2?","The request ID is necessary to display the swap details.":"\u03A4\u03BF \u03B1\u03BD\u03B1\u03B3\u03BD\u03C9\u03C1\u03B9\u03C3\u03C4\u03B9\u03BA\u03CC \u03B1\u03B9\u03C4\u03AE\u03BC\u03B1\u03C4\u03BF\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B1\u03C0\u03B1\u03C1\u03B1\u03AF\u03C4\u03B7\u03C4\u03BF \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03B5\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03C4\u03C9\u03BD \u03BB\u03B5\u03C0\u03C4\u03BF\u03BC\u03B5\u03C1\u03B5\u03B9\u03CE\u03BD \u03B1\u03BD\u03C4\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2.","Connect Wallets":"\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7 \u03A0\u03BF\u03C1\u03C4\u03BF\u03C6\u03BF\u03BB\u03B9\u03CE\u03BD","Choose a wallet to connect.":"\u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5 \u03AD\u03BD\u03B1 \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03B3\u03B9\u03B1 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7.","This week":"\u0391\u03C5\u03C4\u03AE \u03C4\u03B7\u03BD \u03B5\u03B2\u03B4\u03BF\u03BC\u03AC\u03B4\u03B1","This month":"\u0391\u03C5\u03C4\u03CC \u03C4\u03BF \u03BC\u03AE\u03BD\u03B1","This year":"\u0391\u03C5\u03C4\u03CC \u03C4\u03BF \u03AD\u03C4\u03BF\u03C2","Required: >= {min} {symbol}":["Required: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Required: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["\u0391\u03C0\u03B1\u03B9\u03C4\u03B5\u03AF\u03C4\u03B1\u03B9: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["\u0391\u03C0\u03B1\u03B9\u03C4\u03B5\u03AF\u03C4\u03B1\u03B9: < ",["max"]," ",["symbol"]]," for network fee":" \u03B3\u03B9\u03B1 \u03C4\u03AD\u03BB\u03B7 \u03B4\u03B9\u03BA\u03C4\u03CD\u03BF\u03C5"," for swap":" \u03B3\u03B9\u03B1 \u03B1\u03BD\u03C4\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE"," for input and network fee":" \u03B3\u03B9\u03B1 \u03B5\u03B9\u03C3\u03C1\u03BF\u03AE \u03BA\u03B1\u03B9 \u03C4\u03AD\u03BB\u03B7 \u03B4\u03B9\u03BA\u03C4\u03CD\u03BF\u03C5","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Needs \u2248 ",["requiredAmount"]," ",["symbol"],["reason"],", but you have ",["currentAmount"]," ",["symbol"]," in your ",["blockchain"]," wallet."],"Waiting for connecting wallet":"\u0391\u03BD\u03B1\u03BC\u03BF\u03BD\u03AE \u03B3\u03B9\u03B1 \u03C3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9","Waiting for other running tasks to be finished":"\u0391\u03BD\u03B1\u03BC\u03BF\u03BD\u03AE \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03C9\u03B8\u03BF\u03CD\u03BD \u03AC\u03BB\u03BB\u03B5\u03C2 \u03B5\u03BA\u03C4\u03B5\u03BB\u03BF\u03CD\u03BC\u03B5\u03BD\u03B5\u03C2 \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B5\u03C2","Waiting for changing wallet network":"\u0391\u03BD\u03B1\u03BC\u03BF\u03BD\u03AE \u03B3\u03B9\u03B1 \u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03B4\u03B9\u03BA\u03C4\u03CD\u03BF\u03C5 \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03BF\u03BB\u03B9\u03BF\u03CD","Sunday":"\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE","Monday":"\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1","Tuesday":"\u03A4\u03C1\u03AF\u03C4\u03B7","Wednesday":"\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7","Thursday":"\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7","Friday":"\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE","Saturday":"\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF","Powered By":"\u03A4\u03C1\u03BF\u03C6\u03BF\u03B4\u03BF\u03C4\u03B5\u03AF\u03C4\u03B1\u03B9 \u0391\u03C0\u03CC","Aggregated Transaction":"\u03A3\u03C5\u03B3\u03BA\u03B5\u03BD\u03C4\u03C1\u03C9\u03C4\u03B9\u03BA\u03AE \u03A3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["\u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03C3\u03C4\u03BF ",["fromChain"]," \u03BC\u03AD\u03C3\u03C9 ",["swapper"]],"Bridge to {toChain} via {swapper}":["Bridge to ",["toChain"]," via ",["swapper"]],"Failed":"\u0391\u03C0\u03AD\u03C4\u03C5\u03C7\u03B5","Completed":"\u039F\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5","In progress":"\u03A3\u03B5 \u03B5\u03BE\u03AD\u03BB\u03B9\u03BE\u03B7","Waiting for bridge transaction":"\u0391\u03BD\u03B1\u03BC\u03BF\u03BD\u03AE \u03B3\u03B9\u03B1 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03B3\u03AD\u03C6\u03C5\u03C1\u03B1\u03C2","Connected":"\u03A3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF","Disconnect":"\u0391\u03C0\u03BF\u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7","Install":"\u0395\u03B3\u03BA\u03B1\u03C4\u03AC\u03C3\u03C4\u03B1\u03C3\u03B7","Connecting...":"\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7...","Connecting":"\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7","Disconnected":"\u0391\u03C0\u03BF\u03C3\u03C5\u03BD\u03B4\u03AD\u03B8\u03B7\u03BA\u03B5","you need to pass a correct state to Wallet.":"\u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C0\u03B5\u03C1\u03AC\u03C3\u03B5\u03C4\u03B5 \u03BC\u03B9\u03B1 \u03C3\u03C9\u03C3\u03C4\u03AE \u03BA\u03B1\u03C4\u03AC\u03C3\u03C4\u03B1\u03C3\u03B7 \u03C3\u03C4\u03BF \u03A0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9.","Balance":"\u03A5\u03C0\u03CC\u03BB\u03BF\u03B9\u03C0\u03BF","Max":"\u039C\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF","Token":"\u0394\u03B9\u03B1\u03BA\u03C1\u03B9\u03C4\u03B9\u03BA\u03CC","Chain":"\u0391\u03BB\u03C5\u03C3\u03AF\u03B4\u03B1"}`,
);
var Dt = JSON.parse(
  `{"Bridge Limit Error":"Bridge Limit Error","Minimum required slippage: {minRequiredSlippage}":["Minimum required slippage: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Yours: ",["userSlippage"]],"Select chain types":"Select chain types","This wallet supports multiple chains. Select which chain you'd like to connect to.":"This wallet supports multiple chains. Select which chain you'd like to connect to.","Something went wrong":"Something went wrong","Something went wrong. Please refresh the app.":"Something went wrong. Please refresh the app.","No results found":"No results found","Try using different keywords":"Try using different keywords","Select Blockchain":"Select Blockchain","All":"All","More +{count}":["More +",["count"]],"Activate this tab":"Activate this tab","Another tab is open and handles transactions.":"Another tab is open and handles transactions.","Activate current tab":"Activate current tab","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.","Confirm":"Confirm","Your {blockchainName} wallets":["Your ",["blockchainName"]," wallets"],"Insufficient account balance":"Insufficient account balance","Proceed anyway":"Proceed anyway","You need to connect a {blockchainName} wallet.":["You need to connect a ",["blockchainName"]," wallet."],"Send to a different address":"Send to a different address","Your destination address":"Your destination address","Address {destination} doesn't match the blockchain address pattern.":["Address ",["destination"]," doesn't match the blockchain address pattern."],"Add {chain} chain":["Add ",["chain"]," chain"],"Add {blockchainDisplayName} Chain":["Add ",["blockchainDisplayName"]," Chain"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["You should connect a ",["blockchainDisplayName"]," supported wallet or choose a different ",["blockchainDisplayName"]," address"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," Chain Added"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," is added to your wallet, you can use it to swap."],"Request Rejected":"Request Rejected","You've rejected adding {blockchainDisplayName} chain to your wallet.":["You've rejected adding ",["blockchainDisplayName"]," chain to your wallet."],"Show more wallets":"Show more wallets","Cancel":"Cancel","Refresh":"Refresh","Notifications":"Notifications","Settings":"Settings","Transactions History":"Transactions History","Connect Wallet":"Connect Wallet","Today":"Today","Swaps steps":"Swaps steps","Retry":"Retry","Reset":"Reset","There are no notifications.":"There are no notifications.","Slippage Error":"Slippage Error","Slippage Warning":"Slippage Warning","Yours: {amount} {symbol}":["Yours: ",["amount"]," ",["symbol"]],"See All Routes":"See All Routes","View more info":"View more info","Gas & Fee Explanation":"Gas & Fee Explanation","Details":"Details","Total Payable Fee":"Total Payable Fee","Hide non-payable fees":"Hide non-payable fees","Show non-payable fees":"Show non-payable fees","Description":"Description","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.","Swap input":"Swap input","Estimated output":"Estimated output","Via:":"Via:","Chains:":"Chains:","Sort by":"Sort by","Smart Routing":"Smart Routing","Lowest Fee":"Lowest Fee","Fastest Transfer":"Fastest Transfer","Maximum Return":"Maximum Return","Maximum Output":"Maximum Output","Swapping":"Swapping","Gas cost":"Gas cost","Receiving":"Receiving","Price impact":"Price impact","You need to increase slippage to at least {minRequiredSlippage} for this route.":["You need to increase slippage to at least ",["minRequiredSlippage"]," for this route."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["We recommend you to increase slippage to at least ",["minRequiredSlippage"]," for this route."],"Caution, your slippage is high.":"Caution, your slippage is high.","Change":"Change","Change settings":"Change settings","High slippage":"High slippage","Low slippage":"Low slippage"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Caution, your slippage is high (=",["userSlippage"],"). Your trade may be front run."],"Confirm anyway":"Confirm anyway","Slippage tolerance per swap":"Slippage tolerance per swap","Custom":"Custom","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Your transaction will be reverted if the price changes unfavorably by more than this percentage","Warning":"Warning","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.","Swap and Bridge":"Swap and Bridge","Request ID":"Request ID","Not found":"Not found","Swap with request ID = {requestId} not found.":["Swap with request ID = ",["requestId"]," not found."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["You have received ",["amount"]," ",["token"]," in ",["conciseAddress"]," wallet on ",["chain"]," chain."],"Transaction was not sent.":"Transaction was not sent.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," on ",["blockchain"]," remain in your wallet"],"Delete":"Delete","Try again":"Try again","View transaction":"View transaction","Connect":"Connect","Swap Successful":"Swap Successful","Transaction Failed":"Transaction Failed","Done":"Done","Diagnosis":"Diagnosis","See Details":"See Details","Cancel Swap":"Cancel Swap","Are you sure you want to cancel this swap?":"Are you sure you want to cancel this swap?","Yes, Cancel it":"Yes, Cancel it","No, Continue":"No, Continue","Delete Transaction":"Delete Transaction","Are you sure you want to delete this swap?":"Are you sure you want to delete this swap?","Yes, Delete it":"Yes, Delete it","No, Cancel":"No, Cancel","Change Network":"Change Network","Network Changed":"Network Changed","Select Token":"Select Token","Wallet Connected":"Wallet Connected","Your wallet is connected, you can use it to swap.":"Your wallet is connected, you can use it to swap.","Failed to Connect":"Failed to Connect","Your wallet is not connected. Please try again.":"Your wallet is not connected. Please try again.","Connecting to your wallet":"Connecting to your wallet","Click connect in your wallet popup.":"Click connect in your wallet popup.","Failed Network, Please retry your swap.":"Failed Network, Please retry your swap.","Please reset your liquidity sources.":"Please reset your liquidity sources.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.","No Routes Found.":"No Routes Found.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.","Bridge Limit Error: Please increase your amount.":"Bridge Limit Error: Please increase your amount.","Bridge Limit Error: Please decrease your amount.":"Bridge Limit Error: Please decrease your amount.","High Price Impact":"High Price Impact","Price impact is too high!":"Price impact is too high!","The price impact is significantly higher than the allowed amount.":"The price impact is significantly higher than the allowed amount.","Confirm high price impact":"Confirm high price impact","Route updated and price impact is too high, try again later!":"Route updated and price impact is too high, try again later!","USD Price Unknown":"USD Price Unknown","USD Price Unknown, Cannot calculate Price Impact.":"USD Price Unknown, Cannot calculate Price Impact.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?","Confirm USD Price Unknown":"Confirm USD Price Unknown","Swap":"Swap","Swap anyway":"Swap anyway","The route goes through Ethereum. Continue?":"The route goes through Ethereum. Continue?","Network Fee":"Network Fee","Protocol Fee":"Protocol Fee","Affiliate Fee":"Affiliate Fee","Outbound Fee":"Outbound Fee","Rango Fee":"Rango Fee","Route has been updated.":"Route has been updated.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Output amount changed to ",["newOutputAmount"]," (",["percentageChange"],"% change)."],"Route swappers has been updated.":"Route swappers has been updated.","Route internal coins has been updated.":"Route internal coins has been updated.","Routes":"Routes","From":"From","To":"To","Light":"Light","Dark":"Dark","Auto":"Auto","Loading failed":"Loading failed","Bridges":"Bridges","Exchanges":"Exchanges","Language":"Language","Infinite approval":"Infinite approval","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.","Theme":"Theme","Confirm Swap":"Confirm Swap","Start Swap":"Start Swap","You get":"You get","History":"History","Search Transaction":"Search Transaction","language":"language","Deselect all":"Deselect all","Select all":"Select all","Search {sourceType}":["Search ",["sourceType"]],"Search Blockchain":"Search Blockchain","Source":"Source","Destination":"Destination","Swap {type}":["Swap ",["type"]],"Search Token":"Search Token","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?","The request ID is necessary to display the swap details.":"The request ID is necessary to display the swap details.","Connect Wallets":"Connect Wallets","Choose a wallet to connect.":"Choose a wallet to connect.","This week":"This week","This month":"This month","This year":"This year","Required: >= {min} {symbol}":["Required: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Required: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Required: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Required: < ",["max"]," ",["symbol"]]," for network fee":" for network fee"," for swap":" for swap"," for input and network fee":" for input and network fee","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Needs \u2248 ",["requiredAmount"]," ",["symbol"],["reason"],", but you have ",["currentAmount"]," ",["symbol"]," in your ",["blockchain"]," wallet."],"Waiting for connecting wallet":"Waiting for connecting wallet","Waiting for other running tasks to be finished":"Waiting for other running tasks to be finished","Waiting for changing wallet network":"Waiting for changing wallet network","Sunday":"Sunday","Monday":"Monday","Tuesday":"Tuesday","Wednesday":"Wednesday","Thursday":"Thursday","Friday":"Friday","Saturday":"Saturday","Powered By":"Powered By","Aggregated Transaction":"Aggregated Transaction","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Swap on ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Bridge to ",["toChain"]," via ",["swapper"]],"Failed":"Failed","Completed":"Completed","In progress":"In progress","Waiting for bridge transaction":"Waiting for bridge transaction","Connected":"Connected","Disconnect":"Disconnect","Install":"Install","Connecting...":"Connecting...","Connecting":"Connecting","Disconnected":"Disconnected","you need to pass a correct state to Wallet.":"you need to pass a correct state to Wallet.","Balance":"Balance","Max":"Max","Token":"Token","Chain":"Chain"}`,
);
var zt = JSON.parse(
  `{"Bridge Limit Error":"Error de l\xEDmite del puente","Minimum required slippage: {minRequiredSlippage}":["M\xEDnimo deslizamiento requerido: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Tu: ",["userSlippage"]],"Select chain types":"Seleccionar tipos de cadena","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Esta cartera soporta m\xFAltiples cadenas. Selecciona a qu\xE9 cadena quieres conectar.","Something went wrong":"Algo sali\xF3 mal","Something went wrong. Please refresh the app.":"Algo sali\xF3 mal. Por favor, actualiza la aplicaci\xF3n.","No results found":"No hay resultados","Try using different keywords":"Intenta usar diferentes palabras clave","Select Blockchain":"Seleccionar Blockchain","All":"Todos","More +{count}":["M\xE1s +",["count"]],"Activate this tab":"Activar esta pesta\xF1a","Another tab is open and handles transactions.":"Otra pesta\xF1a es abierta y maneja transacciones.","Activate current tab":"Activar pesta\xF1a actual","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"Actualmente, algunas transacciones se est\xE1n ejecutando y siendo manejadas por otra pesta\xF1a del navegador. Si activa esta pesta\xF1a, todas las transacciones que ya est\xE1n en el paso del signo de transacci\xF3n caducar\xE1n.","Confirm":"Confirmar","Your {blockchainName} wallets":["Tus billeteras ",["blockchainName"]],"Insufficient account balance":"Saldo insuficiente de la cuenta","Proceed anyway":"Proceda de todos modos","You need to connect a {blockchainName} wallet.":["Necesitas conectar un monedero ",["blockchainName"],"."],"Send to a different address":"Enviar a una direcci\xF3n diferente","Your destination address":"Su direcci\xF3n de destino","Address {destination} doesn't match the blockchain address pattern.":["La direcci\xF3n ",["destination"]," no coincide con el patr\xF3n de direcci\xF3n de la cadena de bloques."],"Add {chain} chain":["A\xF1adir cadena ",["chain"]],"Add {blockchainDisplayName} Chain":["A\xF1adir cadena ",["blockchainDisplayName"]],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["Deber\xEDas conectar un monedero compatible con ",["blockchainDisplayName"]," o elegir una direcci\xF3n ",["blockchainDisplayName"]," diferente"],"{blockchainDisplayName} Chain Added":["Cadena ",["blockchainDisplayName"]," a\xF1adida"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," is added to your wallet, you can use it to swap."],"Request Rejected":"Solicitud rechazada","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Has rechazado a\xF1adir la cadena ",["blockchainDisplayName"]," a tu cartera."],"Show more wallets":"Mostrar m\xE1s carteras","Cancel":"Cancelar","Refresh":"Refrescar","Notifications":"Notificaciones","Settings":"Ajustes","Transactions History":"Historial de transacciones","Connect Wallet":"Conectar cartera","Today":"Hoy","Swaps steps":"Intercambiar pasos","Retry":"Reintentar","Reset":"Reset","There are no notifications.":"No hay notificaciones.","Slippage Error":"Error de deslizamiento","Slippage Warning":"Advertencia de deslizamiento","Yours: {amount} {symbol}":["Tu: ",["amount"]," ",["symbol"]],"See All Routes":"Ver todas las rutas","View more info":"Ver m\xE1s informaci\xF3n","Gas & Fee Explanation":"Explicaci\xF3n de gas y comisi\xF3n","Details":"Detalles","Total Payable Fee":"Tarifa total a pagar","Hide non-payable fees":"Ocultar tarifas no pagables","Show non-payable fees":"Mostrar tarifas no pagables","Description":"Descripci\xF3n","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"Las siguientes comisiones se consideran en la salida de la transacci\xF3n y\\n                no necesitar\xE1s pagar gas adicional por ellas.","Swap input":"Swap input","Estimated output":"Salida estimada","Via:":"V\xEDa:","Chains:":"Cadenas:","Sort by":"Ordenar por","Smart Routing":"Ruta inteligente","Lowest Fee":"Tarifa m\xE1s baja","Fastest Transfer":"Transferencia m\xE1s r\xE1pida","Maximum Return":"Devoluci\xF3n m\xE1xima","Maximum Output":"Salida m\xE1xima","Swapping":"Swapping","Gas cost":"Coste de gas","Receiving":"Recibiendo","Price impact":"Impacto del precio","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Necesitas aumentar el deslizamiento a al menos ",["minRequiredSlippage"]," para esta ruta."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Te recomendamos que aumentes el deslizamiento a al menos ",["minRequiredSlippage"]," para esta ruta."],"Caution, your slippage is high.":"Precauci\xF3n, tu deslizamiento es alto.","Change":"Cambiar","Change settings":"Cambiar configuraci\xF3n","High slippage":"Deslizar alto","Low slippage":"Deslizamiento bajo"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Precauci\xF3n, su deslizamiento es alto (=",["userSlippage"],"). Su operaci\xF3n puede ser inicial."],"Confirm anyway":"Confirmar de todos modos","Slippage tolerance per swap":"Tolerancia de deslizamiento por intercambio","Custom":"Personalizado","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Tu transacci\xF3n ser\xE1 revertida si el precio cambia desfavorablemente m\xE1s de este porcentaje","Warning":"Advertencia","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"Este ajuste se aplica por paso (por ejemplo, 1Inch, Thorchain, etc) lo que significa que s\xF3lo el paso ser\xE1 revertido, no toda la transacci\xF3n.","Swap and Bridge":"Intercambiar y Puente","Request ID":"ID de Solicitud","Not found":"No encontrado","Swap with request ID = {requestId} not found.":["Intercambio con ID de solicitud = ",["requestId"]," no encontrado."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["Ha recibido ",["amount"]," ",["token"]," en el monedero ",["conciseAddress"]," de la cadena ",["chain"],"."],"Transaction was not sent.":"La transacci\xF3n no fue enviada.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," en ",["blockchain"]," permanecen en su cartera"],"Delete":"Eliminar","Try again":"Int\xE9ntalo de nuevo","View transaction":"Ver transacci\xF3n","Connect":"Conectar","Swap Successful":"Intercambio exitoso","Transaction Failed":"Transacci\xF3n fallida","Done":"Hecho","Diagnosis":"Diagn\xF3stico","See Details":"Ver detalles","Cancel Swap":"Cancelar intercambio","Are you sure you want to cancel this swap?":"\xBFEst\xE1 seguro de que desea cancelar este intercambio?","Yes, Cancel it":"S\xED, cancelarlo","No, Continue":"No, continuar","Delete Transaction":"Eliminar transacci\xF3n","Are you sure you want to delete this swap?":"\xBFEst\xE1 seguro de que desea eliminar este intercambio?","Yes, Delete it":"S\xED, eliminarlo","No, Cancel":"No, cancelar","Change Network":"Cambiar red","Network Changed":"Red cambiada","Select Token":"Seleccionar token","Wallet Connected":"Cartera conectada","Your wallet is connected, you can use it to swap.":"Su cartera est\xE1 conectada, puede usarla para intercambiar.","Failed to Connect":"Error al conectar","Your wallet is not connected. Please try again.":"Su cartera no est\xE1 conectada. Por favor, int\xE9ntelo de nuevo.","Connecting to your wallet":"Conectando a su cartera","Click connect in your wallet popup.":"Haga clic en conectar en su ventana emergente.","Failed Network, Please retry your swap.":"Red fallida, vuelva a intentar su intercambio.","Please reset your liquidity sources.":"Por favor, reinicie sus fuentes de liquidez.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Usted ha limitado las fuentes de liquidez y esto puede resultar en que Rango no encuentre rutas. Por favor considere restablecer sus fuentes de liquidez.","No Routes Found.":"No se encontraron Rutas.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Razones por las que Rango no pudo encontrar una ruta: baja liquidez en el token, muy baja cantidad de entrada o ninguna ruta disponible para la combinaci\xF3n de entrada/salida seleccionada.","Bridge Limit Error: Please increase your amount.":"Error en el l\xEDmite del puente. Por favor, aumente su cantidad.","Bridge Limit Error: Please decrease your amount.":"Error en el l\xEDmite del puente. Por favor disminuya su cantidad.","High Price Impact":"Impacto de precios altos","Price impact is too high!":"\xA1El impacto de los precios es demasiado alto!","The price impact is significantly higher than the allowed amount.":"El impacto de los precios es significativamente m\xE1s alto que la cantidad permitida.","Confirm high price impact":"Confirmar alto impacto de precio","Route updated and price impact is too high, try again later!":"Ruta actualizada y el impacto de los precios es demasiado alto, int\xE9ntalo de nuevo m\xE1s tarde!","USD Price Unknown":"Precio desconocido USD","USD Price Unknown, Cannot calculate Price Impact.":"Precio USD Desconocido, no se puede calcular el impacto del precio.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"Precio USD Desconocido, no se puede calcular el impacto del precio. El impacto del precio puede ser mayor de lo habitual. \xBFEst\xE1 seguro de continuar el swap?","Confirm USD Price Unknown":"Confirmar el precio de USD desconocido","Swap":"Intercambiar","Swap anyway":"Intercambiar de todos modos","The route goes through Ethereum. Continue?":"La ruta pasa por Ethereum. \xBFContinuar?","Network Fee":"Tarifa de red","Protocol Fee":"Tarifa de Protocolo","Affiliate Fee":"Tarifa de afiliado","Outbound Fee":"Tarifa saliente","Rango Fee":"Tarifa Rango","Route has been updated.":"La ruta ha sido actualizada.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Cantidad de salida cambiada a ",["newOutputAmount"]," ( cambio",["percentageChange"],"%)."],"Route swappers has been updated.":"Los swappers de rutas han sido actualizados.","Route internal coins has been updated.":"Se han actualizado las monedas internas de la ruta.","Routes":"Rutas","From":"De","To":"A","Light":"Claro","Dark":"Oscuro","Auto":"Auto","Loading failed":"Error al cargar","Bridges":"Puentes","Exchanges":"Intercambios","Language":"Idioma","Infinite approval":"Aprobaci\xF3n infinita","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Habilitar el modo 'Aprobaci\xF3n infinita' permite el acceso sin restricciones a contratos inteligentes de DEXes/Bridges, permiti\xE9ndoles utilizar la cantidad de token aprobada sin limitaciones.","Theme":"Tema","Confirm Swap":"Confirmar intercambio","Start Swap":"Iniciar intercambio","You get":"Obtienes","History":"Historial","Search Transaction":"Buscar transacci\xF3n","language":"idioma","Deselect all":"Deseleccionar todo","Select all":"Seleccionar todo","Search {sourceType}":["Buscar ",["sourceType"]],"Search Blockchain":"Buscar Blockchain","Source":"Fuente","Destination":"Destino","Swap {type}":["Intercambiar ",["type"]],"Search Token":"Buscar token","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Actualmente est\xE1s en modo campa\xF1a con restricciones sobre las fuentes de liquidez. \xBFLe gustar\xEDa desconectar de este modo y hacer uso de todas las fuentes de liquidez disponibles?","The request ID is necessary to display the swap details.":"El ID de solicitud es necesario para mostrar los detalles del intercambio.","Connect Wallets":"Conectar billeteras","Choose a wallet to connect.":"Elija una cartera para conectar.","This week":"Esta semana","This month":"Este mes","This year":"Este a\xF1o","Required: >= {min} {symbol}":["Requerido: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Requerido: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Requerido: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Requerido: < ",["max"]," ",["symbol"]]," for network fee":" por comisi\xF3n de red"," for swap":" para intercambio"," for input and network fee":" por entrada y tarifa de red","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Necesitas ",["requiredAmount"]," ",["symbol"],["reason"],", pero tienes ",["currentAmount"]," ",["symbol"]," en tu monedero ",["blockchain"],"."],"Waiting for connecting wallet":"Esperando por conectar cartera","Waiting for other running tasks to be finished":"Esperando a que finalicen otras tareas en ejecuci\xF3n","Waiting for changing wallet network":"Esperando a cambiar la red del monedero","Sunday":"Domingo","Monday":"Lunes","Tuesday":"Martes","Wednesday":"Mi\xE9rcoles","Thursday":"Jueves","Friday":"Viernes","Saturday":"S\xE1bado","Powered By":"Desarrollado por","Aggregated Transaction":"Transacci\xF3n agregada","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Intercambiar por ",["fromChain"]," v\xEDa ",["swapper"]],"Bridge to {toChain} via {swapper}":["Puente a ",["toChain"]," a trav\xE9s de ",["swapper"]],"Failed":"Fallo","Completed":"Completado","In progress":"En progreso","Waiting for bridge transaction":"Esperando una transacci\xF3n de puente","Connected":"Conectado","Disconnect":"Desconectar","Install":"Instalar","Connecting...":"Conectando...","Connecting":"Conectando","Disconnected":"Desconectado","you need to pass a correct state to Wallet.":"necesita pasar un estado correcto a Wallet.","Balance":"Saldo","Max":"M\xE1x","Token":"Token","Chain":"Cadena"}`,
);
var Mt = JSON.parse(
  `{"Bridge Limit Error":"Sillan Rajoitus Virhe","Minimum required slippage: {minRequiredSlippage}":["Pienin vaadittu slippa: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Sinut: ",["userSlippage"]],"Select chain types":"Valitse ketjutyypit","This wallet supports multiple chains. Select which chain you'd like to connect to.":"T\xE4m\xE4 lompakko tukee useita ketjuja. Valitse mihin ketjuun, johon haluat yhdist\xE4\xE4.","Something went wrong":"Jokin meni pieleen","Something went wrong. Please refresh the app.":"Jokin meni pieleen. P\xE4ivit\xE4 sovellus.","No results found":"Tuloksia ei l\xF6ytynyt","Try using different keywords":"Kokeile k\xE4ytt\xE4\xE4 eri avainsanoja","Select Blockchain":"Valitse Lohkoketju","All":"Kaikki","More +{count}":["Enemm\xE4n +",["count"]],"Activate this tab":"Aktivoi t\xE4m\xE4 v\xE4lilehti","Another tab is open and handles transactions.":"Toinen v\xE4lilehti on avoin ja k\xE4sittelee tapahtumia.","Activate current tab":"Aktivoi nykyinen v\xE4lilehti","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"T\xE4ll\xE4 hetkell\xE4 jotkin tapahtumat ovat k\xE4ynniss\xE4 ja niit\xE4 k\xE4sitell\xE4\xE4n muilla selainv\xE4lilehdill\xE4. Jos aktivoit t\xE4m\xE4n v\xE4lilehden, kaikki tapahtumat, jotka ovat jo tapahtumakirjautumisvaiheessa, vanhenevat.","Confirm":"Vahvista","Your {blockchainName} wallets":[["blockchainName"]," lompakkoasi"],"Insufficient account balance":"Tilin saldo ei riit\xE4","Proceed anyway":"Jatka joka tapauksessa","You need to connect a {blockchainName} wallet.":["Sinun on yhdistett\xE4v\xE4 ",["blockchainName"]," lompakko."],"Send to a different address":"L\xE4het\xE4 toiseen osoitteeseen","Your destination address":"M\xE4\xE4r\xE4np\xE4\xE4si osoite","Address {destination} doesn't match the blockchain address pattern.":["Osoite ",["destination"]," ei vastaa lohkoketjun osoitekuviota."],"Add {chain} chain":["Lis\xE4\xE4 ",["chain"]," ketju"],"Add {blockchainDisplayName} Chain":["Lis\xE4\xE4 ",["blockchainDisplayName"]," Ketju"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["You should connect a ",["blockchainDisplayName"]," supported wallet or choose a different ",["blockchainDisplayName"]," address"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," Ketju Lis\xE4tty"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," on lis\xE4tty lompakkoon, voit k\xE4ytt\xE4\xE4 sit\xE4 vaihtaaksesi."],"Request Rejected":"Pyynt\xF6 Hyl\xE4tty","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Olet hyl\xE4nnyt ",["blockchainDisplayName"]," ketjun lis\xE4\xE4misen lompakkoon."],"Show more wallets":"N\xE4yt\xE4 lis\xE4\xE4 lompakkoja","Cancel":"Peruuta","Refresh":"P\xE4ivit\xE4","Notifications":"Ilmoitukset","Settings":"Asetukset","Transactions History":"Tapahtumien Historia","Connect Wallet":"Yhdist\xE4 Lompakko","Today":"T\xE4n\xE4\xE4n","Swaps steps":"Swapin vaiheet","Retry":"Yrit\xE4 Uudelleen","Reset":"Reset","There are no notifications.":"Ilmoituksia ei ole.","Slippage Error":"Virhe lipasivulla","Slippage Warning":"lipasivun Varoitus","Yours: {amount} {symbol}":["Yours: ",["amount"]," ",["symbol"]],"See All Routes":"Katso Kaikki Reitit","View more info":"N\xE4yt\xE4 lis\xE4tiedot","Gas & Fee Explanation":"Kaasun Ja Maksun Selitys","Details":"Yksityiskohdat","Total Payable Fee":"Maksettu Maksu Yhteens\xE4","Hide non-payable fees":"Piilota muut kuin maksetut maksut","Show non-payable fees":"N\xE4yt\xE4 maksamattomat maksut","Description":"Kuvaus","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"Seuraavat maksut otetaan huomioon liiketoimen tuotos, ja\\n                sinun ei tarvitse maksaa ylim\xE4\xE4r\xE4ist\xE4 kaasua niist\xE4.","Swap input":"Swap input","Estimated output":"Arvioitu tuotos","Via:":"Via:","Chains:":"Ketjut:","Sort by":"J\xE4rjest\xE4","Smart Routing":"\xC4lyk\xE4s Reititys","Lowest Fee":"Alin Maksu","Fastest Transfer":"Nopein Siirto","Maximum Return":"Suurin Palautus","Maximum Output":"Suurin Ulostulo","Swapping":"Swapping","Gas cost":"Kaasun hinta","Receiving":"Vastaanotetaan","Price impact":"Hinnan vaikutus","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Sinun t\xE4ytyy lis\xE4t\xE4 lipsumissivua v\xE4hint\xE4\xE4n ",["minRequiredSlippage"]," t\xE4lle reitille."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Suosittelemme, ett\xE4 nostat lipsumisen v\xE4hint\xE4\xE4n ",["minRequiredSlippage"]," t\xE4lle reitille."],"Caution, your slippage is high.":"Varoitus, lipsumisesi on korkea.","Change":"Muuta","Change settings":"Muuta asetuksia","High slippage":"Korkea lipsahdus","Low slippage":"Alhainen lipsahdus"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Varoitus, lipsumisesi on korkea (=",["userSlippage"],"). Kaupasi voi olla etu."],"Confirm anyway":"Vahvista joka tapauksessa","Slippage tolerance per swap":"Liu'utuksen toleranssi swapia kohti","Custom":"Mukautettu","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Tapahtumasi palautetaan, jos hinta muuttuu ep\xE4suotuisasti enemm\xE4n kuin t\xE4m\xE4 prosenttiosuus","Warning":"Varoitus","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"T\xE4m\xE4 asetus on k\xE4yt\xF6ss\xE4 vaiheittain (esim. 1Inch, Thorchain, jne.), mik\xE4 tarkoittaa, ett\xE4 vain vaihe perutaan, ei koko tapahtuma.","Swap and Bridge":"Vaihda ja silta","Request ID":"Pyyd\xE4 ID","Not found":"Ei l\xF6ydy","Swap with request ID = {requestId} not found.":["Vaihda pyynn\xF6n ID = ",["requestId"]," ei l\xF6ytynyt."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["You have received ",["amount"]," ",["token"]," in ",["conciseAddress"]," wallet on ",["chain"]," chain."],"Transaction was not sent.":"Tapahtumaa ei l\xE4hetetty.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," on ",["blockchain"]," remain in your wallet"],"Delete":"Poista","Try again":"Yrit\xE4 uudelleen","View transaction":"N\xE4yt\xE4 tapahtuma","Connect":"Yhdist\xE4","Swap Successful":"Vaihto Onnistui","Transaction Failed":"Tapahtuma Ep\xE4onnistui","Done":"Valmis","Diagnosis":"Diagnoosi","See Details":"N\xE4yt\xE4 Yksityiskohdat","Cancel Swap":"Peruuta Vaihda","Are you sure you want to cancel this swap?":"Oletko varma, ett\xE4 haluat peruuttaa t\xE4m\xE4n swapin?","Yes, Cancel it":"Kyll\xE4, peruuta se","No, Continue":"Ei, Jatka","Delete Transaction":"Poista Tapahtuma","Are you sure you want to delete this swap?":"Oletko varma, ett\xE4 haluat poistaa t\xE4m\xE4n swapin?","Yes, Delete it":"Kyll\xE4, poista se","No, Cancel":"Ei, Peruuta","Change Network":"Vaihda Verkkoa","Network Changed":"Verkko Muutettu","Select Token":"Valitse Tunnus","Wallet Connected":"Lompakko Yhdistetty","Your wallet is connected, you can use it to swap.":"Lompakkosi on yhdistetty, voit k\xE4ytt\xE4\xE4 sit\xE4 vaihtaaksesi.","Failed to Connect":"Yhteyden muodostaminen ep\xE4onnistui","Your wallet is not connected. Please try again.":"Lompakkosi ei ole yhdistetty. Yrit\xE4 uudelleen.","Connecting to your wallet":"Yhdistet\xE4\xE4n lompakkoon","Click connect in your wallet popup.":"Valitse yhdist\xE4 lompakon ponnahdusikkuna.","Failed Network, Please retry your swap.":"Ep\xE4onnistunut verkko, yrit\xE4 swapisi uudelleen.","Please reset your liquidity sources.":"Ole hyv\xE4 ja nollaa likviditeetin l\xE4hteet.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Olet rajoittanut likviditeettil\xE4hteit\xE4 ja t\xE4m\xE4 saattaa johtaa Rangon l\xF6yt\xE4miseen ilman reittej\xE4. Harkitse likviditeetin l\xE4hteiden uudelleenasettamista.","No Routes Found.":"Reittej\xE4 Ei L\xF6ytynyt.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Syyt miksi Rango ei l\xF6yt\xE4nyt reitti\xE4: alhainen likviditeetti token, hyvin alhainen sy\xF6te m\xE4\xE4r\xE4 tai ei reittej\xE4 k\xE4ytett\xE4viss\xE4 valitun sis\xE4\xE4n- / ulostulo token yhdistelm\xE4.","Bridge Limit Error: Please increase your amount.":"Bridge Limit virhe: Ole hyv\xE4 ja lis\xE4\xE4 summaasi.","Bridge Limit Error: Please decrease your amount.":"Bridge Limit virhe: pienenn\xE4 summaasi.","High Price Impact":"Korkean Hinnan Vaikutus","Price impact is too high!":"Hintavaikutus on liian suuri!","The price impact is significantly higher than the allowed amount.":"Hintavaikutus on huomattavasti suurempi kuin sallittu m\xE4\xE4r\xE4.","Confirm high price impact":"Vahvista hintavaikutus","Route updated and price impact is too high, try again later!":"Reitti p\xE4ivitetty ja hintavaikutus on liian korkea, yrit\xE4 my\xF6hemmin uudelleen!","USD Price Unknown":"Yhdysvaltain Hinta Tuntematon","USD Price Unknown, Cannot calculate Price Impact.":"USD Hinta tuntematon, Ei voida laskea Hintavaikutusta.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD Hinta tuntematon, Ei voida laskea hintavaikutusta. Hintavaikutus voi olla tavallista suurempi. Oletko varma jatkamaan swap?","Confirm USD Price Unknown":"Vahvista USD Hinta Tuntematon","Swap":"Vaihda","Swap anyway":"Vaihda joka tapauksessa","The route goes through Ethereum. Continue?":"Reitti kulkee Ethereumin kautta. Jatketaanko?","Network Fee":"Verkon Maksu","Protocol Fee":"P\xF6yt\xE4kirjan Maksu","Affiliate Fee":"Kumppanin Maksu","Outbound Fee":"L\xE4htev\xE4 Maksu","Rango Fee":"Rango Maksu","Route has been updated.":"Reitti on p\xE4ivitetty.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Output amount changed to ",["newOutputAmount"]," (",["percentageChange"],"% change)."],"Route swappers has been updated.":"Reitin vaihtajat on p\xE4ivitetty.","Route internal coins has been updated.":"Reitin sis\xE4iset kolikot on p\xE4ivitetty.","Routes":"Reitit","From":"Alkaen","To":"Vastaanottaja","Light":"Vaalea","Dark":"Tumma","Auto":"Automaattinen","Loading failed":"Lataus ep\xE4onnistui","Bridges":"Sillat","Exchanges":"P\xF6rssit","Language":"Kieli","Infinite approval":"Loputon hyv\xE4ksynt\xE4","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"P\xE4\xE4llekk\xE4isen hyv\xE4ksynn\xE4n mahdollistaminen mahdollistaa rajoittamattoman p\xE4\xE4syn DEX/Bridgesin \xE4lykk\xE4isiin sopimuksiin, jolloin ne voivat k\xE4ytt\xE4\xE4 hyv\xE4ksytty\xE4 symbolin m\xE4\xE4r\xE4\xE4 rajoituksetta.","Theme":"Teema","Confirm Swap":"Vahvista Vaihda","Start Swap":"K\xE4ynnist\xE4 Vaihda","You get":"Sin\xE4 saat","History":"Historia","Search Transaction":"Etsi Tapahtuma","language":"kieli","Deselect all":"Poista kaikki valinnat","Select all":"Valitse kaikki","Search {sourceType}":["Hae ",["sourceType"]],"Search Blockchain":"Etsi Lohkoketjua","Source":"L\xE4hde","Destination":"Kohde","Swap {type}":["Vaihda ",["type"]],"Search Token":"Etsi P\xE4\xE4symerkki","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"T\xE4ll\xE4 hetkell\xE4 olet kampanjatilassa, jossa on rajoituksia likviditeetin l\xE4hteit\xE4. Haluatko vaihtaa pois t\xE4st\xE4 tilasta ja hy\xF6dynt\xE4\xE4 kaikkia k\xE4ytett\xE4viss\xE4 olevia likviditeetin l\xE4hteit\xE4?","The request ID is necessary to display the swap details.":"Pyynt\xF6 ID on tarpeen n\xE4ytt\xE4\xE4 swapin tiedot.","Connect Wallets":"Yhdist\xE4 Lompakot","Choose a wallet to connect.":"Valitse yhdist\xE4v\xE4 lompakko","This week":"T\xE4ll\xE4 viikolla","This month":"T\xE4ss\xE4 kuussa","This year":"T\xE4n\xE4 vuonna","Required: >= {min} {symbol}":["Required: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Required: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Pakollinen: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Required: < ",["max"]," ",["symbol"]]," for network fee":" verkkomaksua varten"," for swap":" vaihtamista varten"," for input and network fee":" sy\xF6tt\xF6- ja verkkomaksu","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Needs \u2248 ",["requiredAmount"]," ",["symbol"],["reason"],", but you have ",["currentAmount"]," ",["symbol"]," in your ",["blockchain"]," wallet."],"Waiting for connecting wallet":"Odotetaan lompakon yhdist\xE4mist\xE4","Waiting for other running tasks to be finished":"Odotetaan, ett\xE4 muut k\xE4ynniss\xE4 olevat teht\xE4v\xE4t valmistuvat","Waiting for changing wallet network":"Odotetaan lompakon verkon vaihtamista","Sunday":"Sunnuntai","Monday":"Maanantai","Tuesday":"Tiistai","Wednesday":"Keskiviikko","Thursday":"Torstai","Friday":"Perjantai","Saturday":"Lauantai","Powered By":"Palvelun Toimittaja","Aggregated Transaction":"Yhdistetty Tapahtuma","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Swap on ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Bridge to ",["toChain"]," via ",["swapper"]],"Failed":"Ep\xE4onnistui","Completed":"Valmis","In progress":"Toiminto k\xE4ynniss\xE4","Waiting for bridge transaction":"Odotetaan siltatapahtumaa","Connected":"Yhdistetty","Disconnect":"Katkaise","Install":"Asenna","Connecting...":"Yhdistet\xE4\xE4n...","Connecting":"Yhdistet\xE4\xE4n","Disconnected":"Yhteys Katkaistu","you need to pass a correct state to Wallet.":"sinun t\xE4ytyy siirt\xE4\xE4 oikea tila Walletiin.","Balance":"Saldo","Max":"Maksimi","Token":"P\xE4\xE4symerkki","Chain":"Ketju"}`,
);
var At = JSON.parse(
  `{"Bridge Limit Error":"Erreur de limite de pont","Minimum required slippage: {minRequiredSlippage}":["Slippage minimum requis : ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Votre: ",["userSlippage"]],"Select chain types":"S\xE9lectionnez les types de cha\xEEnes","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Ce portefeuille prend en charge plusieurs cha\xEEnes. S\xE9lectionnez la cha\xEEne \xE0 laquelle vous souhaitez vous connecter.","Something went wrong":"Quelque chose s'est mal pass\xE9","Something went wrong. Please refresh the app.":"Une erreur s'est produite. Veuillez actualiser l'application.","No results found":"Aucun r\xE9sultat trouv\xE9","Try using different keywords":"Essayez d'utiliser diff\xE9rents mots-cl\xE9s","Select Blockchain":"S\xE9lectionnez la Blockchain","All":"Tous","More +{count}":["Plus +",["count"]],"Activate this tab":"Activer cet onglet","Another tab is open and handles transactions.":"Un autre onglet est ouvert et g\xE8re les transactions.","Activate current tab":"Activer l'onglet actuel","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"Actuellement, certaines transactions sont en cours d'ex\xE9cution et sont g\xE9r\xE9es par un autre onglet du navigateur. Si vous activez cet onglet, toutes les transactions qui sont d\xE9j\xE0 dans l'\xE9tape de signature de la transaction expireront.","Confirm":"Valider","Your {blockchainName} wallets":["Vos portefeuilles ",["blockchainName"]],"Insufficient account balance":"Solde du compte insuffisant","Proceed anyway":"Continuer quand m\xEAme","You need to connect a {blockchainName} wallet.":["Vous devez connecter un portefeuille ",["blockchainName"],"."],"Send to a different address":"Envoyer \xE0 une autre adresse","Your destination address":"Votre adresse de destination","Address {destination} doesn't match the blockchain address pattern.":["L'adresse ",["destination"]," ne correspond pas au mod\xE8le d'adresse blockchain."],"Add {chain} chain":["Ajouter une cha\xEEne ",["chain"]],"Add {blockchainDisplayName} Chain":["Ajouter une cha\xEEne ",["blockchainDisplayName"]],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["Vous devriez connecter un portefeuille pris en charge par ",["blockchainDisplayName"]," ou choisir une adresse ",["blockchainDisplayName"]," diff\xE9rente"],"{blockchainDisplayName} Chain Added":["Cha\xEEne ",["blockchainDisplayName"]," ajout\xE9e"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," est ajout\xE9 \xE0 votre portefeuille, vous pouvez l'utiliser pour \xE9changer."],"Request Rejected":"Demande rejet\xE9e","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Vous avez rejet\xE9 l'ajout de la cha\xEEne ",["blockchainDisplayName"]," \xE0 votre portefeuille."],"Show more wallets":"Afficher plus de portefeuilles","Cancel":"Abandonner","Refresh":"Rafra\xEEchir","Notifications":"Notifications","Settings":"R\xE9glages","Transactions History":"Historique des transactions","Connect Wallet":"Connecter le portefeuille","Today":"Aujourd'hui","Swaps steps":"\xC9tapes d'\xE9change","Retry":"R\xE9essayer","Reset":"Reset","There are no notifications.":"Il n'y a pas de notifications.","Slippage Error":"Erreur de Slippage","Slippage Warning":"Avertissement de Slippage","Yours: {amount} {symbol}":["Vous: ",["amount"]," ",["symbol"]],"See All Routes":"Voir toutes les routes","View more info":"Voir plus d'infos","Gas & Fee Explanation":"Explication du gaz et des frais","Details":"D\xE9tails du produit","Total Payable Fee":"Total des frais payables","Hide non-payable fees":"Masquer les frais non payables","Show non-payable fees":"Afficher les frais non payants","Description":"Libell\xE9","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"Les frais suivants sont pris en compte dans la production de la transaction et\\n                vous n'aurez pas besoin de payer du gaz suppl\xE9mentaire pour eux.","Swap input":"Swap input","Estimated output":"Sortie estim\xE9e","Via:":"Via:","Chains:":"Cha\xEEnes :","Sort by":"Trier par","Smart Routing":"Routage intelligent","Lowest Fee":"Frais les plus bas","Fastest Transfer":"Transfert le plus rapide","Maximum Return":"Retour maximum","Maximum Output":"Sortie maximale","Swapping":"Swapping","Gas cost":"Co\xFBt du gaz","Receiving":"R\xE9ception en cours","Price impact":"Impact des prix","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Vous devez augmenter le slippage \xE0 au moins ",["minRequiredSlippage"]," pour cette route."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Nous vous recommandons d'augmenter le slippage \xE0 au moins ",["minRequiredSlippage"]," pour cette route."],"Caution, your slippage is high.":"Attention, votre slippage est \xE9lev\xE9.","Change":"Changement","Change settings":"Modifier les param\xE8tres","High slippage":"Haut slippage","Low slippage":"Slippage bas"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Attention, votre slippage est \xE9lev\xE9 (=",["userSlippage"],"). Votre \xE9change peut \xEAtre frontal."],"Confirm anyway":"Confirmer quand m\xEAme","Slippage tolerance per swap":"Tol\xE9rance avec glissement par swap","Custom":"Personnalis\xE9","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Votre transaction sera annul\xE9e si le prix change d\xE9favorablement de plus de ce pourcentage","Warning":"Avertissement","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"Ce param\xE8tre est appliqu\xE9 par \xE9tape (par exemple 1Inch, Thorchain, etc) ce qui signifie que seule l'\xE9tape sera annul\xE9e, pas la transaction enti\xE8re.","Swap and Bridge":"\xC9changer et Pont","Request ID":"ID de la requ\xEAte","Not found":"Non trouv\xE9","Swap with request ID = {requestId} not found.":["L'\xE9change avec la requ\xEAte ID = ",["requestId"]," est introuvable."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["You have received ",["amount"]," ",["token"]," in ",["conciseAddress"]," wallet on ",["chain"]," chain."],"Transaction was not sent.":"La transaction n'a pas \xE9t\xE9 envoy\xE9e.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," sur ",["blockchain"]," restent dans votre portefeuille"],"Delete":"Supprimez","Try again":"R\xE9essayez","View transaction":"Voir la transaction","Connect":"Connecter","Swap Successful":"Echange R\xE9ussi","Transaction Failed":"La transaction a \xE9chou\xE9","Done":"Fait","Diagnosis":"Diagnostic","See Details":"Voir les d\xE9tails","Cancel Swap":"Annuler l'\xE9change","Are you sure you want to cancel this swap?":"\xCAtes-vous s\xFBr de vouloir annuler cet \xE9change ?","Yes, Cancel it":"Oui, annuler","No, Continue":"Non, continuer","Delete Transaction":"Supprimer la transaction","Are you sure you want to delete this swap?":"\xCAtes-vous s\xFBr de vouloir supprimer cet \xE9change ?","Yes, Delete it":"Oui, supprimer","No, Cancel":"Non, Annuler","Change Network":"Changer de r\xE9seau","Network Changed":"R\xE9seau modifi\xE9","Select Token":"S\xE9lectionner un jeton","Wallet Connected":"Portefeuille connect\xE9","Your wallet is connected, you can use it to swap.":"Votre portefeuille est connect\xE9, vous pouvez l'utiliser pour \xE9changer.","Failed to Connect":"\xC9chec de la connexion","Your wallet is not connected. Please try again.":"Votre portefeuille n'est pas connect\xE9. Veuillez r\xE9essayer.","Connecting to your wallet":"Connexion \xE0 votre portefeuille","Click connect in your wallet popup.":"Cliquez sur se connecter dans la fen\xEAtre pop-up de votre portefeuille.","Failed Network, Please retry your swap.":"R\xE9seau \xE9chou\xE9, veuillez r\xE9essayer votre swap.","Please reset your liquidity sources.":"Veuillez r\xE9initialiser vos sources de liquidit\xE9s.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Vous avez limit\xE9 les sources de liquidit\xE9s et cela pourrait conduire \xE0 ce que Rango ne trouve aucune voie. Veuillez envisager de r\xE9initialiser vos sources de liquidit\xE9.","No Routes Found.":"Aucune route trouv\xE9e.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Raison pour laquelle Rango n'a pas pu trouver de route : faible liquidit\xE9 sur jeton, tr\xE8s faible quantit\xE9 d'entr\xE9e ou aucune route disponible pour la combinaison de jeton d'entr\xE9e/sortie s\xE9lectionn\xE9e.","Bridge Limit Error: Please increase your amount.":"Erreur de limite de pont : veuillez augmenter votre montant.","Bridge Limit Error: Please decrease your amount.":"Erreur de limite de pont : veuillez r\xE9duire votre montant.","High Price Impact":"Impact sur les prix \xE9lev\xE9s","Price impact is too high!":"L'impact sur les prix est trop \xE9lev\xE9!","The price impact is significantly higher than the allowed amount.":"L'impact sur les prix est nettement plus \xE9lev\xE9 que le montant autoris\xE9.","Confirm high price impact":"Confirmer l'impact \xE9lev\xE9 du prix","Route updated and price impact is too high, try again later!":"La mise \xE0 jour de la route et l'impact des prix est trop \xE9lev\xE9, r\xE9essayez plus tard!","USD Price Unknown":"Prix USD inconnu","USD Price Unknown, Cannot calculate Price Impact.":"Prix USD inconnu, impossible de calculer l'impact des prix.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"Prix USD inconnu, impossible de calculer l'impact des prix. L'impact sur le prix peut \xEAtre plus \xE9lev\xE9 que d'habitude. \xCAtes-vous s\xFBr de vouloir continuer le swap?","Confirm USD Price Unknown":"Confirmer le prix en USD inconnu","Swap":"Permuter","Swap anyway":"Permuter quand m\xEAme","The route goes through Ethereum. Continue?":"L'itin\xE9raire passe par Ethereum. Continuer ?","Network Fee":"Frais de r\xE9seau","Protocol Fee":"Frais de protocole","Affiliate Fee":"Frais d'affiliation","Outbound Fee":"Frais sortants","Rango Fee":"Frais de Rango","Route has been updated.":"La route a \xE9t\xE9 mise \xE0 jour.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Output amount changed to ",["newOutputAmount"]," (",["percentageChange"],"% change)."],"Route swappers has been updated.":"Les swappers de route ont \xE9t\xE9 mis \xE0 jour.","Route internal coins has been updated.":"Les pi\xE8ces internes de la route ont \xE9t\xE9 mises \xE0 jour.","Routes":"Routes","From":"A partir de","To":"\xC0","Light":"Lumi\xE8re","Dark":"Sombre","Auto":"Automatique","Loading failed":"\xC9chec du chargement","Bridges":"Ponts de connexion","Exchanges":"\xC9changes","Language":"Langue","Infinite approval":"Approbation infinie","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Activer le mode \xAB approbation infinie\xBB permet un acc\xE8s illimit\xE9 aux contrats intelligents de DEXes/Ponts, leur permettant d'utiliser le montant de jeton approuv\xE9 sans restrictions.","Theme":"Th\xE8me","Confirm Swap":"Confirmer l'\xE9change","Start Swap":"D\xE9but de l'\xE9change","You get":"Vous obtenez","History":"Historique","Search Transaction":"Rechercher une transaction","language":"Langue","Deselect all":"D\xE9s\xE9lectionner tout","Select all":"Tout s\xE9lectionner","Search {sourceType}":["Rechercher dans ",["sourceType"]],"Search Blockchain":"Rechercher dans la Blockchain","Source":"Source","Destination":"Destination","Swap {type}":["\xC9changer ",["type"]],"Search Token":"Jeton de recherche","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Actuellement, vous \xEAtes en mode campagne avec des restrictions sur les sources de liquidit\xE9s. Voulez-vous sortir de ce mode et utiliser toutes les sources de liquidit\xE9s disponibles ?","The request ID is necessary to display the swap details.":"L'identifiant de la requ\xEAte est n\xE9cessaire pour afficher les d\xE9tails du swap.","Connect Wallets":"Connecter les portefeuilles","Choose a wallet to connect.":"Choisissez un portefeuille \xE0 connecter.","This week":"Cette semaine","This month":"Ce mois-ci","This year":"Cette ann\xE9e","Required: >= {min} {symbol}":["Requis: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Requis: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Requis: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Requis: < ",["max"]," ",["symbol"]]," for network fee":" pour frais de r\xE9seau"," for swap":" pour swap"," for input and network fee":" pour les frais d'entr\xE9e et de r\xE9seau","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Needs \u2248 ",["requiredAmount"]," ",["symbol"],["reason"],", but you have ",["currentAmount"]," ",["symbol"]," in your ",["blockchain"]," wallet."],"Waiting for connecting wallet":"En attente de connexion au portefeuille","Waiting for other running tasks to be finished":"En attente de la fin des autres t\xE2ches en cours","Waiting for changing wallet network":"En attente de changement de r\xE9seau du portefeuille","Sunday":"Dimanche","Monday":"Lundi","Tuesday":"Mardi","Wednesday":"Mercredi","Thursday":"Jeudi","Friday":"Vendredi","Saturday":"Samedi","Powered By":"Propuls\xE9 par","Aggregated Transaction":"Transaction agr\xE9g\xE9e","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["\xC9changer sur ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Pont vers ",["toChain"]," via ",["swapper"]],"Failed":"Echou\xE9","Completed":"Termin\xE9","In progress":"En cours","Waiting for bridge transaction":"En attente de la transaction de pont","Connected":"Connect\xE9","Disconnect":"D\xE9connecter","Install":"Installer","Connecting...":"Connexion en cours...","Connecting":"Connexion en cours","Disconnected":"D\xE9connect\xE9","you need to pass a correct state to Wallet.":"vous devez passer un \xE9tat correct \xE0 Wallet.","Balance":"Solde","Max":"Max.","Token":"Jeton","Chain":"Cha\xEEne"}`,
);
var Nt = JSON.parse(
  `{"Bridge Limit Error":"Errore Limite Ponte","Minimum required slippage: {minRequiredSlippage}":["Scivolo minimo richiesto: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Tuo: ",["userSlippage"]],"Select chain types":"Seleziona tipi di catena","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Questo portafoglio supporta pi\xF9 catene. Seleziona a quale catena vuoi connetterti.","Something went wrong":"Qualcosa \xE8 andato storto","Something went wrong. Please refresh the app.":"Qualcosa \xE8 andato storto. Si prega di aggiornare l'app.","No results found":"Nessun risultato trovato","Try using different keywords":"Prova a usare parole chiave diverse","Select Blockchain":"Seleziona Blockchain","All":"Tutti","More +{count}":["Altro +",["count"]],"Activate this tab":"Attiva questa scheda","Another tab is open and handles transactions.":"Un'altra scheda \xE8 aperta e gestisce le transazioni.","Activate current tab":"Attiva la scheda corrente","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"Attualmente, alcune transazioni sono in esecuzione e vengono gestite da un'altra scheda del browser. Se attivi questa scheda, tutte le transazioni che sono gi\xE0 nella fase del segno di transazione scadranno.","Confirm":"Conferma","Your {blockchainName} wallets":["I tuoi portafogli ",["blockchainName"]],"Insufficient account balance":"Saldo del conto insufficiente","Proceed anyway":"Procedere comunque","You need to connect a {blockchainName} wallet.":["Devi collegare un portafoglio ",["blockchainName"],"."],"Send to a different address":"Invia a un indirizzo diverso","Your destination address":"Il tuo indirizzo di destinazione","Address {destination} doesn't match the blockchain address pattern.":["L'indirizzo ",["destination"]," non corrisponde al modello di indirizzo blockchain."],"Add {chain} chain":["Aggiungi catena ",["chain"]],"Add {blockchainDisplayName} Chain":["Aggiungi Catena ",["blockchainDisplayName"]],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["Dovresti connettere un portafoglio supportato ",["blockchainDisplayName"]," o scegliere un indirizzo ",["blockchainDisplayName"]," diverso"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," Catena Aggiunta"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," \xE8 stato aggiunto al tuo portafoglio, puoi usarlo per scambiare."],"Request Rejected":"Richiesta Rifiutata","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Hai rifiutato l'aggiunta di una catena ",["blockchainDisplayName"]," al tuo portafoglio."],"Show more wallets":"Mostra altri portafogli","Cancel":"Annulla","Refresh":"Aggiorna","Notifications":"Notifiche","Settings":"Impostazioni","Transactions History":"Cronologia Transazioni","Connect Wallet":"Connetti Portafoglio","Today":"Oggi","Swaps steps":"Passaggi degli swap","Retry":"Riprova","Reset":"Reset","There are no notifications.":"Non ci sono notifiche.","Slippage Error":"Errore Slippage","Slippage Warning":"Avviso Slippage","Yours: {amount} {symbol}":["Tuo: ",["amount"]," ",["symbol"]],"See All Routes":"Vedi Tutte Le Itinerari","View more info":"Vedi maggiori informazioni","Gas & Fee Explanation":"Spiegazione Di Gas E Commissioni","Details":"Dettagli","Total Payable Fee":"Commissioni Pagabili Totali","Hide non-payable fees":"Nascondi commissioni non pagabili","Show non-payable fees":"Mostra commissioni non pagabili","Description":"Descrizione","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"Le seguenti commissioni sono prese in considerazione nell'output della transazione e\\n                non sar\xE0 necessario pagare gas extra per loro.","Swap input":"Swap input","Estimated output":"Risultato stimato","Via:":"Via:","Chains:":"Catene:","Sort by":"Ordina per","Smart Routing":"Routing Intelligente","Lowest Fee":"Tariffa Pi\xF9 Bassa","Fastest Transfer":"Trasferimento Pi\xF9 Veloce","Maximum Return":"Ritorno Massimo","Maximum Output":"Output Massimo","Swapping":"Swapping","Gas cost":"Costo del gas","Receiving":"Ricezione","Price impact":"Impatto sui prezzi","You need to increase slippage to at least {minRequiredSlippage} for this route.":["\xC8 necessario aumentare lo slittamento ad almeno ",["minRequiredSlippage"]," per questo percorso."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Ti consigliamo di aumentare lo slittamento ad almeno ",["minRequiredSlippage"]," per questo percorso."],"Caution, your slippage is high.":"Attenzione, il tuo slittamento \xE8 alto.","Change":"Cambia","Change settings":"Cambia impostazioni","High slippage":"Scivolo alto","Low slippage":"Scivolo basso"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Attenzione, il tuo slippage \xE8 alto (=",["userSlippage"],"). Il tuo trade pu\xF2 essere eseguito in anticipo."],"Confirm anyway":"Conferma comunque","Slippage tolerance per swap":"Tolleranza slippage per swap","Custom":"Personalizzato","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"La tua transazione verr\xE0 ripristinata se il prezzo cambia sfavorevolmente di pi\xF9 di questa percentuale","Warning":"Attenzione","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"Questa impostazione viene applicata per passo (es. 1Inch, Thorchain, etc), il che significa che solo il passo sar\xE0 annullato, non l'intera transazione.","Swap and Bridge":"Swap e Bridge","Request ID":"Richiedi Id","Not found":"Non trovato","Swap with request ID = {requestId} not found.":["Scambia con ID richiesta = ",["requestId"]," non trovato."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["Hai ricevuto ",["amount"]," ",["token"]," in ",["conciseAddress"]," portafoglio nella catena ",["chain"],"."],"Transaction was not sent.":"La transazione non \xE8 stata inviata.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," su ",["blockchain"]," rimane nel tuo portafoglio"],"Delete":"Elimina","Try again":"Riprova","View transaction":"Visualizza transazione","Connect":"Connetti","Swap Successful":"Scambia Riuscito","Transaction Failed":"Transazione Non Riuscita","Done":"Fatto","Diagnosis":"Diagnosi","See Details":"Vedi Dettagli","Cancel Swap":"Annulla Scambia","Are you sure you want to cancel this swap?":"Sei sicuro di voler annullare questo swap?","Yes, Cancel it":"S\xEC, annullalo","No, Continue":"No, Continua","Delete Transaction":"Elimina Transazione","Are you sure you want to delete this swap?":"Sei sicuro di voler eliminare questo swap?","Yes, Delete it":"S\xEC, eliminalo","No, Cancel":"No, Annulla","Change Network":"Cambia Rete","Network Changed":"Rete Modificata","Select Token":"Seleziona Token","Wallet Connected":"Portafoglio Connesso","Your wallet is connected, you can use it to swap.":"Il tuo portafoglio \xE8 connesso, puoi usarlo per scambiare.","Failed to Connect":"Impossibile connettersi","Your wallet is not connected. Please try again.":"Il tuo portafoglio non \xE8 connesso. Riprova.","Connecting to your wallet":"Connessione al tuo portafoglio","Click connect in your wallet popup.":"Fare clic su Connetti nel tuo portafoglio popup.","Failed Network, Please retry your swap.":"Rete fallita, riprova il tuo swap.","Please reset your liquidity sources.":"Reimposta le tue fonti di liquidit\xE0.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Hai limitato le fonti di liquidit\xE0 e questo potrebbe portare a Rango a non trovare nessuna rotta. Si prega di considerare la possibilit\xE0 di ripristinare le fonti di liquidit\xE0.","No Routes Found.":"Nessuna Rotta Trovata.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Motivi per cui Rango non ha trovato un percorso: bassa liquidit\xE0 sul token, quantit\xE0 di input molto bassa o nessun percorso disponibile per la combinazione di token input/output selezionata.","Bridge Limit Error: Please increase your amount.":"Errore limite ponte: aumenta il tuo importo.","Bridge Limit Error: Please decrease your amount.":"Errore limite ponte: si prega di diminuire l'importo.","High Price Impact":"Impatto Ad Alto Prezzo","Price impact is too high!":"L'impatto sui prezzi \xE8 troppo alto!","The price impact is significantly higher than the allowed amount.":"L\u2019impatto sui prezzi \xE8 significativamente superiore all\u2019importo consentito.","Confirm high price impact":"Conferma un impatto sui prezzi elevato","Route updated and price impact is too high, try again later!":"Percorso aggiornato e impatto prezzo \xE8 troppo alto, riprova pi\xF9 tardi!","USD Price Unknown":"Prezzo USD Sconosciuto","USD Price Unknown, Cannot calculate Price Impact.":"USD Prezzo Sconosciuto, non \xE8 possibile calcolare il prezzo impatto.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?","Confirm USD Price Unknown":"Conferma Il Prezzo Usd Sconosciuto","Swap":"Scambia","Swap anyway":"Scambia comunque","The route goes through Ethereum. Continue?":"Il percorso passa attraverso Ethereum. Continuare?","Network Fee":"Commissione Di Rete","Protocol Fee":"Commissione Del Protocollo","Affiliate Fee":"Commissione Di Affiliazione","Outbound Fee":"Commissione In Uscita","Rango Fee":"Commissione Rango","Route has been updated.":"Il percorso \xE8 stato aggiornato.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Importo output cambiato in ",["newOutputAmount"]," (",["percentageChange"],"% cambio)."],"Route swappers has been updated.":"Gli swappers del percorso sono stati aggiornati.","Route internal coins has been updated.":"Il percorso delle monete interne \xE8 stato aggiornato.","Routes":"Itinerari","From":"Da","To":"A","Light":"Chiaro","Dark":"Scuro","Auto":"Automatico","Loading failed":"Caricamento fallito","Bridges":"Ponti","Exchanges":"Scambi","Language":"Lingua","Infinite approval":"Approvazione infinita","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Abilitando la modalit\xE0 'Approvazione infinita' si concede l'accesso illimitato agli smart contract di DEX/Bridges, consentendo loro di utilizzare senza limitazioni l'importo del token approvato.","Theme":"Tema","Confirm Swap":"Conferma Scambio","Start Swap":"Inizia Scambia","You get":"Si ottiene","History":"Storico","Search Transaction":"Ricerca Transazione","language":"lingua","Deselect all":"Deseleziona tutto","Select all":"Seleziona tutto","Search {sourceType}":["Cerca ",["sourceType"]],"Search Blockchain":"Cerca Blockchain","Source":"Fonte","Destination":"Destinazione","Swap {type}":["Scambia ",["type"]],"Search Token":"Token Di Ricerca","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Attualmente, sei in modalit\xE0 campagna con restrizioni sulle fonti di liquidit\xE0. Vuoi disattivare questa modalit\xE0 e utilizzare tutte le fonti di liquidit\xE0 disponibili?","The request ID is necessary to display the swap details.":"L'ID della richiesta \xE8 necessario per visualizzare i dettagli dello swap.","Connect Wallets":"Collega Portafogli","Choose a wallet to connect.":"Scegli un portafoglio da collegare.","This week":"Questa settimana","This month":"Questo mese","This year":"Quest'anno","Required: >= {min} {symbol}":["Richiesto: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Richiesto: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Richiesto: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Richiesto: < ",["max"]," ",["symbol"]]," for network fee":" per commissione di rete"," for swap":" per swap"," for input and network fee":" per input e canone di rete","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Needs \u2248 ",["requiredAmount"]," ",["symbol"],["reason"],", but you have ",["currentAmount"]," ",["symbol"]," in your ",["blockchain"]," wallet."],"Waiting for connecting wallet":"In attesa della connessione del portafoglio","Waiting for other running tasks to be finished":"In attesa che altre attivit\xE0 in esecuzione siano terminate","Waiting for changing wallet network":"In attesa di cambiare la rete del portafoglio","Sunday":"Domenica","Monday":"Luned\xEC","Tuesday":"Marted\xEC","Wednesday":"Mercoled\xEC","Thursday":"Gioved\xEC","Friday":"Venerd\xEC","Saturday":"Sabato","Powered By":"Powered By","Aggregated Transaction":"Transazione Aggregata","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Scambia su ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Bridge to ",["toChain"]," via ",["swapper"]],"Failed":"Fallito","Completed":"Completato","In progress":"In corso","Waiting for bridge transaction":"In attesa di transazione bridge","Connected":"Connesso","Disconnect":"Disconnetti","Install":"Installa","Connecting...":"Connessione...","Connecting":"Connessione","Disconnected":"Disconnesso","you need to pass a correct state to Wallet.":"devi passare uno stato corretto a Wallet.","Balance":"Saldo","Max":"Max","Token":"Token","Chain":"Catena"}`,
);
var Ht = JSON.parse(
  `{"Bridge Limit Error":"\u30D6\u30EA\u30C3\u30B8\u5236\u9650\u30A8\u30E9\u30FC","Minimum required slippage: {minRequiredSlippage}":["\u6700\u5C0F\u5FC5\u8981\u306A\u30B9\u30EA\u30C3\u30D7: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["\u3042\u306A\u305F\u306E: ",["userSlippage"]],"Select chain types":"\u30C1\u30A7\u30FC\u30F3\u30BF\u30A4\u30D7\u3092\u9078\u629E","This wallet supports multiple chains. Select which chain you'd like to connect to.":"\u3053\u306E\u30A6\u30A9\u30EC\u30C3\u30C8\u306F\u8907\u6570\u306E\u30C1\u30A7\u30FC\u30F3\u3092\u30B5\u30DD\u30FC\u30C8\u3057\u3066\u3044\u307E\u3059\u3002\u63A5\u7D9A\u3057\u305F\u3044\u30C1\u30A7\u30FC\u30F3\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002","Something went wrong":"\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F","Something went wrong. Please refresh the app.":"\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u30A2\u30D7\u30EA\u3092\u66F4\u65B0\u3057\u3066\u304F\u3060\u3055\u3044\u3002","No results found":"\u7D50\u679C\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F","Try using different keywords":"\u5225\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u4F7F\u7528\u3057\u3066\u307F\u3066\u304F\u3060\u3055\u3044","Select Blockchain":"\u30D6\u30ED\u30C3\u30AF\u30C1\u30A7\u30FC\u30F3\u3092\u9078\u629E","All":"\u3059\u3079\u3066","More +{count}":["\u305D\u306E\u4ED6 +",["count"]],"Activate this tab":"\u3053\u306E\u30BF\u30D6\u3092\u6709\u52B9\u306B\u3059\u308B","Another tab is open and handles transactions.":"\u5225\u306E\u30BF\u30D6\u306F\u30AA\u30FC\u30D7\u30F3\u3067\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u3092\u51E6\u7406\u3057\u307E\u3059\u3002","Activate current tab":"\u73FE\u5728\u306E\u30BF\u30D6\u3092\u6709\u52B9\u306B\u3059\u308B","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"\u73FE\u5728\u3001\u4E00\u90E8\u306E\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u304C\u5B9F\u884C\u3055\u308C\u3001\u4ED6\u306E\u30D6\u30E9\u30A6\u30B6\u30BF\u30D6\u3067\u51E6\u7406\u3055\u308C\u3066\u3044\u307E\u3059\u3002 \u3053\u306E\u30BF\u30D6\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u3059\u3067\u306B\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u8A18\u53F7\u306E\u30B9\u30C6\u30C3\u30D7\u306B\u3042\u308B\u3059\u3079\u3066\u306E\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u304C\u671F\u9650\u5207\u308C\u306B\u306A\u308A\u307E\u3059\u3002","Confirm":"\u78BA\u8A8D\u3059\u308B","Your {blockchainName} wallets":["\u3042\u306A\u305F\u306E ",["blockchainName"]," \u30A6\u30A9\u30EC\u30C3\u30C8"],"Insufficient account balance":"\u30A2\u30AB\u30A6\u30F3\u30C8\u6B8B\u9AD8\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u307E\u3059","Proceed anyway":"\u3068\u306B\u304B\u304F\u7D9A\u884C\u3059\u308B","You need to connect a {blockchainName} wallet.":[["blockchainName"]," \u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u63A5\u7D9A\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002"],"Send to a different address":"\u5225\u306E\u30A2\u30C9\u30EC\u30B9\u306B\u9001\u308B","Your destination address":"\u5B9B\u5148\u30A2\u30C9\u30EC\u30B9","Address {destination} doesn't match the blockchain address pattern.":["\u30A2\u30C9\u30EC\u30B9 ",["destination"]," \u306F\u30D6\u30ED\u30C3\u30AF\u30C1\u30A7\u30FC\u30F3\u30A2\u30C9\u30EC\u30B9\u30D1\u30BF\u30FC\u30F3\u3068\u4E00\u81F4\u3057\u307E\u305B\u3093\u3002"],"Add {chain} chain":[["chain"]," \u30C1\u30A7\u30FC\u30F3\u3092\u8FFD\u52A0"],"Add {blockchainDisplayName} Chain":[["blockchainDisplayName"]," \u30C1\u30A7\u30FC\u30F3\u3092\u8FFD\u52A0"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":[["blockchainDisplayName"]," \u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u308B\u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u63A5\u7D9A\u3059\u308B\u304B\u3001\u5225\u306E ",["blockchainDisplayName"]," \u30A2\u30C9\u30EC\u30B9\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," \u30C1\u30A7\u30FC\u30F3\u304C\u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," \u304C\u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F\u3002\u4EA4\u63DB\u306B\u4F7F\u7528\u3067\u304D\u307E\u3059\u3002"],"Request Rejected":"\u30EA\u30AF\u30A8\u30B9\u30C8\u304C\u62D2\u5426\u3055\u308C\u307E\u3057\u305F","You've rejected adding {blockchainDisplayName} chain to your wallet.":[["blockchainDisplayName"]," \u30C1\u30A7\u30FC\u30F3\u3092\u3042\u306A\u305F\u306E\u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u8FFD\u52A0\u3059\u308B\u3053\u3068\u3092\u62D2\u5426\u3057\u307E\u3057\u305F\u3002"],"Show more wallets":"\u30A6\u30A9\u30EC\u30C3\u30C8\u3092\u3082\u3063\u3068\u8868\u793A","Cancel":"\u30AD\u30E3\u30F3\u30BB\u30EB","Refresh":"\u66F4\u65B0","Notifications":"\u901A\u77E5","Settings":"\u8A2D\u5B9A","Transactions History":"\u53D6\u5F15\u5C65\u6B74","Connect Wallet":"\u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u63A5\u7D9A","Today":"\u4ECA\u65E5","Swaps steps":"\u30B9\u30C6\u30C3\u30D7\u3092\u5165\u308C\u66FF\u3048\u307E\u3059","Retry":"\u518D\u8A66\u884C\u3059\u308B","Reset":"Reset","There are no notifications.":"\u901A\u77E5\u306F\u3042\u308A\u307E\u305B\u3093\u3002","Slippage Error":"\u30B9\u30E9\u30A4\u30C9\u30DA\u30FC\u30B8\u30A8\u30E9\u30FC","Slippage Warning":"\u6ED1\u308A\u6B62\u3081\u306E\u8B66\u544A","Yours: {amount} {symbol}":["\u3042\u306A\u305F\u306E: ",["amount"]," ",["symbol"]],"See All Routes":"\u3059\u3079\u3066\u306E\u30EB\u30FC\u30C8\u3092\u898B\u308B","View more info":"\u8A73\u7D30\u60C5\u5831\u3092\u8868\u793A","Gas & Fee Explanation":"\u30AC\u30B9&\u6599\u91D1\u306E\u8AAC\u660E","Details":"\u8A73\u7D30","Total Payable Fee":"\u5408\u8A08\u652F\u6255\u624B\u6570\u6599","Hide non-payable fees":"\u652F\u6255\u3044\u4E0D\u53EF\u80FD\u306A\u624B\u6570\u6599\u3092\u975E\u8868\u793A","Show non-payable fees":"\u672A\u6255\u3044\u624B\u6570\u6599\u3092\u8868\u793A","Description":"\u8AAC\u660E","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"\u4EE5\u4E0B\u306E\u624B\u6570\u6599\u306F\u53D6\u5F15\u306E\u51FA\u529B\u3067\u8003\u616E\u3055\u308C\u3001\\n                \u4F59\u5206\u306A\u30AC\u30B9\u3092\u652F\u6255\u3046\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\u3002","Swap input":"Swap input","Estimated output":"\u63A8\u5B9A\u3055\u308C\u305F\u51FA\u529B","Via:":"\u30D3\u30A2:","Chains:":"\u30C1\u30A7\u30FC\u30F3:","Sort by":"\u4E26\u3073\u66FF\u3048","Smart Routing":"\u30B9\u30DE\u30FC\u30C8\u30EB\u30FC\u30C6\u30A3\u30F3\u30B0","Lowest Fee":"\u6700\u4F4E\u624B\u6570\u6599","Fastest Transfer":"\u6700\u901F\u9001\u91D1","Maximum Return":"\u6700\u5927\u8FD4\u54C1\u6570","Maximum Output":"\u6700\u5927\u51FA\u529B","Swapping":"Swapping","Gas cost":"\u30AC\u30B9\u30B3\u30B9\u30C8","Receiving":"\u53D7\u4FE1\u4E2D","Price impact":"\u4FA1\u683C\u3078\u306E\u5F71\u97FF","You need to increase slippage to at least {minRequiredSlippage} for this route.":["\u3053\u306E\u30EB\u30FC\u30C8\u306B\u3064\u3044\u3066\u306F\u3001\u5C11\u306A\u304F\u3068\u3082 ",["minRequiredSlippage"]," \u307E\u3067\u6ED1\u308A\u3084\u3059\u304F\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002"],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["\u3053\u306E\u30EB\u30FC\u30C8\u306B\u3064\u3044\u3066\u306F\u3001\u5C11\u306A\u304F\u3068\u3082 ",["minRequiredSlippage"]," \u3078\u306E\u6ED1\u308A\u3092\u5897\u3084\u3059\u3053\u3068\u3092\u304A\u52E7\u3081\u3057\u307E\u3059\u3002"],"Caution, your slippage is high.":"\u6CE8\u610F\u3001\u3042\u306A\u305F\u306E\u6ED1\u308A\u306F\u9AD8\u3044\u3067\u3059\u3002","Change":"\u5909\u66F4","Change settings":"\u8A2D\u5B9A\u306E\u5909\u66F4","High slippage":"\u30CF\u30A4\u30B9\u30EA\u30C3\u30D7\u30DA\u30FC\u30B8","Low slippage":"\u3059\u3079\u308A\u4F4E\u3044\u9806"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" \u6CE8\u610F\u3001\u3042\u306A\u305F\u306E\u6ED1\u308A\u304C\u9AD8\u3044\u3067\u3059 (=",["userSlippage"],"). \u3042\u306A\u305F\u306E\u53D6\u5F15\u306F\u3001\u524D\u6255\u3044\u3055\u308C\u308B\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002"],"Confirm anyway":"\u78BA\u8A8D\u3059\u308B","Slippage tolerance per swap":"\u30B9\u30EF\u30C3\u30D7\u3054\u3068\u306E\u6ED1\u308A\u6B62\u3081\u8A31\u5BB9\u5DEE","Custom":"\u30AB\u30B9\u30BF\u30E0","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"\u4FA1\u683C\u304C\u3053\u306E\u30D1\u30FC\u30BB\u30F3\u30C6\u30FC\u30B8\u3088\u308A\u3082\u4E0D\u5229\u306B\u5909\u66F4\u3055\u308C\u305F\u5834\u5408\u3001\u53D6\u5F15\u306F\u5143\u306B\u623B\u3055\u308C\u307E\u3059","Warning":"\u8B66\u544A","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"\u3053\u306E\u8A2D\u5B9A\u306F\u30B9\u30C6\u30C3\u30D7\u3054\u3068\u306B\u9069\u7528\u3055\u308C\u307E\u3059(\u4F8B\u3048\u3070\u30011\u30A4\u30F3\u30C1\u3001Thorchain\u306A\u3069)\u3002\u3053\u308C\u306F\u30B9\u30C6\u30C3\u30D7\u306E\u307F\u304C\u53D6\u308A\u6D88\u3055\u308C\u3001\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u5168\u4F53\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002","Swap and Bridge":"\u30B9\u30EF\u30C3\u30D7\u3068\u30D6\u30EA\u30C3\u30B8","Request ID":"\u8981\u6C42ID","Not found":"\u898B\u3064\u304B\u308A\u307E\u305B\u3093","Swap with request ID = {requestId} not found.":["\u30EA\u30AF\u30A8\u30B9\u30C8 ID = ",["requestId"]," \u3067\u30B9\u30EF\u30C3\u30D7\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002"],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":[["amount"]," \u30C1\u30A7\u30FC\u30F3\u306E ",["token"]," \u30A6\u30A9\u30EC\u30C3\u30C8\u3067 ",["conciseAddress"]," ",["chain"]," Anamed@@4 \u3092\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\u3002"],"Transaction was not sent.":"\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u306F\u9001\u4FE1\u3055\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," \u306E ",["blockchain"]," \u306F\u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u6B8B\u308A\u307E\u3059"],"Delete":"\u524A\u9664","Try again":"\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044","View transaction":"\u53D6\u5F15\u3092\u8868\u793A","Connect":"\u63A5\u7D9A\u3059\u308B","Swap Successful":"\u4EA4\u4EE3\u6210\u529F","Transaction Failed":"\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u5931\u6557","Done":"\u5B8C\u4E86","Diagnosis":"\u8A3A\u65AD","See Details":"\u8A73\u7D30\u3092\u898B\u308B","Cancel Swap":"\u4EA4\u63DB\u3092\u30AD\u30E3\u30F3\u30BB\u30EB","Are you sure you want to cancel this swap?":"\u3053\u306E\u30B9\u30EF\u30C3\u30D7\u3092\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F","Yes, Cancel it":"\u306F\u3044\u3001\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u307E\u3059","No, Continue":"\u3044\u3044\u3048\u3001\u7D9A\u884C\u3057\u307E\u3059","Delete Transaction":"\u53D6\u5F15\u3092\u524A\u9664","Are you sure you want to delete this swap?":"\u3053\u306E\u30B9\u30EF\u30C3\u30D7\u3092\u524A\u9664\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F","Yes, Delete it":"\u306F\u3044\u3001\u524A\u9664\u3057\u307E\u3059","No, Cancel":"\u3044\u3044\u3048\u3001\u30AD\u30E3\u30F3\u30BB\u30EB","Change Network":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u3092\u5909\u66F4","Network Changed":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u3092\u5909\u66F4\u3057\u307E\u3057\u305F","Select Token":"\u30C8\u30FC\u30AF\u30F3\u3092\u9078\u629E","Wallet Connected":"\u30A6\u30A9\u30EC\u30C3\u30C8\u304C\u63A5\u7D9A\u3055\u308C\u307E\u3057\u305F","Your wallet is connected, you can use it to swap.":"\u30A6\u30A9\u30EC\u30C3\u30C8\u304C\u63A5\u7D9A\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u4EA4\u63DB\u306B\u4F7F\u7528\u3067\u304D\u307E\u3059\u3002","Failed to Connect":"\u63A5\u7D9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F","Your wallet is not connected. Please try again.":"\u30A6\u30A9\u30EC\u30C3\u30C8\u304C\u63A5\u7D9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002","Connecting to your wallet":"\u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u63A5\u7D9A\u4E2D","Click connect in your wallet popup.":"\u30A6\u30A9\u30EC\u30C3\u30C8\u306E\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u3067format@@0\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3059\u3002","Failed Network, Please retry your swap.":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30B9\u30EF\u30C3\u30D7\u3092\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002","Please reset your liquidity sources.":"\u6D41\u52D5\u6027\u60C5\u5831\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u3066\u304F\u3060\u3055\u3044\u3002","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"\u6D41\u52D5\u6027\u6E90\u304C\u5236\u9650\u3055\u308C\u3066\u3044\u308B\u305F\u3081\u3001Rango\u306B\u30EB\u30FC\u30C8\u304C\u898B\u3064\u304B\u3089\u306A\u3044\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002\u6D41\u52D5\u6027\u6E90\u306E\u30EA\u30BB\u30C3\u30C8\u3092\u691C\u8A0E\u3057\u3066\u304F\u3060\u3055\u3044\u3002","No Routes Found.":"\u30EB\u30FC\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Rango\u304C\u30EB\u30FC\u30C8\u3092\u898B\u3064\u3051\u3089\u308C\u306A\u304B\u3063\u305F\u7406\u7531: \u30C8\u30FC\u30AF\u30F3\u306E\u6D41\u52D5\u6027\u304C\u4F4E\u304F\u3001\u975E\u5E38\u306B\u4F4E\u3044\u5165\u529B\u91CF\u3001\u307E\u305F\u306F\u9078\u629E\u3055\u308C\u305F\u5165\u529B/\u51FA\u529B\u30C8\u30FC\u30AF\u30F3\u306E\u7D44\u307F\u5408\u308F\u305B\u3067\u5229\u7528\u53EF\u80FD\u306A\u30EB\u30FC\u30C8\u304C\u3042\u308A\u307E\u305B\u3093\u3002","Bridge Limit Error: Please increase your amount.":"\u30D6\u30EA\u30C3\u30B8\u5236\u9650\u30A8\u30E9\u30FC: \u91D1\u984D\u3092\u5897\u3084\u3057\u3066\u304F\u3060\u3055\u3044\u3002","Bridge Limit Error: Please decrease your amount.":"\u30D6\u30EA\u30C3\u30B8\u5236\u9650\u30A8\u30E9\u30FC: \u91D1\u984D\u3092\u6E1B\u3089\u3057\u3066\u304F\u3060\u3055\u3044\u3002","High Price Impact":"\u4FA1\u683C\u3078\u306E\u5F71\u97FF","Price impact is too high!":"\u4FA1\u683C\u306E\u5F71\u97FF\u304C\u9AD8\u3059\u304E\u307E\u3059!","The price impact is significantly higher than the allowed amount.":"\u4FA1\u683C\u3078\u306E\u5F71\u97FF\u306F\u3001\u8A31\u5BB9\u984D\u3088\u308A\u3082\u5927\u5E45\u306B\u9AD8\u304F\u306A\u308A\u307E\u3059\u3002","Confirm high price impact":"\u9AD8\u4FA1\u683C\u306E\u5F71\u97FF\u3092\u78BA\u8A8D\u3059\u308B","Route updated and price impact is too high, try again later!":"\u30EB\u30FC\u30C8\u306E\u66F4\u65B0\u3068\u4FA1\u683C\u3078\u306E\u5F71\u97FF\u304C\u9AD8\u3059\u304E\u307E\u3059\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\uFF01","USD Price Unknown":"USD\u4FA1\u683C\u4E0D\u660E","USD Price Unknown, Cannot calculate Price Impact.":"USD\u4FA1\u683C\u304C\u4E0D\u660E\u3067\u3059\u3002\u4FA1\u683C\u306E\u5F71\u97FF\u3092\u8A08\u7B97\u3067\u304D\u307E\u305B\u3093\u3002","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD\u4FA1\u683C\u304C\u4E0D\u660E\u3067\u3059\u3002\u4FA1\u683C\u306E\u5F71\u97FF\u3092\u8A08\u7B97\u3067\u304D\u307E\u305B\u3093\u3002\u4FA1\u683C\u306E\u5F71\u97FF\u306F\u901A\u5E38\u3088\u308A\u3082\u9AD8\u304F\u306A\u308B\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002\u30B9\u30EF\u30C3\u30D7\u3092\u7D9A\u884C\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F","Confirm USD Price Unknown":"\u4E0D\u660E\u306AUSD\u4FA1\u683C\u3092\u78BA\u8A8D","Swap":"\u5165\u308C\u66FF\u3048","Swap anyway":"\u3068\u306B\u304B\u304F\u5165\u308C\u66FF\u3048","The route goes through Ethereum. Continue?":"\u30EB\u30FC\u30C8\u306FEthereum\u3092\u901A\u904E\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F","Network Fee":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u624B\u6570\u6599","Protocol Fee":"\u30D7\u30ED\u30C8\u30B3\u30EB\u624B\u6570\u6599","Affiliate Fee":"\u30A2\u30D5\u30A3\u30EA\u30A8\u30A4\u30C8\u624B\u6570\u6599","Outbound Fee":"\u9001\u91D1\u624B\u6570\u6599","Rango Fee":"Rango\u624B\u6570\u6599","Route has been updated.":"\u30EB\u30FC\u30C8\u304C\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F\u3002","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["\u51FA\u529B\u91CF\u304C ",["newOutputAmount"]," \u306B\u5909\u66F4\u3055\u308C\u307E\u3057\u305F(",["percentageChange"],"%\u5909\u66F4)\u3002"],"Route swappers has been updated.":"\u30EB\u30FC\u30C8\u30B9\u30EF\u30C3\u30D1\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F\u3002","Route internal coins has been updated.":"\u30EB\u30FC\u30C8\u5185\u90E8\u30B3\u30A4\u30F3\u304C\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F\u3002","Routes":"\u30EB\u30FC\u30C8","From":"\u5DEE\u51FA\u4EBA:","To":"\u7D42\u4E86\u65E5","Light":"\u30E9\u30A4\u30C8","Dark":"\u30C0\u30FC\u30AF","Auto":"\u81EA\u52D5","Loading failed":"\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F","Bridges":"\u30D6\u30EA\u30C3\u30B8","Exchanges":"\u4EA4\u63DB","Language":"\u8A00\u8A9E","Infinite approval":"\u6C38\u4E45\u627F\u8A8D","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"\u300CInfinite\u627F\u8A8D\u300D\u30E2\u30FC\u30C9\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001DEX/Bridges\u306E\u30B9\u30DE\u30FC\u30C8\u30B3\u30F3\u30C8\u30E9\u30AF\u30C8\u3078\u306E\u7121\u5236\u9650\u306E\u30A2\u30AF\u30BB\u30B9\u304C\u8A31\u53EF\u3055\u308C\u3001\u627F\u8A8D\u3055\u308C\u305F\u30C8\u30FC\u30AF\u30F3\u306E\u91CF\u3092\u5236\u9650\u306A\u304F\u5229\u7528\u3067\u304D\u307E\u3059\u3002","Theme":"\u30C6\u30FC\u30DE","Confirm Swap":"\u30B9\u30EF\u30C3\u30D7\u306E\u78BA\u8A8D","Start Swap":"\u30B9\u30EF\u30C3\u30D7\u3092\u958B\u59CB","You get":"\u3042\u306A\u305F\u306F","History":"\u6CBF\u9769","Search Transaction":"\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u3092\u691C\u7D22","language":"\u8A00\u8A9E","Deselect all":"\u3059\u3079\u3066\u306E\u9078\u629E\u3092\u89E3\u9664","Select all":"\u3059\u3079\u3066\u9078\u629E","Search {sourceType}":[["sourceType"]," \u3092\u691C\u7D22"],"Search Blockchain":"\u30D6\u30ED\u30C3\u30AF\u30C1\u30A7\u30FC\u30F3\u3092\u691C\u7D22","Source":"\u30BD\u30FC\u30B9","Destination":"\u4FDD\u5B58\u5148","Swap {type}":[["type"]," \u3092\u5165\u308C\u66FF\u3048"],"Search Token":"\u30C8\u30FC\u30AF\u30F3\u3092\u691C\u7D22","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"\u73FE\u5728\u3001\u6D41\u52D5\u6027\u60C5\u5831\u6E90\u306B\u5236\u9650\u304C\u3042\u308B\u30AD\u30E3\u30F3\u30DA\u30FC\u30F3\u30E2\u30FC\u30C9\u3067\u3059\u3002 \u3053\u306E\u30E2\u30FC\u30C9\u3092\u5207\u308A\u66FF\u3048\u3066\u3001\u5229\u7528\u53EF\u80FD\u306A\u3059\u3079\u3066\u306E\u6D41\u52D5\u6027\u6E90\u3092\u4F7F\u7528\u3057\u307E\u3059\u304B\uFF1F","The request ID is necessary to display the swap details.":"\u30B9\u30EF\u30C3\u30D7\u306E\u8A73\u7D30\u3092\u8868\u793A\u3059\u308B\u306B\u306F\u30EA\u30AF\u30A8\u30B9\u30C8 ID \u304C\u5FC5\u8981\u3067\u3059\u3002","Connect Wallets":"\u30A6\u30A9\u30EC\u30C3\u30C8\u3092\u63A5\u7D9A","Choose a wallet to connect.":"\u63A5\u7D9A\u3059\u308B\u30A6\u30A9\u30EC\u30C3\u30C8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002","This week":"\u4ECA\u9031\u4E2D","This month":"\u4ECA\u6708\u306E","This year":"\u5E74","Required: >= {min} {symbol}":["\u5FC5\u9808\uFF1A>= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["\u5FC5\u9808: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["\u5FC5\u9808: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["\u5FC5\u9808: < ",["max"]," ",["symbol"]]," for network fee":" \u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u6599\u91D1\u3067"," for swap":" \u30B9\u30EF\u30C3\u30D7\u7528"," for input and network fee":" \u5165\u529B\u3068\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u6599\u91D1\u306B\u3064\u3044\u3066","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Needs \u2248 ",["requiredAmount"]," ",["symbol"],["reason"],", but you have ",["currentAmount"]," ",["symbol"]," in your ",["blockchain"]," wallet."],"Waiting for connecting wallet":"\u30A6\u30A9\u30EC\u30C3\u30C8\u306E\u63A5\u7D9A\u3092\u5F85\u3063\u3066\u3044\u307E\u3059","Waiting for other running tasks to be finished":"\u4ED6\u306E\u5B9F\u884C\u4E2D\u306E\u30BF\u30B9\u30AF\u304C\u5B8C\u4E86\u3059\u308B\u306E\u3092\u5F85\u3063\u3066\u3044\u307E\u3059","Waiting for changing wallet network":"\u30A6\u30A9\u30EC\u30C3\u30C8\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u306E\u5909\u66F4\u3092\u5F85\u3063\u3066\u3044\u307E\u3059","Sunday":"\u65E5\u66DC\u65E5","Monday":"\u6708\u66DC\u65E5","Tuesday":"\u706B\u66DC\u65E5","Wednesday":"\u6C34\u66DC\u65E5","Thursday":"\u6728\u66DC\u65E5","Friday":"\u91D1\u66DC\u65E5","Saturday":"\u571F\u66DC\u65E5","Powered By":"Powered By","Aggregated Transaction":"\u96C6\u8A08\u53D6\u5F15","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":[["fromChain"]," \u3067 ",["swapper"],"\u3092\u5165\u308C\u66FF\u3048"],"Bridge to {toChain} via {swapper}":[["toChain"]," \u7D4C\u7531\u3067 ",["swapper"],"\u306B\u6A4B"],"Failed":"\u5931\u6557\u3057\u307E\u3057\u305F","Completed":"\u5B8C\u4E86","In progress":"\u9032\u884C\u4E2D","Waiting for bridge transaction":"\u30D6\u30EA\u30C3\u30B8\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u3092\u5F85\u3063\u3066\u3044\u307E\u3059","Connected":"\u63A5\u7D9A\u3057\u307E\u3057\u305F","Disconnect":"\u63A5\u7D9A\u3092\u89E3\u9664","Install":"\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB","Connecting...":"\u63A5\u7D9A\u4E2D...","Connecting":"\u63A5\u7D9A\u4E2D","Disconnected":"\u5207\u65AD\u3055\u308C\u307E\u3057\u305F","you need to pass a correct state to Wallet.":"\u30A6\u30A9\u30EC\u30C3\u30C8\u306B\u6B63\u3057\u3044\u72B6\u614B\u3092\u6E21\u3059\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002","Balance":"\u6B8B\u9AD8","Max":"\u6700\u5927\u5024","Token":"\u30C8\u30FC\u30AF\u30F3","Chain":"\u30C1\u30A7\u30FC\u30F3"}`,
);
var Vt = JSON.parse(
  `{"Bridge Limit Error":"Brug limiet fout","Minimum required slippage: {minRequiredSlippage}":["Minimum vereiste slippage: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Jouw: ",["userSlippage"]],"Select chain types":"Selecteer chain types","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Deze portemonnee ondersteunt meerdere chains. Selecteer met welke keten u verbinding wilt maken.","Something went wrong":"Er ging iets mis","Something went wrong. Please refresh the app.":"Er is iets fout gegaan. Vernieuw de app.","No results found":"Geen resultaten gevonden","Try using different keywords":"Probeer andere trefwoorden te gebruiken","Select Blockchain":"Selecteer Blockchain","All":"Allemaal","More +{count}":["Meer +",["count"]],"Activate this tab":"Dit tabblad activeren","Another tab is open and handles transactions.":"Een ander tabblad is open en behandelt transacties.","Activate current tab":"Actief tabblad","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"Op dit moment worden sommige transacties uitgevoerd en behandeld door een ander browsertabblad. Als u dit tabblad activeert, zullen alle transacties die al in de transactie tekenen staan verlopen.","Confirm":"Bevestigen","Your {blockchainName} wallets":["Uw ",["blockchainName"]," portemonnees"],"Insufficient account balance":"Onvoldoende saldo","Proceed anyway":"Toch doorgaan","You need to connect a {blockchainName} wallet.":["Je moet een ",["blockchainName"]," portemonnee verbinden."],"Send to a different address":"Stuur naar een ander adres","Your destination address":"Uw bestemming adres","Address {destination} doesn't match the blockchain address pattern.":["Adres ",["destination"]," komt niet overeen met het blockchainadrespatroon."],"Add {chain} chain":["Voeg ",["chain"]," keten toe"],"Add {blockchainDisplayName} Chain":[["blockchainDisplayName"]," Ketting toevoegen"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["U moet een ",["blockchainDisplayName"]," ondersteunde portemonnee verbinden of een ander ",["blockchainDisplayName"]," adres kiezen"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," Ketting toegevoegd"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," is aan uw portemonnee toegevoegd, u kunt deze gebruiken om te wisselen."],"Request Rejected":"Verzoek afgewezen","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Je hebt geweigerd om ",["blockchainDisplayName"]," -keten toe te voegen aan je portemonnee."],"Show more wallets":"Toon meer portefeuilles","Cancel":"annuleren","Refresh":"Vernieuwen","Notifications":"Notificaties","Settings":"Instellingen","Transactions History":"Transacties geschiedenis","Connect Wallet":"Verbind Portemonnee","Today":"vandaag","Swaps steps":"Swaps stappen","Retry":"Opnieuw","Reset":"Reset","There are no notifications.":"Er zijn geen meldingen.","Slippage Error":"Slippage Fout","Slippage Warning":"Slippage Waarschuwing","Yours: {amount} {symbol}":["Jours: ",["amount"]," ",["symbol"]],"See All Routes":"Alle routes bekijken","View more info":"Bekijk meer informatie","Gas & Fee Explanation":"Gas & Fee Uitleg","Details":"Beschrijving","Total Payable Fee":"Totale te betalen vergoeding","Hide non-payable fees":"Verberg onbetaalbare vergoedingen","Show non-payable fees":"Toon onbetaalbare kosten","Description":"Beschrijving","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"De volgende kosten worden in rekening gebracht in de transactieuitvoer en\\n                je hoeft er geen extra gas voor te betalen.","Swap input":"Swap input","Estimated output":"Geschatte uitvoer","Via:":"Via:","Chains:":"Kettingen:","Sort by":"Sorteren op","Smart Routing":"Slimme routering","Lowest Fee":"Laagste kosten","Fastest Transfer":"Snelste overdracht","Maximum Return":"Maximale retour","Maximum Output":"Maximale uitvoer","Swapping":"Swapping","Gas cost":"Gas kosten","Receiving":"Ontvangen","Price impact":"Prijs impact","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Je moet slippage verhogen naar tenminste ",["minRequiredSlippage"]," voor deze route."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["We raden je aan om slippage ten minste ",["minRequiredSlippage"]," voor deze route te verhogen."],"Caution, your slippage is high.":"Let op, je slippage is hoog.","Change":"Veranderen","Change settings":"Instellingen wijzigen","High slippage":"Hoge slippage","Low slippage":"Lage slippage"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Let op, uw slippage is hoog (=",["userSlippage"],"). Uw transactie kan vooraf worden uitgevoerd."],"Confirm anyway":"Toch bevestigen","Slippage tolerance per swap":"Slippage tolerantie per swap","Custom":"Aangepaste","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Uw transactie zal worden teruggedraaid als de prijs onvoordelig verandert met meer dan dit percentage","Warning":"Waarschuwing","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"Deze instelling wordt toegepast per stap (bv. 1Inch, Thorchain, enz.) wat betekent dat alleen de stap wordt teruggedraaid, niet de hele transactie.","Swap and Bridge":"Wissel en brug","Request ID":"ID aanvragen","Not found":"Niet gevonden","Swap with request ID = {requestId} not found.":["Wissel met verzoek-ID = ",["requestId"]," niet gevonden."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["Je hebt ",["amount"]," ",["token"]," ontvangen in de ",["conciseAddress"]," portemonnee in ",["chain"]," keten."],"Transaction was not sent.":"Transactie is niet verzonden.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," van ",["blockchain"]," blijven in uw portemonnee"],"Delete":"Verwijderen","Try again":"Opnieuw proberen","View transaction":"Transactie weergeven","Connect":"Verbinden","Swap Successful":"Wissel succesvol","Transaction Failed":"Transactie mislukt","Done":"Voltooid","Diagnosis":"Diagnose","See Details":"Details bekijken","Cancel Swap":"Verwissel annuleren","Are you sure you want to cancel this swap?":"Weet u zeker dat u deze swap wilt annuleren?","Yes, Cancel it":"Ja, annuleren","No, Continue":"Nee, ga verder","Delete Transaction":"Verwijder transactie","Are you sure you want to delete this swap?":"Weet u zeker dat u deze swap wilt verwijderen?","Yes, Delete it":"Ja, verwijder het","No, Cancel":"Nee, annuleer","Change Network":"Netwerk wijzigen","Network Changed":"Netwerk gewijzigd","Select Token":"Selecteer Token","Wallet Connected":"Portemonnee verbonden","Your wallet is connected, you can use it to swap.":"Uw portemonnee is verbonden, u kunt deze omwisselen.","Failed to Connect":"Verbinden mislukt","Your wallet is not connected. Please try again.":"Uw portemonnee is niet verbonden. Probeer het opnieuw.","Connecting to your wallet":"Verbinding maken met uw portemonnee","Click connect in your wallet popup.":"Klik op verbinden met uw portemonnee popup.","Failed Network, Please retry your swap.":"Mislukt netwerk. Probeer het opnieuw.","Please reset your liquidity sources.":"Gelieve uw liquiditeitsbronnen te resetten.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"U hebt de liquiditeitsbronnen beperkt en dit kan ertoe leiden dat Rango geen routes vindt. Overweeg om uw liquiditeitsbronnen opnieuw in te stellen.","No Routes Found.":"Geen routes gevonden.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Redenen waarom Rango geen route kon vinden: lage liquiditeit op token, zeer lage invoerhoeveelheid of geen routes beschikbaar voor de geselecteerde combinatie van invoer/output token.","Bridge Limit Error: Please increase your amount.":"Bridge Limiet Fout: Verhoog uw bedrag.","Bridge Limit Error: Please decrease your amount.":"Bridge Limiet Fout: Verminder je bedrag.","High Price Impact":"Hoge prijs impact","Price impact is too high!":"De prijsimpact is te hoog!","The price impact is significantly higher than the allowed amount.":"Het prijseffect is beduidend hoger dan het toegestane bedrag.","Confirm high price impact":"hoge prijsimpact bevestigen","Route updated and price impact is too high, try again later!":"Route bijgewerkt en prijseffect is te hoog, probeer het later opnieuw!","USD Price Unknown":"USD prijs onbekend","USD Price Unknown, Cannot calculate Price Impact.":"USD prijs onbekend, kan de Impact niet berekenen.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD prijs onbekend, kan de Impact niet berekenen. Mogelijk is de prijs hoger dan normaal. Weet u zeker dat u door wilt gaan met de Swap?","Confirm USD Price Unknown":"Onbekende USD prijs bevestigen","Swap":"Wisselen","Swap anyway":"Wissel toch","The route goes through Ethereum. Continue?":"De route loopt door Ethereum. Doorgaan?","Network Fee":"Netwerk vergoeding","Protocol Fee":"Protocol vergoeding","Affiliate Fee":"Affiliate vergoeding","Outbound Fee":"Uitgaande kosten","Rango Fee":"Rango Vergoeding","Route has been updated.":"De route is bijgewerkt.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Uitgangsbedrag gewijzigd naar ",["newOutputAmount"]," (",["percentageChange"],"% wijziging)."],"Route swappers has been updated.":"Route swappers zijn bijgewerkt.","Route internal coins has been updated.":"Route interne munten zijn bijgewerkt.","Routes":"Routes","From":"van","To":"tot","Light":"Licht","Dark":"Donker","Auto":"Automatisch","Loading failed":"Laden mislukt","Bridges":"Bruggen","Exchanges":"Uitwisselingen","Language":"Taal","Infinite approval":"Oneindige goedkeuring","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Het inschakelen van de 'Oneindige goedkeuring' modus verleent onbeperkte toegang tot slimme contracten van DEXes/Bridges, waardoor ze het goedgekeurde token bedrag zonder beperkingen kunnen gebruiken.","Theme":"Thema","Confirm Swap":"Bevestig verwisselen","Start Swap":"Start omwisselen","You get":"Je krijgt","History":"Geschiedenis","Search Transaction":"Zoek transactie","language":"Taal","Deselect all":"Deselecteer alles","Select all":"Alles selecteren","Search {sourceType}":["Zoek ",["sourceType"]],"Search Blockchain":"Zoek Blockchain","Source":"Bron","Destination":"Doelstelling","Swap {type}":["Wissel ",["type"]],"Search Token":"Zoek Token","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Momenteel bent u in campagnemodus met beperkingen op liquiditeitsbronnen. Wilt u uit deze modus schakelen en gebruik maken van alle beschikbare liquiditeitsbronnen?","The request ID is necessary to display the swap details.":"Het verzoek-ID is nodig om de swap-gegevens weer te geven.","Connect Wallets":"Verbind Portemonnees","Choose a wallet to connect.":"Kies een portemonnee om te verbinden.","This week":"Deze week","This month":"Deze maand","This year":"Dit jaar","Required: >= {min} {symbol}":["Vereist: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Vereist: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Vereist: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Vereist: < ",["max"]," ",["symbol"]]," for network fee":" voor netwerkheffing"," for swap":" voor swap"," for input and network fee":" voor invoer en netwerk vergoeding","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Moet ",["requiredAmount"]," ",["symbol"],["reason"],", maar je hebt ",["currentAmount"]," ",["symbol"]," in je ",["blockchain"]," portemonnee nodig."],"Waiting for connecting wallet":"Wachten op verbinding met portemonnee","Waiting for other running tasks to be finished":"Wachten tot andere lopende taken zijn voltooid","Waiting for changing wallet network":"Wachten op het wijzigen van wallet netwerk","Sunday":"zondag","Monday":"maandag","Tuesday":"dinsdag","Wednesday":"woensdag","Thursday":"donderdag","Friday":"vrijdag","Saturday":"zaterdag","Powered By":"Mogelijk gemaakt door","Aggregated Transaction":"Geaggregeerde transactie","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Wissel op ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Brug naar ",["toChain"]," via ",["swapper"]],"Failed":"Mislukt","Completed":"Voltooid","In progress":"In behandeling","Waiting for bridge transaction":"Wachten op bridge transactie","Connected":"Verbonden","Disconnect":"Verbreek","Install":"Installeren","Connecting...":"Verbinden...","Connecting":"Verbinden","Disconnected":"Losgekoppeld","you need to pass a correct state to Wallet.":"u moet een juiste status doorgeven aan Wallet.","Balance":"Saldo","Max":"Max.","Token":"Token","Chain":"keten"}`,
);
var Et = JSON.parse(
  `{"Bridge Limit Error":"B\u0142\u0105d limitu mostu","Minimum required slippage: {minRequiredSlippage}":["Minimalny wymagany po\u015Blizg: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Yours: ",["userSlippage"]],"Select chain types":"Wybierz typy \u0142a\u0144cuch\xF3w","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Ten portfel obs\u0142uguje wiele \u0142a\u0144cuch\xF3w. Wybierz \u0142a\u0144cuch, z kt\xF3rym chcesz si\u0119 po\u0142\u0105czy\u0107.","Something went wrong":"Co\u015B posz\u0142o nie tak","Something went wrong. Please refresh the app.":"Co\u015B posz\u0142o nie tak. Prosz\u0119 od\u015Bwie\u017Cy\u0107 aplikacj\u0119.","No results found":"Nie znaleziono wynik\xF3w","Try using different keywords":"Spr\xF3buj u\u017Cy\u0107 r\xF3\u017Cnych s\u0142\xF3w kluczowych","Select Blockchain":"Wybierz \u0142a\u0144cuch blok\xF3w","All":"Wszystkie","More +{count}":["Wi\u0119cej +",["count"]],"Activate this tab":"Aktywuj t\u0119 kart\u0119","Another tab is open and handles transactions.":"Inna karta jest otwarta i obs\u0142uguje transakcje.","Activate current tab":"Aktywuj bie\u017C\u0105c\u0105 kart\u0119","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"Obecnie niekt\xF3re transakcje s\u0105 uruchomione i s\u0105 obs\u0142ugiwane przez inn\u0105 kart\u0119 przegl\u0105darki. Je\u015Bli aktywujesz t\u0119 kart\u0119, wszystkie transakcje, kt\xF3re s\u0105 ju\u017C w kroku podpisu transakcji, wygasn\u0105.","Confirm":"Potwierd\u017A","Your {blockchainName} wallets":["Twoje portfele ",["blockchainName"]],"Insufficient account balance":"Niewystarczaj\u0105ce saldo konta","Proceed anyway":"Kontynuuj mimo to","You need to connect a {blockchainName} wallet.":["Musisz po\u0142\u0105czy\u0107 portfel ",["blockchainName"],"."],"Send to a different address":"Wy\u015Blij na inny adres","Your destination address":"Tw\xF3j adres docelowy","Address {destination} doesn't match the blockchain address pattern.":["Adres ",["destination"]," nie pasuje do wzoru adresu blockchain."],"Add {chain} chain":["Dodaj \u0142a\u0144cuch ",["chain"]],"Add {blockchainDisplayName} Chain":["Dodaj \u0142a\u0144cuch ",["blockchainDisplayName"]],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["Powiniene\u015B po\u0142\u0105czy\u0107 obs\u0142ugiwany portfel ",["blockchainDisplayName"]," lub wybra\u0107 inny adres ",["blockchainDisplayName"]],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," \u0141a\u0144cuch dodany"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," zosta\u0142 dodany do twojego portfela, mo\u017Cesz go u\u017Cy\u0107 do zamiany."],"Request Rejected":"\u017B\u0105danie odrzucone","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Odrzuci\u0142e\u015B dodanie \u0142a\u0144cucha ",["blockchainDisplayName"]," do swojego portfela."],"Show more wallets":"Poka\u017C wi\u0119cej portfeli","Cancel":"Anuluj","Refresh":"Od\u015Bwie\u017C","Notifications":"Powiadomienia","Settings":"Ustawienia","Transactions History":"Historia transakcji","Connect Wallet":"Po\u0142\u0105cz portfel","Today":"Dzi\u015B","Swaps steps":"Etapy swap\xF3w","Retry":"Pon\xF3w pr\xF3b\u0119","Reset":"Reset","There are no notifications.":"Brak powiadomie\u0144.","Slippage Error":"B\u0142\u0105d po\u015Blizgu","Slippage Warning":"Ostrze\u017Cenie po\u015Blizgu","Yours: {amount} {symbol}":["Nasz: ",["amount"]," ",["symbol"]],"See All Routes":"Zobacz wszystkie trasy","View more info":"Zobacz wi\u0119cej informacji","Gas & Fee Explanation":"Wyja\u015Bnienie dotycz\u0105ce gazu i op\u0142at","Details":"Szczeg\xF3\u0142y","Total Payable Fee":"Ca\u0142kowita nale\u017Cna op\u0142ata","Hide non-payable fees":"Ukryj op\u0142aty niep\u0142atne","Show non-payable fees":"Poka\u017C op\u0142aty bezp\u0142atne","Description":"Opis","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"Nast\u0119puj\u0105ce op\u0142aty s\u0105 brane pod uwag\u0119 w wyj\u015Bciu transakcji i\\n                nie musisz za nie p\u0142aci\u0107 dodatkowego gazu.","Swap input":"Swap input","Estimated output":"Szacowane wyj\u015Bcie","Via:":"Przelotka:","Chains:":"\u0141a\u0144cuchy","Sort by":"Sortuj wed\u0142ug","Smart Routing":"Inteligentne Trasowanie","Lowest Fee":"Najni\u017Csza op\u0142ata","Fastest Transfer":"Najszybszy transfer","Maximum Return":"Maksymalny zwrot","Maximum Output":"Maksymalna warto\u015B\u0107 wyj\u015Bciowa","Swapping":"Swapping","Gas cost":"Koszt gazu","Receiving":"Odbieranie","Price impact":"Wp\u0142yw cen","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Musisz zwi\u0119kszy\u0107 po\u015Blizg do co najmniej ",["minRequiredSlippage"]," dla tej trasy."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Zalecamy zwi\u0119kszenie po\u015Blizgu do co najmniej ",["minRequiredSlippage"]," dla tej trasy."],"Caution, your slippage is high.":"Zachowaj ostro\u017Cno\u015B\u0107, tw\xF3j po\u015Blizg jest wysoki.","Change":"Zmiana","Change settings":"Zmie\u0144 ustawienia","High slippage":"Wysoki po\u015Blizg","Low slippage":"Niski po\u015Blizg"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Uwaga, Tw\xF3j po\u015Blizg jest wysoki (=",["userSlippage"],"). Twoja transakcja mo\u017Ce by\u0107 aktywna."],"Confirm anyway":"Potwierd\u017A mimo wszystko","Slippage tolerance per swap":"Tolerancja po\u015Blizgu na swap","Custom":"W\u0142asny","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Twoja transakcja zostanie przywr\xF3cona, je\u015Bli cena zmieni si\u0119 niekorzystnie o wi\u0119cej ni\u017C ten procent","Warning":"Ostrze\u017Cenie","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"To ustawienie jest stosowane na krok (np. 1Inch, Thorchain, itp.), co oznacza, \u017Ce tylko krok zostanie odwr\xF3cony, a nie ca\u0142a transakcja.","Swap and Bridge":"Zamie\u0144 i most","Request ID":"\u017B\u0105danie ID","Not found":"Nie znaleziono","Swap with request ID = {requestId} not found.":["Zamie\u0144 z ID \u017C\u0105dania = ",["requestId"]," nie znaleziono."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["Otrzyma\u0142e\u015B ",["amount"]," ",["token"]," w portfelu ",["conciseAddress"]," w \u0142a\u0144cuchu ",["chain"],"."],"Transaction was not sent.":"Transakcja nie zosta\u0142a wys\u0142ana.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," na ",["blockchain"]," pozostaje w Twoim portfelu"],"Delete":"Usu\u0144","Try again":"Spr\xF3buj ponownie","View transaction":"Zobacz transakcj\u0119","Connect":"Po\u0142\u0105cz","Swap Successful":"Zamiana zako\u0144czona","Transaction Failed":"Transakcja nie powiod\u0142a si\u0119","Done":"Gotowe","Diagnosis":"Diagnoza","See Details":"Zobacz szczeg\xF3\u0142y","Cancel Swap":"Anuluj zamian\u0119","Are you sure you want to cancel this swap?":"Czy na pewno chcesz anulowa\u0107 t\u0119 swap?","Yes, Cancel it":"Tak, anuluj","No, Continue":"Nie, Kontynuuj","Delete Transaction":"Usu\u0144 transakcj\u0119","Are you sure you want to delete this swap?":"Czy na pewno chcesz usun\u0105\u0107 t\u0119 swap?","Yes, Delete it":"Tak, usu\u0144","No, Cancel":"Nie, Anuluj","Change Network":"Zmie\u0144 sie\u0107","Network Changed":"Sie\u0107 zmieniona","Select Token":"Wybierz token","Wallet Connected":"Portfel po\u0142\u0105czony","Your wallet is connected, you can use it to swap.":"Tw\xF3j portfel jest po\u0142\u0105czony, mo\u017Cesz go u\u017Cy\u0107 do zamiany.","Failed to Connect":"Nie uda\u0142o si\u0119 po\u0142\u0105czy\u0107","Your wallet is not connected. Please try again.":"Tw\xF3j portfel nie jest po\u0142\u0105czony. Spr\xF3buj ponownie.","Connecting to your wallet":"\u0141\u0105czenie z portfelem","Click connect in your wallet popup.":"Kliknij po\u0142\u0105czenie w wyskakuj\u0105cym oknie portfela.","Failed Network, Please retry your swap.":"Nieudana sie\u0107, pon\xF3w pr\xF3b\u0119 wymiany.","Please reset your liquidity sources.":"Prosz\u0119 zresetowa\u0107 \u017Ar\xF3d\u0142a p\u0142ynno\u015Bci.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Ograniczy\u0142e\u015B \u017Ar\xF3d\u0142a p\u0142ynno\u015Bci, co mo\u017Ce skutkowa\u0107 znalezieniem przez Rango \u017Cadnych tras. Rozwa\u017C zresetowanie \u017Ar\xF3de\u0142 p\u0142ynno\u015Bci.","No Routes Found.":"Nie znaleziono trasy.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Powody, dla kt\xF3rych Rango nie m\xF3g\u0142 znale\u017A\u0107 trasy: niska p\u0142ynno\u015B\u0107 w tokenu, bardzo niska ilo\u015B\u0107 wej\u015Bciowa lub brak dost\u0119pnych tras dla wybranej kombinacji tokenu wej\u015Bciowego/wyj\u015Bciowego.","Bridge Limit Error: Please increase your amount.":"B\u0142\u0105d limitu mostka: Prosz\u0119 zwi\u0119kszy\u0107 swoj\u0105 kwot\u0119.","Bridge Limit Error: Please decrease your amount.":"B\u0142\u0105d limitu mostka: Prosz\u0119 zmniejszy\u0107 swoj\u0105 kwot\u0119.","High Price Impact":"Wp\u0142yw Wysokiej Ceny","Price impact is too high!":"Wp\u0142yw ceny jest zbyt wysoki!","The price impact is significantly higher than the allowed amount.":"Wp\u0142yw na cen\u0119 jest znacznie wy\u017Cszy ni\u017C dozwolona kwota.","Confirm high price impact":"Potwierd\u017A wysoki wp\u0142yw cen","Route updated and price impact is too high, try again later!":"Zaktualizowano tras\u0119 i wp\u0142yw ceny jest zbyt wysoki, spr\xF3buj ponownie p\xF3\u017Aniej!","USD Price Unknown":"Cena USD nieznana","USD Price Unknown, Cannot calculate Price Impact.":"Cena USD Nieznana, nie mo\u017Cna obliczy\u0107 wp\u0142ywu na cen\u0119.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"Cena USD Nieznana, nie mo\u017Cna obliczy\u0107 wp\u0142ywu na cen\u0119. Wp\u0142yw ceny mo\u017Ce by\u0107 wy\u017Cszy ni\u017C zwykle. Czy na pewno chcesz kontynuowa\u0107 transakcj\u0119?","Confirm USD Price Unknown":"Potwierd\u017A cen\u0119 USD nieznan\u0105","Swap":"Zamie\u0144","Swap anyway":"Zamie\u0144 mimo to","The route goes through Ethereum. Continue?":"Trasa przebiega przez Ethereum. Kontynuowa\u0107?","Network Fee":"Op\u0142ata sieciowa","Protocol Fee":"Op\u0142ata protoko\u0142owa","Affiliate Fee":"Op\u0142ata partnerska","Outbound Fee":"Op\u0142ata wychodz\u0105ca","Rango Fee":"Op\u0142ata Rango","Route has been updated.":"Trasa zosta\u0142a zaktualizowana.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Kwota wyj\u015Bciowa zmieniona na ",["newOutputAmount"]," (zmiana",["percentageChange"],"%)."],"Route swappers has been updated.":"Zaktualizowano zamienniki tras.","Route internal coins has been updated.":"Trasa monet wewn\u0119trznych zosta\u0142a zaktualizowana.","Routes":"Trasy","From":"Od","To":"Do","Light":"\u015Awiat\u0142o","Dark":"Ciemny","Auto":"Auto","Loading failed":"\u0141adowanie nie powiod\u0142o si\u0119","Bridges":"Mosty","Exchanges":"Wymiana","Language":"J\u0119zyk","Infinite approval":"Niesko\u0144czone zatwierdzenie","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"W\u0142\u0105czenie trybu 'Niesko\u0144czone zatwierdzenia' zapewnia nieograniczony dost\u0119p do inteligentnych kontrakt\xF3w DEX/most\xF3w, umo\u017Cliwiaj\u0105c im wykorzystanie zatwierdzonej ilo\u015Bci token\xF3w bez ogranicze\u0144.","Theme":"Motyw","Confirm Swap":"Potwierd\u017A wymian\u0119","Start Swap":"Rozpocznij wymian\u0119","You get":"Otrzymujesz","History":"Historia","Search Transaction":"Szukaj transakcji","language":"j\u0119zyk","Deselect all":"Odznacz wszystkie","Select all":"Zaznacz wszystkie","Search {sourceType}":["Szukaj ",["sourceType"]],"Search Blockchain":"Szukaj \u0142a\u0144cucha blok\xF3w","Source":"\u0179r\xF3d\u0142o","Destination":"Miejsce przeznaczenia","Swap {type}":["Zamie\u0144 ",["type"]],"Search Token":"Token wyszukiwania","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Obecnie jeste\u015B w trybie kampanii z ograniczeniami dotycz\u0105cymi \u017Ar\xF3de\u0142 p\u0142ynno\u015Bci. Czy chcesz wy\u0142\u0105czy\u0107 ten tryb i wykorzysta\u0107 wszystkie dost\u0119pne \u017Ar\xF3d\u0142a p\u0142ynno\u015Bci?","The request ID is necessary to display the swap details.":"Identyfikator \u017C\u0105dania jest niezb\u0119dny do wy\u015Bwietlania szczeg\xF3\u0142\xF3w swapu.","Connect Wallets":"Po\u0142\u0105cz portfele","Choose a wallet to connect.":"Wybierz portfel do po\u0142\u0105czenia.","This week":"W tym tygodniu","This month":"W tym miesi\u0105cu","This year":"W tym roku","Required: >= {min} {symbol}":["Wymagane: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Wymagane: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Wymagane: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Wymagane: < ",["max"]," ",["symbol"]]," for network fee":" za op\u0142at\u0119 sieciow\u0105"," for swap":" dla swapu"," for input and network fee":" dla op\u0142at wej\u015Bciowych i op\u0142at sieciowych","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Potrzebuje \u2192 ",["requiredAmount"]," ",["symbol"],["reason"],", ale masz ",["currentAmount"]," ",["symbol"]," w swoim portfelu ",["blockchain"],"."],"Waiting for connecting wallet":"Oczekiwanie na po\u0142\u0105czenie portfela","Waiting for other running tasks to be finished":"Oczekiwanie na zako\u0144czenie innych uruchomionych zada\u0144","Waiting for changing wallet network":"Oczekiwanie na zmian\u0119 sieci portfela","Sunday":"Niedziela","Monday":"Poniedzia\u0142ek","Tuesday":"Wtorek","Wednesday":"\u015Aroda","Thursday":"Czwartek","Friday":"Pi\u0105tek","Saturday":"Sobota","Powered By":"Wspierane przez","Aggregated Transaction":"Zbiorcza transakcja","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Zamie\u0144 na ",["fromChain"]," przez ",["swapper"]],"Bridge to {toChain} via {swapper}":["Most do ",["toChain"]," przez ",["swapper"]],"Failed":"Niepowodzenie","Completed":"Zako\u0144czone","In progress":"W toku","Waiting for bridge transaction":"Oczekiwanie na transakcj\u0119 mostu","Connected":"Po\u0142\u0105czono","Disconnect":"Roz\u0142\u0105cz","Install":"Zainstaluj","Connecting...":"\u0141\u0105czenie...","Connecting":"\u0141\u0105czenie","Disconnected":"Roz\u0142\u0105czony","you need to pass a correct state to Wallet.":"musisz przekaza\u0107 poprawny stan Wallet.","Balance":"Saldo","Max":"Maks.","Token":"Token","Chain":"\u0141a\u0144cuch"}`,
);
var Ft = JSON.parse(
  `{"Bridge Limit Error":"Erro no limite da ponte","Minimum required slippage: {minRequiredSlippage}":["M\xEDnimo de slippage: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Sua: ",["userSlippage"]],"Select chain types":"Selecione tipos de correntes","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Esta carteira suporta v\xE1rias cadeias. Selecione a que cadeia voc\xEA gostaria de se conectar.","Something went wrong":"Algo deu errado","Something went wrong. Please refresh the app.":"Ocorreu um erro. Por favor, atualize o aplicativo.","No results found":"Nenhum resultado encontrado","Try using different keywords":"Tente usar palavras-chave diferentes","Select Blockchain":"Selecione a Blockchain","All":"TODOS","More +{count}":["Mais +",["count"]],"Activate this tab":"Ativar esta aba","Another tab is open and handles transactions.":"Outra aba \xE9 aberta e lida com transa\xE7\xF5es.","Activate current tab":"Ativar a aba atual","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"No momento, algumas transa\xE7\xF5es est\xE3o sendo executadas e sendo tratadas por outra aba do navegador. Se voc\xEA ativar essa aba, todas as transa\xE7\xF5es que j\xE1 est\xE3o na etapa de sinal de transa\xE7\xE3o ir\xE3o expirar.","Confirm":"Confirmar","Your {blockchainName} wallets":["Suas carteiras ",["blockchainName"]],"Insufficient account balance":"Saldo de conta insuficiente","Proceed anyway":"Continuar mesmo assim","You need to connect a {blockchainName} wallet.":["Voc\xEA precisa conectar uma carteira ",["blockchainName"],"."],"Send to a different address":"Enviar para outro endere\xE7o","Your destination address":"Seu endere\xE7o de destino","Address {destination} doesn't match the blockchain address pattern.":["O endere\xE7o ",["destination"]," n\xE3o corresponde ao padr\xE3o do endere\xE7o da blockchain."],"Add {chain} chain":["Adiciona cadeia ",["chain"]],"Add {blockchainDisplayName} Chain":["Adicionar Corrente ",["blockchainDisplayName"]],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["Voc\xEA deve conectar uma carteira com suporte do ",["blockchainDisplayName"]," ou escolher um endere\xE7o ",["blockchainDisplayName"]," diferente"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," Cadeia Adicionada"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," foi adicionado \xE0 sua carteira, voc\xEA pode us\xE1-lo para trocar."],"Request Rejected":"Pedido rejeitado","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Voc\xEA rejeitou adicionar ",["blockchainDisplayName"]," corrente \xE0 sua carteira."],"Show more wallets":"Mostrar mais carteiras","Cancel":"cancelar","Refresh":"atualizar","Notifications":"notifica\xE7\xF5es","Settings":"Confirgura\xE7\xF5es","Transactions History":"Hist\xF3rico de transa\xE7\xF5es","Connect Wallet":"Conectar Carteira","Today":"hoje","Swaps steps":"Etapas de troca","Retry":"Repetir","Reset":"Reset","There are no notifications.":"N\xE3o h\xE1 notifica\xE7\xF5es.","Slippage Error":"Erro Slippage","Slippage Warning":"Aviso Slippage","Yours: {amount} {symbol}":["Sua: ",["amount"]," ",["symbol"]],"See All Routes":"Ver todas as rotas","View more info":"Ver mais informa\xE7\xF5es","Gas & Fee Explanation":"Explica\xE7\xE3o de G\xE1s e Taxa","Details":"detalhes","Total Payable Fee":"Taxa total a pagar","Hide non-payable fees":"Ocultar taxas n\xE3o-pag\xE1veis","Show non-payable fees":"Mostrar tarifas n\xE3o pag\xE1veis","Description":"Descri\xE7\xE3o:","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"As seguintes tarifas s\xE3o consideradas no resultado da transa\xE7\xE3o e\\n                voc\xEA n\xE3o precisar\xE1 pagar g\xE1s extra por elas.","Swap input":"Swap input","Estimated output":"Sa\xEDda estimada","Via:":"Via:","Chains:":"Correntas:","Sort by":"Classificar por","Smart Routing":"Roteamento inteligente","Lowest Fee":"Taxa mais baixa","Fastest Transfer":"Mais R\xE1pido","Maximum Return":"Retorno M\xE1ximo","Maximum Output":"Produ\xE7\xE3o M\xE1xima","Swapping":"Swapping","Gas cost":"Custo de g\xE1s","Receiving":"Recebimento","Price impact":"Impacto nos pre\xE7os","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Voc\xEA precisa aumentar o slippage para pelo menos ",["minRequiredSlippage"]," para esta rota."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Recomendamos que voc\xEA aumente o slippage para pelo menos ",["minRequiredSlippage"]," para esta rota."],"Caution, your slippage is high.":"Cuidado, seu slippage est\xE1 alto.","Change":"Troca","Change settings":"Alterar configura\xE7\xF5es","High slippage":"Alto slide","Low slippage":"Slippage Baixo"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Cuidado, sua p\xE1gina de slippage est\xE1 alta =",["userSlippage"],"). Sua opera\xE7\xE3o pode ser iniciada primeiro."],"Confirm anyway":"Confirmar mesmo assim","Slippage tolerance per swap":"Toler\xE2ncia do slippage por swap","Custom":"Personalizado","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Sua transa\xE7\xE3o ser\xE1 revertida se o pre\xE7o mudar desfavoravelmente, mais do que esta porcentagem","Warning":"ATEN\xC7\xC3O","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"Essa configura\xE7\xE3o \xE9 aplicada por passo (por exemplo, 1Inch, Thorchain, etc), que significa que apenas o passo ser\xE1 revertido, n\xE3o toda a transa\xE7\xE3o.","Swap and Bridge":"Inverter e Ponte","Request ID":"Solicitar ID","Not found":"N\xE3o encontrado","Swap with request ID = {requestId} not found.":["Trocar com o ID de requisi\xE7\xE3o = ",["requestId"]," n\xE3o encontrado."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["Voc\xEA recebeu ",["amount"]," ",["token"]," em carteira ",["conciseAddress"]," na cadeia ",["chain"],"."],"Transaction was not sent.":"Transa\xE7\xE3o n\xE3o foi enviada.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," em ",["blockchain"]," permanece em sua carteira"],"Delete":"excluir","Try again":"Tente novamente","View transaction":"Ver transa\xE7\xE3o","Connect":"Conectar","Swap Successful":"Troca bem sucedida","Transaction Failed":"Transa\xE7\xE3o Falhou","Done":"Conclu\xEDdo","Diagnosis":"Diagn\xF3stico","See Details":"Ver Detalhes","Cancel Swap":"Cancelar Swap","Are you sure you want to cancel this swap?":"Tem certeza que deseja cancelar este swap?","Yes, Cancel it":"Sim, Cancele","No, Continue":"N\xE3o, continuar","Delete Transaction":"Excluir Transa\xE7\xE3o","Are you sure you want to delete this swap?":"Tem certeza que deseja excluir esta troca?","Yes, Delete it":"Sim, exclua-o","No, Cancel":"N\xE3o, cancele","Change Network":"Alterar rede","Network Changed":"Rede alterada","Select Token":"Selecione o Token","Wallet Connected":"Carteira conectada","Your wallet is connected, you can use it to swap.":"Sua carteira est\xE1 conectada, voc\xEA pode us\xE1-la para trocar.","Failed to Connect":"Falha na conex\xE3o","Your wallet is not connected. Please try again.":"Sua carteira n\xE3o est\xE1 conectada. Por favor, tente novamente.","Connecting to your wallet":"Conectando-se \xE0 sua carteira","Click connect in your wallet popup.":"Clique em conectar no pop-up da sua carteira.","Failed Network, Please retry your swap.":"Falha na Rede, tente novamente sua altern\xE2ncia.","Please reset your liquidity sources.":"Por favor, redefina suas fontes de liquidez.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Voc\xEA limitou as fontes de liquidez e isso pode resultar em que o Rango n\xE3o encontre nenhuma rota. Por favor, considere redefinir suas fontes de liquidez.","No Routes Found.":"Nenhuma rota encontrada.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Motivos porque Rango n\xE3o conseguiu encontrar uma rota: baixa liquidez no token, quantidade muito baixa de entrada ou nenhuma rota dispon\xEDvel para a combina\xE7\xE3o selecionada de entrada/sa\xEDda do token.","Bridge Limit Error: Please increase your amount.":"Erro no limite da ponte: Por favor, aumente o seu valor.","Bridge Limit Error: Please decrease your amount.":"Erro no limite da ponte: Por favor, reduza seu montante.","High Price Impact":"Impacto de pre\xE7o alto","Price impact is too high!":"O impacto nos pre\xE7os \xE9 muito alto!","The price impact is significantly higher than the allowed amount.":"O impacto nos pre\xE7os \xE9 significativamente mais alto do que a quantidade permitida.","Confirm high price impact":"Confirmar alto impacto nos pre\xE7os","Route updated and price impact is too high, try again later!":"A rota atualizada e o impacto nos pre\xE7os \xE9 muito alto, tente novamente mais tarde!","USD Price Unknown":"Pre\xE7o em USD desconhecido","USD Price Unknown, Cannot calculate Price Impact.":"Pre\xE7o em USD desconhecido, n\xE3o \xE9 poss\xEDvel calcular o impacto de pre\xE7os.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"Pre\xE7o em USD desconhecido, n\xE3o \xE9 poss\xEDvel calcular o impacto do pre\xE7o. O impacto do pre\xE7o pode ser maior do que o normal. Tem certeza que deseja continuar o Swap?","Confirm USD Price Unknown":"Confirmar pre\xE7o de USD desconhecido","Swap":"Trocar","Swap anyway":"Trocar mesmo assim","The route goes through Ethereum. Continue?":"A rota passa pelo Ethereum. Continuar?","Network Fee":"Taxa de rede","Protocol Fee":"Taxa do Protocolo","Affiliate Fee":"Taxa de afiliado","Outbound Fee":"Taxa de Sa\xEDda","Rango Fee":"Taxa de Rango","Route has been updated.":"Rota foi atualizada.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Valor de sa\xEDda alterado para ",["newOutputAmount"]," ( Altera\xE7\xE3o de",["percentageChange"],"%)."],"Route swappers has been updated.":"Os trocadores de rota foram atualizados.","Route internal coins has been updated.":"Moedas internas do itiner\xE1rio foram atualizadas.","Routes":"Rotas","From":"De","To":"Para","Light":"Fino","Dark":"Escuro","Auto":"Autom\xE1tico","Loading failed":"Falha no carregamento","Bridges":"Pontes","Exchanges":"Trocas","Language":"IDIOMA","Infinite approval":"Aprova\xE7\xE3o infinita","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Ativar o modo de 'aprova\xE7\xE3o infinita' concede acesso irrestrito a contratos inteligentes de DEXes/Bridges, permitindo-lhes utilizar o valor do token aprovado, sem limita\xE7\xF5es.","Theme":"Tema","Confirm Swap":"Confirmar troca","Start Swap":"Trocar de in\xEDcio","You get":"Voc\xEA recebe","History":"Hist\xF3rico","Search Transaction":"Pesquisar transa\xE7\xE3o","language":"Idioma","Deselect all":"Desmarcar todos","Select all":"Selecionar todos","Search {sourceType}":["Pesquisar em ",["sourceType"]],"Search Blockchain":"Pesquisar Blockchain","Source":"fonte","Destination":"Destino","Swap {type}":["Trocar ",["type"]],"Search Token":"Token de pesquisa","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"Atualmente, voc\xEA est\xE1 no modo campanha com restri\xE7\xF5es sobre fontes de liquidez. Gostaria de mudar este modo e usar todas as fontes de liquidez dispon\xEDveis?","The request ID is necessary to display the swap details.":"O ID da requisi\xE7\xE3o \xE9 necess\xE1rio para exibir os detalhes do swap.","Connect Wallets":"Conectar Carteiras","Choose a wallet to connect.":"Escolha uma carteira para se conectar.","This week":"Esta semana","This month":"Este M\xEAs","This year":"Esse ano","Required: >= {min} {symbol}":["Obrigat\xF3rio: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Obrigat\xF3rio: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Obrigat\xF3rio: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Obrigat\xF3rio: < ",["max"]," ",["symbol"]]," for network fee":" para taxa de rede"," for swap":" para troca"," for input and network fee":" por taxa de entrada e de rede","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Precisa de ",["requiredAmount"]," ",["symbol"],["reason"],", mas voc\xEA tem ",["currentAmount"]," ",["symbol"]," na sua carteira ",["blockchain"],"."],"Waiting for connecting wallet":"Aguardando conex\xE3o da carteira","Waiting for other running tasks to be finished":"Aguardando o t\xE9rmino de outras tarefas em execu\xE7\xE3o","Waiting for changing wallet network":"Aguardando mudan\xE7a da rede de carteira","Sunday":"domingo","Monday":"Segunda-Feira","Tuesday":"Ter\xE7a-feira","Wednesday":"quarta-feira","Thursday":"quinta-feira","Friday":"Sexta-feira","Saturday":"s\xE1bado","Powered By":"Desenvolvido por","Aggregated Transaction":"Transa\xE7\xE3o Agregada","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Trocar em ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Ponte para ",["toChain"]," via ",["swapper"]],"Failed":"Falhou","Completed":"Conclu\xEDdo","In progress":"Em Execu\xE7\xE3o","Waiting for bridge transaction":"Aguardando a transa\xE7\xE3o da bridge","Connected":"Conectado","Disconnect":"Desconectar","Install":"Instale","Connecting...":"Conectandochar@@0","Connecting":"Conectando","Disconnected":"Desconectado","you need to pass a correct state to Wallet.":"voc\xEA precisa passar um estado correto para o Wallet.","Balance":"Saldo","Max":"M\xE1ximo","Token":"Identificador","Chain":"Corrente"}`,
);
var Bt = JSON.parse(
  `{"Bridge Limit Error":"\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u043C\u043E\u0441\u0442\u0430","Minimum required slippage: {minRequiredSlippage}":["\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u043C\u043E\u0435 \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u0435: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["\u0412\u0430\u0448\u0438: ",["userSlippage"]],"Select chain types":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F\u044B \u0446\u0435\u043F\u043E\u0447\u043A\u0438","This wallet supports multiple chains. Select which chain you'd like to connect to.":"\u042D\u0442\u043E\u0442 \u043A\u043E\u0448\u0435\u043B\u0435\u043A \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0446\u0435\u043F\u043E\u043A. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u043A \u043A\u0430\u043A\u043E\u0439 \u0446\u0435\u043F\u043E\u0447\u043A\u0435 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F.","Something went wrong":"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A","Something went wrong. Please refresh the app.":"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435.","No results found":"\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E","Try using different keywords":"\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u043D\u044B\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043B\u043E\u0432\u0430","Select Blockchain":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D","All":"\u0412\u0441\u0435","More +{count}":["\u0411\u043E\u043B\u044C\u0448\u0435 +",["count"]],"Activate this tab":"\u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u0443 \u0432\u043A\u043B\u0430\u0434\u043A\u0443","Another tab is open and handles transactions.":"\u0415\u0449\u0435 \u043E\u0434\u043D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u0430 \u0438 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438.","Activate current tab":"\u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0443\u044E \u0432\u043A\u043B\u0430\u0434\u043A\u0443","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"\u0412 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u044E\u0442\u0441\u044F \u0438 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0434\u0440\u0443\u0433\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u043E\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430. \u0415\u0441\u043B\u0438 \u0432\u044B \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442\u0435 \u044D\u0442\u0443 \u0432\u043A\u043B\u0430\u0434\u043A\u0443, \u0432\u0441\u0435 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0443\u0436\u0435 \u043D\u0430\u0445\u043E\u0434\u044F\u0442\u0441\u044F \u0432 \u0448\u0430\u0433\u0435 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439, \u0438\u0441\u0442\u0435\u043A\u0430\u044E\u0442.","Confirm":"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C","Your {blockchainName} wallets":["\u0412\u0430\u0448\u0438 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0438 ",["blockchainName"]],"Insufficient account balance":"\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043D\u0430 \u0441\u0447\u0435\u0442\u0435","Proceed anyway":"\u0412\u0441\u0435 \u0440\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C","You need to connect a {blockchainName} wallet.":["\u0412\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0435\u043A ",["blockchainName"],"."],"Send to a different address":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u0434\u0440\u0443\u0433\u043E\u0439 \u0430\u0434\u0440\u0435\u0441","Your destination address":"\u0412\u0430\u0448 \u0430\u0434\u0440\u0435\u0441 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F","Address {destination} doesn't match the blockchain address pattern.":[["destination"]," \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 \u0430\u0434\u0440\u0435\u0441\u0430 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0430."],"Add {chain} chain":["\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0446\u0435\u043F\u043E\u0447\u043A\u0443 ",["chain"]],"Add {blockchainDisplayName} Chain":["\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0446\u0435\u043F\u043E\u0447\u043A\u0443 ",["blockchainDisplayName"]],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["\u0412\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0435\u043A ",["blockchainDisplayName"]," \u0438\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u043E\u0439 \u0430\u0434\u0440\u0435\u0441 ",["blockchainDisplayName"]],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," \u0446\u0435\u043F\u043E\u0447\u043A\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0432\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A, \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E \u0434\u043B\u044F \u0441\u043C\u0435\u043D\u044B."],"Request Rejected":"\u0417\u0430\u043F\u0440\u043E\u0441 \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D","You've rejected adding {blockchainDisplayName} chain to your wallet.":["\u0412\u044B \u043E\u0442\u043A\u043B\u043E\u043D\u0438\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0446\u0435\u043F\u043E\u0447\u043A\u0438 ",["blockchainDisplayName"]," \u0432 \u0432\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A."],"Show more wallets":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u043E\u0432","Cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","Refresh":"\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C","Notifications":"\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F","Settings":"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438","Transactions History":"\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439","Connect Wallet":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0435\u043A","Today":"\u0421\u0435\u0433\u043E\u0434\u043D\u044F","Swaps steps":"\u041C\u0435\u043D\u044F\u0435\u0442 \u0448\u0430\u0433\u0438","Retry":"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C","Reset":"Reset","There are no notifications.":"\u041D\u0435\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439.","Slippage Error":"\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u044F","Slippage Warning":"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u044F","Yours: {amount} {symbol}":["\u0412\u0430\u0448\u0438: ",["amount"]," ",["symbol"]],"See All Routes":"\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B","View more info":"\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435","Gas & Fee Explanation":"\u041E\u0431\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u0435 \u0433\u0430\u0437\u0430 \u0438 \u043F\u043B\u0430\u0442\u044B","Details":"\u0414\u0435\u0442\u0430\u043B\u0438","Total Payable Fee":"\u041E\u0431\u0449\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430","Hide non-payable fees":"\u0421\u043A\u0440\u044B\u0442\u044C \u043D\u0435\u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u0435\u043C\u044B\u0435 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438","Show non-payable fees":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0435\u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u0435\u043C\u044B\u0435 \u0441\u0431\u043E\u0440\u044B","Description":"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438 \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043F\u0440\u0438 \u0432\u044B\u0432\u043E\u0434\u0435 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439, \u0438\\n                \u0432\u0430\u043C \u043D\u0435 \u043F\u0440\u0438\u0434\u0435\u0442\u0441\u044F \u043F\u043B\u0430\u0442\u0438\u0442\u044C \u0437\u0430 \u043D\u0438\u0445 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0433\u0430\u0437.","Swap input":"Swap input","Estimated output":"\u041F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0445\u043E\u0434","Via:":"\u0412\u0438\u0430:","Chains:":"\u0426\u0435\u043F\u043E\u0447\u043A\u0438:","Sort by":"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E","Smart Routing":"\u0423\u043C\u043D\u0430\u044F \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0438\u0437\u0430\u0446\u0438\u044F","Lowest Fee":"\u0421\u0430\u043C\u0430\u044F \u043D\u0438\u0437\u043A\u0430\u044F \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044F","Fastest Transfer":"\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043F\u0435\u0440\u0435\u0432\u043E\u0434","Maximum Return":"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043E\u0437\u0432\u0440\u0430\u0442","Maximum Output":"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0432\u043E\u0434","Swapping":"Swapping","Gas cost":"\u0417\u0430\u0442\u0440\u0430\u0442\u044B \u0433\u0430\u0437\u0430","Receiving":"\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435","Price impact":"\u0412\u043B\u0438\u044F\u043D\u0438\u0435 \u0446\u0435\u043D\u044B","You need to increase slippage to at least {minRequiredSlippage} for this route.":["\u0412\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u0435 \u043F\u043E \u043A\u0440\u0430\u0439\u043D\u0435\u0439 \u043C\u0435\u0440\u0435 \u0434\u043E ",["minRequiredSlippage"]," \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["\u041C\u044B \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0432\u0430\u043C \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u0435 \u043F\u043E \u043A\u0440\u0430\u0439\u043D\u0435\u0439 \u043C\u0435\u0440\u0435 \u0434\u043E ",["minRequiredSlippage"]," \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430."],"Caution, your slippage is high.":"\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0432\u0430\u0448\u0435 \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u0435 \u0432\u044B\u0441\u043E\u043A\u043E.","Change":"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C","Change settings":"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438","High slippage":"\u0412\u044B\u0441\u043E\u043A\u043E\u0435 \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u0435","Low slippage":"\u041D\u0438\u0437\u043A\u043E\u0435 \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u0435"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" \u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0432\u044B\u0441\u043E\u043A\u0430\u044F \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u0435 (=",["userSlippage"],"). \u0412\u0430\u0448\u0430 \u0441\u0434\u0435\u043B\u043A\u0430 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0435\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430."],"Confirm anyway":"\u0412\u0441\u0435 \u0440\u0430\u0432\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C","Slippage tolerance per swap":"\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u0441\u043A\u0430\u043B\u044C\u0437\u044B\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u0441\u043C\u0435\u043D\u0443","Custom":"\u0421\u0432\u043E\u0439","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"\u0412\u0430\u0448\u0430 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430, \u0435\u0441\u043B\u0438 \u0446\u0435\u043D\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0441\u044F \u0431\u043E\u043B\u0435\u0435 \u0447\u0435\u043C \u043D\u0430 \u044D\u0442\u043E\u0442 \u043F\u0440\u043E\u0446\u0435\u043D\u0442","Warning":"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"\u042D\u0442\u043E\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043D\u0430 \u043A\u0430\u0436\u0434\u043E\u043C \u0448\u0430\u0433\u0435 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, 1Inch, Thorchain \u0438 \u0442.\u0434.). \u042D\u0442\u043E \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442, \u0447\u0442\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0448\u0430\u0433 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043C\u0435\u043D\u0435\u043D, \u0430 \u043D\u0435 \u0432\u0441\u044F \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F.","Swap and Bridge":"\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043C\u0435\u0441\u0442\u0430\u043C\u0438","Request ID":"ID \u0437\u0430\u043F\u0440\u043E\u0441\u0430","Not found":"\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E","Swap with request ID = {requestId} not found.":["\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043D\u0430 ID \u0437\u0430\u043F\u0440\u043E\u0441\u0430 = ",["requestId"]," \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["\u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 ",["amount"]," ",["token"]," \u043D\u0430 ",["conciseAddress"]," \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0435 \u043D\u0430 \u0446\u0435\u043F\u043E\u0447\u043A\u0435 ",["chain"],"."],"Transaction was not sent.":"\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," \u043D\u0430 ",["blockchain"]," \u043E\u0441\u0442\u0430\u0435\u0442\u0441\u044F \u0432 \u0432\u0430\u0448\u0435\u043C \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0435"],"Delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","Try again":"\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0435\u0449\u0435 \u0440\u0430\u0437","View transaction":"\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438","Connect":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F","Swap Successful":"\u041F\u043E\u043C\u0435\u043D\u044F\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E","Transaction Failed":"\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F \u043D\u0435 \u0443\u0434\u0430\u043B\u0430\u0441\u044C","Done":"\u0413\u043E\u0442\u043E\u0432\u043E","Diagnosis":"\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430","See Details":"\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435","Cancel Swap":"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043C\u0435\u043D\u0443","Are you sure you want to cancel this swap?":"\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043E\u0431\u043C\u0435\u043D?","Yes, Cancel it":"\u0414\u0430, \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C","No, Continue":"\u041D\u0435\u0442, \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C","Delete Transaction":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044E","Are you sure you want to delete this swap?":"\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u0443 \u0437\u0430\u043C\u0435\u043D\u0443?","Yes, Delete it":"\u0414\u0430, \u0443\u0434\u0430\u043B\u0438\u0442\u044C","No, Cancel":"\u041D\u0435\u0442, \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C","Change Network":"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0435\u0442\u044C","Network Changed":"\u0421\u0435\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430","Select Token":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u043A\u0435\u043D","Wallet Connected":"\u041A\u043E\u0448\u0435\u043B\u0435\u043A \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D","Your wallet is connected, you can use it to swap.":"\u0412\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D, \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E \u0434\u043B\u044F \u0441\u043C\u0435\u043D\u044B.","Failed to Connect":"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F","Your wallet is not connected. Please try again.":"\u0412\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.","Connecting to your wallet":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0443","Click connect in your wallet popup.":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0432\u043E \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u043C \u043E\u043A\u043D\u0435 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430.","Failed Network, Please retry your swap.":"\u041D\u0435\u0443\u0434\u0430\u0447\u043D\u0430\u044F \u0441\u0435\u0442\u044C, \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0437\u0430\u043C\u0435\u043D\u0443.","Please reset your liquidity sources.":"\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u0431\u0440\u043E\u0441\u044C\u0442\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"\u0412\u044B \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u044B \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\u043C\u0438 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438, \u0438 \u044D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043A Rango \u043D\u0435 \u043D\u0430\u0439\u0442\u0438 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u043E\u0432. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043E \u0441\u0431\u0440\u043E\u0441\u0435 \u0432\u0430\u0448\u0438\u0445 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438.","No Routes Found.":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"\u041F\u0440\u0438\u0447\u0438\u043D\u044B \u043F\u043E\u0447\u0435\u043C\u0443 Rango \u043D\u0435 \u0441\u043C\u043E\u0433 \u043D\u0430\u0439\u0442\u0438 \u043C\u0430\u0440\u0448\u0440\u0443\u0442: \u043D\u0438\u0437\u043A\u0430\u044F \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0442\u043E\u043A\u0435\u043D\u0435, \u043E\u0447\u0435\u043D\u044C \u043D\u0438\u0437\u043A\u0430\u044F \u0441\u0443\u043C\u043C\u0430 \u0432\u0432\u043E\u0434\u0430 \u0438\u043B\u0438 \u043D\u0435\u0442 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u043E\u0432 \u0434\u043B\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u0438 \u0442\u043E\u043A\u0435\u043D\u0430 \u0432\u0432\u043E\u0434\u0430/\u0432\u044B\u0432\u043E\u0434\u0430.","Bridge Limit Error: Please increase your amount.":"\u041E\u0448\u0438\u0431\u043A\u0430 \u043B\u0438\u043C\u0438\u0442\u0430 \u043C\u043E\u0441\u0442\u0430: \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0443\u0432\u0435\u043B\u0438\u0447\u044C\u0442\u0435 \u0441\u0443\u043C\u043C\u0443.","Bridge Limit Error: Please decrease your amount.":"\u041E\u0448\u0438\u0431\u043A\u0430 \u043B\u0438\u043C\u0438\u0442\u0430 \u043C\u043E\u0441\u0442\u043E\u0432. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0443\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u0435 \u0441\u0443\u043C\u043C\u0443.","High Price Impact":"\u0412\u043B\u0438\u044F\u043D\u0438\u0435 \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u0446\u0435\u043D\u044B","Price impact is too high!":"\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0432\u043B\u0438\u044F\u043D\u0438\u0435 \u043D\u0430 \u0446\u0435\u043D\u0443!","The price impact is significantly higher than the allowed amount.":"\u0412\u043B\u0438\u044F\u043D\u0438\u0435 \u043D\u0430 \u0446\u0435\u043D\u044B \u0437\u043D\u0430\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432\u044B\u0448\u0435, \u0447\u0435\u043C \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043D\u0430\u044F \u0441\u0443\u043C\u043C\u0430.","Confirm high price impact":"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0432\u043B\u0438\u044F\u043D\u0438\u0435 \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u0446\u0435\u043D\u044B","Route updated and price impact is too high, try again later!":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D \u0438 \u0446\u0435\u043D\u0430 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0432\u044B\u0441\u043E\u043A\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435!","USD Price Unknown":"\u0426\u0435\u043D\u0430 USD \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430","USD Price Unknown, Cannot calculate Price Impact.":"USD \u0426\u0435\u043D\u0430 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430, \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0432\u043B\u0438\u044F\u043D\u0438\u0435 \u043D\u0430 \u0446\u0435\u043D\u0443.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD \u0426\u0435\u043D\u0430 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430, \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0432\u043B\u0438\u044F\u043D\u0438\u0435 \u043D\u0430 \u0446\u0435\u043D\u0443. \u0412\u043E\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0430 \u0446\u0435\u043D\u0443 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u0448\u0435, \u0447\u0435\u043C \u043E\u0431\u044B\u0447\u043D\u043E. \u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?","Confirm USD Price Unknown":"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0443\u044E \u0446\u0435\u043D\u0443 \u0432 USD","Swap":"\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C","Swap anyway":"\u0412\u0441\u0435 \u0440\u0430\u0432\u043D\u043E \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C","The route goes through Ethereum. Continue?":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u0447\u0435\u0440\u0435\u0437 Ethereum. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?","Network Fee":"\u041A\u043E\u043C\u0438\u0441\u0441\u0438\u044F \u0441\u0435\u0442\u0438","Protocol Fee":"\u041F\u043B\u0430\u0442\u0430 \u0437\u0430 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B","Affiliate Fee":"\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0430\u044F \u043F\u043B\u0430\u0442\u0430","Outbound Fee":"\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0430\u044F \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044F","Rango Fee":"\u041F\u043B\u0430\u0442\u0430 \u0437\u0430 Rango","Route has been updated.":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u0431\u044B\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["\u0421\u0443\u043C\u043C\u0430 \u0432\u044B\u0432\u043E\u0434\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u043D\u0430 ",["newOutputAmount"]," (",["percentageChange"],"% \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E)."],"Route swappers has been updated.":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043E\u0431\u043C\u0435\u043D\u0430 \u0431\u044B\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D.","Route internal coins has been updated.":"\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u043C\u043E\u043D\u0435\u0442\u044B \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u044B.","Routes":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u044B","From":"\u041E\u0442","To":"\u041A\u043E\u043C\u0443","Light":"\u0421\u0432\u0435\u0442\u043B\u0430\u044F","Dark":"\u0422\u0451\u043C\u043D\u0430\u044F","Auto":"\u0410\u0432\u0442\u043E","Loading failed":"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C","Bridges":"\u041C\u043E\u0441\u0442\u044B","Exchanges":"\u041E\u0431\u043C\u0435\u043D\u044B","Language":"\u042F\u0437\u044B\u043A","Infinite approval":"\u0411\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0435 \u043E\u0434\u043E\u0431\u0440\u0435\u043D\u0438\u0435","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0440\u0435\u0436\u0438\u043C\u0430 '\u0411\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0435 \u043E\u0434\u043E\u0431\u0440\u0435\u043D\u0438\u0435' \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043D\u0435\u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0443\u043C\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0430\u043C DEXes/Bridges, \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u044F \u0438\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043E\u0434\u043E\u0431\u0440\u0435\u043D\u043D\u0443\u044E \u0441\u0443\u043C\u043C\u0443 \u0442\u043E\u043A\u0435\u043D\u0430 \u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439.","Theme":"\u0422\u0435\u043C\u0430","Confirm Swap":"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0441\u043C\u0435\u043D\u044B","Start Swap":"\u041D\u0430\u0447\u0430\u0442\u044C \u043E\u0431\u043C\u0435\u043D","You get":"\u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0435","History":"\u0418\u0441\u0442\u043E\u0440\u0438\u044F","Search Transaction":"\u041F\u043E\u0438\u0441\u043A \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439","language":"\u044F\u0437\u044B\u043A","Deselect all":"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440","Select all":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435","Search {sourceType}":["\u0418\u0441\u043A\u0430\u0442\u044C ",["sourceType"]],"Search Blockchain":"\u041F\u043E\u0438\u0441\u043A \u0432 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0435","Source":"\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A","Destination":"\u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435","Swap {type}":["\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043D\u0430 ",["type"]],"Search Token":"\u041F\u043E\u0438\u0441\u043A \u0442\u043E\u043A\u0435\u043D\u0430","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"\u0412 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0432\u044B \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0435\u0441\u044C \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0441 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F\u043C\u0438 \u043D\u0430 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438. \u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u0440\u0435\u0436\u0438\u043C \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438?","The request ID is necessary to display the swap details.":"\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u0439 \u043E swap.","Connect Wallets":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0438","Choose a wallet to connect.":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u0448\u0435\u043B\u0435\u043A \u0434\u043B\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F.","This week":"\u042D\u0442\u0430 \u043D\u0435\u0434\u0435\u043B\u044F","This month":"\u042D\u0442\u043E\u0442 \u043C\u0435\u0441\u044F\u0446","This year":"\u0412 \u044D\u0442\u043E\u043C \u0433\u043E\u0434\u0443","Required: >= {min} {symbol}":["\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439: < ",["max"]," ",["symbol"]]," for network fee":" \u0437\u0430 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044E \u0441\u0435\u0442\u0438"," for swap":" \u0434\u043B\u044F \u043F\u043E\u0434\u043A\u0430\u0447\u043A\u0438"," for input and network fee":" \u0437\u0430 \u0432\u0432\u043E\u0434 \u0438 \u0441\u0435\u0442\u0435\u0432\u043E\u0439 \u0441\u0431\u043E\u0440","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["\u041D\u0443\u0436\u043D\u043E <unk> ",["requiredAmount"]," ",["symbol"],["reason"],", \u043D\u043E \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C ",["currentAmount"]," ",["symbol"]," \u0432 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0435 ",["blockchain"],"."],"Waiting for connecting wallet":"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430","Waiting for other running tasks to be finished":"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u0438\u0445 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447","Waiting for changing wallet network":"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0441\u0435\u0442\u0438 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430","Sunday":"\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435","Monday":"\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A","Tuesday":"\u0412\u0442\u043E\u0440\u043D\u0438\u043A","Wednesday":"\u0421\u0440\u0435\u0434\u0430","Thursday":"\u0427\u0435\u0442\u0432\u0435\u0440\u0433","Friday":"\u041F\u044F\u0442\u043D\u0438\u0446\u0430","Saturday":"\u0421\u0443\u0431\u0431\u043E\u0442\u0430","Powered By":"\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430","Aggregated Transaction":"\u0410\u0433\u0440\u0435\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043F\u0440\u043E\u0432\u043E\u0434\u043A\u0430","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043D\u0430 ",["fromChain"]," \u0447\u0435\u0440\u0435\u0437 ",["swapper"]],"Bridge to {toChain} via {swapper}":["\u041C\u043E\u0441\u0442 \u043A ",["toChain"]," \u0447\u0435\u0440\u0435\u0437 ",["swapper"]],"Failed":"\u041D\u0435\u0443\u0434\u0430\u0447\u043D\u044B\u0439","Completed":"\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E","In progress":"\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435","Waiting for bridge transaction":"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438 \u043F\u043E \u043C\u043E\u0441\u0442\u0443","Connected":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E","Disconnect":"\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F","Install":"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C","Connecting...":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435...","Connecting":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435","Disconnected":"\u041E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E","you need to pass a correct state to Wallet.":"\u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u041A\u043E\u0448\u0435\u043B\u044C\u043A\u0443 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435.","Balance":"\u0411\u0430\u043B\u0430\u043D\u0441","Max":"\u041C\u0430\u043A\u0441","Token":"\u0422\u043E\u043A\u0435\u043D","Chain":"\u0426\u0435\u043F\u044C"}`,
);
var Wt = JSON.parse(
  `{"Bridge Limit Error":"Bridgegr\xE4ns fel","Minimum required slippage: {minRequiredSlippage}":["Minsta obligatoriska halkning: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Er: ",["userSlippage"]],"Select chain types":"V\xE4lj kedjetyper","This wallet supports multiple chains. Select which chain you'd like to connect to.":"Denna pl\xE5nbok st\xF6der flera kedjor. V\xE4lj vilken kedja du vill ansluta till.","Something went wrong":"N\xE5got gick fel","Something went wrong. Please refresh the app.":"N\xE5got gick fel. V\xE4nligen uppdatera appen.","No results found":"Inga resultat hittades","Try using different keywords":"Prova att anv\xE4nda olika s\xF6kord","Select Blockchain":"V\xE4lj Blockkedja","All":"Alla","More +{count}":["Mer +",["count"]],"Activate this tab":"Aktivera denna flik","Another tab is open and handles transactions.":"En annan flik \xE4r \xF6ppen och hanterar transaktioner.","Activate current tab":"Aktivera aktuell flik","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"F\xF6r n\xE4rvarande k\xF6rs och hanteras vissa transaktioner av andra webbl\xE4sarfliken. Om du aktiverar den h\xE4r fliken, kommer alla transaktioner som redan finns i transaktionssigneringssteget att upph\xF6ra.","Confirm":"Bekr\xE4fta","Your {blockchainName} wallets":["Dina ",["blockchainName"]," pl\xE5nb\xF6cker"],"Insufficient account balance":"Otillr\xE4ckligt saldo","Proceed anyway":"Forts\xE4tt \xE4nd\xE5","You need to connect a {blockchainName} wallet.":["Du m\xE5ste ansluta en ",["blockchainName"]," pl\xE5nbok."],"Send to a different address":"Skicka till en annan adress","Your destination address":"Din destinationsadress","Address {destination} doesn't match the blockchain address pattern.":["Adress ",["destination"]," matchar inte blockkedjans adressm\xF6nster."],"Add {chain} chain":["L\xE4gg till ",["chain"]," kedja"],"Add {blockchainDisplayName} Chain":["L\xE4gg till ",["blockchainDisplayName"]," Chain"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["Du b\xF6r ansluta en ",["blockchainDisplayName"]," st\xF6dd pl\xE5nbok eller v\xE4lja en annan ",["blockchainDisplayName"]," -adress"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," kedja tillagd"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," l\xE4ggs till i din pl\xE5nbok, du kan anv\xE4nda den f\xF6r att v\xE4xa."],"Request Rejected":"Beg\xE4ran avvisad","You've rejected adding {blockchainDisplayName} chain to your wallet.":["Du har avb\xF6jt att l\xE4gga till ",["blockchainDisplayName"]," kedjan i din pl\xE5nbok."],"Show more wallets":"Visa fler pl\xE5nb\xF6cker","Cancel":"Avbryt","Refresh":"Uppdatera","Notifications":"Aviseringar","Settings":"Inst\xE4llningar","Transactions History":"Transaktionshistorik","Connect Wallet":"Anslut pl\xE5nbok","Today":"Idag","Swaps steps":"V\xE4xlar steg","Retry":"F\xF6rs\xF6k igen","Reset":"Reset","There are no notifications.":"Det finns inga meddelanden.","Slippage Error":"Slippage Fel","Slippage Warning":"Slippage Varning","Yours: {amount} {symbol}":["Yours: ",["amount"]," ",["symbol"]],"See All Routes":"Se alla rutter","View more info":"Visa mer information","Gas & Fee Explanation":"F\xF6rklaring av gas & avgift","Details":"Detaljer","Total Payable Fee":"Total betalningskostnad","Hide non-payable fees":"D\xF6lj icke-betalbara avgifter","Show non-payable fees":"Visa icke-betalbara avgifter","Description":"Beskrivning","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"F\xF6ljande avgifter beaktas i transaktionen utg\xE5ng och\\n                beh\xF6ver du inte betala extra gas f\xF6r dem.","Swap input":"Swap input","Estimated output":"Uppskattad utdata","Via:":"Via:","Chains:":"Kedjor:","Sort by":"Sortera efter","Smart Routing":"Smart routing","Lowest Fee":"L\xE4gsta avgift","Fastest Transfer":"Snabbaste \xF6verf\xF6ringen","Maximum Return":"Maximal retur","Maximum Output":"Maximal utdata","Swapping":"Swapping","Gas cost":"Gas kostnad","Receiving":"Tar emot","Price impact":"Pris inverkan","You need to increase slippage to at least {minRequiredSlippage} for this route.":["Du m\xE5ste \xF6ka halkningen till minst ",["minRequiredSlippage"]," f\xF6r denna rutt."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["Vi rekommenderar att du \xF6kar halkningen till minst ",["minRequiredSlippage"]," f\xF6r denna rutt."],"Caution, your slippage is high.":"Varning, din glidning \xE4r h\xF6g.","Change":"\xC4ndra","Change settings":"\xC4ndra inst\xE4llningar","High slippage":"H\xF6g glidning","Low slippage":"L\xE5g glidning"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Varning, din glidning \xE4r h\xF6g (=",["userSlippage"],"). Din handel kan k\xF6ras framifr\xE5n."],"Confirm anyway":"Bekr\xE4fta \xE4nd\xE5","Slippage tolerance per swap":"Slippage tolerans per swap","Custom":"Anpassad","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"Din transaktion kommer att \xE5terst\xE4llas om priset \xE4ndras ogynnsamt med mer \xE4n denna procentsats","Warning":"Varning","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"Denna inst\xE4llning till\xE4mpas per steg (t.ex. 1Inch, Thorchain, etc) vilket inneb\xE4r att endast steget kommer att \xE5terst\xE4llas, inte hela transaktionen.","Swap and Bridge":"V\xE4xla och brygga","Request ID":"Beg\xE4r ID","Not found":"Hittades inte","Swap with request ID = {requestId} not found.":["Byt mot f\xF6rfr\xE5gnings-ID = ",["requestId"]," hittades inte."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["Du har f\xE5tt ",["amount"]," ",["token"]," i ",["conciseAddress"]," pl\xE5nboken p\xE5 ",["chain"]," kedjan."],"Transaction was not sent.":"Transaktionen skickades inte.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," p\xE5 ",["blockchain"]," kvar i din pl\xE5nbok"],"Delete":"Radera","Try again":"F\xF6rs\xF6k igen","View transaction":"Visa transaktion","Connect":"Anslut","Swap Successful":"Byte lyckades","Transaction Failed":"Transaktionen misslyckades","Done":"Klar","Diagnosis":"Diagnos","See Details":"Se detaljer","Cancel Swap":"Avbryt Swap","Are you sure you want to cancel this swap?":"\xC4r du s\xE4ker p\xE5 att du vill avbryta denna swap?","Yes, Cancel it":"Ja, Avbryt det","No, Continue":"Nej, forts\xE4tt","Delete Transaction":"Ta bort transaktion","Are you sure you want to delete this swap?":"\xC4r du s\xE4ker p\xE5 att du vill ta bort denna swap?","Yes, Delete it":"Ja, ta bort den","No, Cancel":"Nej, Avbryt","Change Network":"\xC4ndra n\xE4tverk","Network Changed":"N\xE4tverk \xE4ndrat","Select Token":"V\xE4lj token","Wallet Connected":"Pl\xE5nbok ansluten","Your wallet is connected, you can use it to swap.":"Din pl\xE5nbok \xE4r ansluten, du kan anv\xE4nda den f\xF6r att byta.","Failed to Connect":"Anslutningen misslyckades","Your wallet is not connected. Please try again.":"Din pl\xE5nbok \xE4r inte ansluten. F\xF6rs\xF6k igen.","Connecting to your wallet":"Ansluter till din pl\xE5nbok","Click connect in your wallet popup.":"Klicka p\xE5 anslut i din pl\xE5nbok popup.","Failed Network, Please retry your swap.":"Det gick inte att n\xE4tverka, f\xF6rs\xF6k igen din swap.","Please reset your liquidity sources.":"V\xE4nligen \xE5terst\xE4ll dina likviditetsk\xE4llor.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"Du har begr\xE4nsat likviditetsk\xE4llorna och detta kan leda till att Rango inte hittar n\xE5gra rutter. V\xE4nligen \xF6verv\xE4ga att \xE5terst\xE4lla dina likviditetsk\xE4llor.","No Routes Found.":"Inga rutter hittade.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"Anledningar till varf\xF6r Rango inte kunde hitta en v\xE4g: l\xE5g likviditet p\xE5 token, mycket l\xE5g inmatningsbelopp eller inga rutter tillg\xE4ngliga f\xF6r den valda ing\xE5ng/utmatningskombinationen.","Bridge Limit Error: Please increase your amount.":"Bridgegr\xE4ns fel: \xF6ka ditt belopp.","Bridge Limit Error: Please decrease your amount.":"Brobegr\xE4nsningsfel: V\xE4nligen minska ditt belopp.","High Price Impact":"H\xF6ga priseffekter","Price impact is too high!":"Priseffekten \xE4r f\xF6r h\xF6g!","The price impact is significantly higher than the allowed amount.":"Priseffekten \xE4r betydligt h\xF6gre \xE4n det till\xE5tna beloppet.","Confirm high price impact":"Bekr\xE4fta h\xF6g prisp\xE5verkan","Route updated and price impact is too high, try again later!":"Rutten uppdaterad och priseffekten \xE4r f\xF6r h\xF6g, f\xF6rs\xF6k igen senare!","USD Price Unknown":"USD Pris Ok\xE4nd","USD Price Unknown, Cannot calculate Price Impact.":"USD Pris Ok\xE4nd, Kan inte ber\xE4kna prisp\xE5verkan.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"USD Pris Ok\xE4nd, Kan inte ber\xE4kna prisp\xE5verkan. Prisp\xE5verkan kan vara h\xF6gre \xE4n vanligt. \xC4r du s\xE4ker p\xE5 att forts\xE4tta Swap?","Confirm USD Price Unknown":"Bekr\xE4fta USD pris ok\xE4nt","Swap":"Byt","Swap anyway":"Byt \xE4nd\xE5","The route goes through Ethereum. Continue?":"Rutten g\xE5r genom Ethereum. Forts\xE4tt?","Network Fee":"N\xE4tverksavgift","Protocol Fee":"Protokollets avgift","Affiliate Fee":"Affiliate avgift","Outbound Fee":"Utg\xE5ende avgift","Rango Fee":"Rango avgift","Route has been updated.":"Rutten har uppdaterats.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Utdatabeloppet har \xE4ndrats till ",["newOutputAmount"]," (",["percentageChange"],"% \xE4ndring)."],"Route swappers has been updated.":"Utbytare av rutter har uppdaterats.","Route internal coins has been updated.":"Rutten interna mynt har uppdaterats.","Routes":"Rutter","From":"Fr\xE5n","To":"Till","Light":"Ljus","Dark":"M\xF6rk","Auto":"Automatiskt","Loading failed":"Laddningen misslyckades","Bridges":"Broar","Exchanges":"Byten","Language":"Spr\xE5k","Infinite approval":"O\xE4ndligt godk\xE4nnande","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"Att aktivera O\xE4ndligt godk\xE4nnande ger obegr\xE4nsad \xE5tkomst till smarta kontrakt med DEX/Bridges, vilket ger dem m\xF6jlighet att anv\xE4nda det godk\xE4nda tokenbeloppet utan begr\xE4nsningar.","Theme":"Tema","Confirm Swap":"Bekr\xE4fta byte","Start Swap":"Starta byte","You get":"Du f\xE5r","History":"Historik","Search Transaction":"S\xF6k transaktion","language":"spr\xE5k","Deselect all":"Avmarkera alla","Select all":"Markera alla","Search {sourceType}":["S\xF6k ",["sourceType"]],"Search Blockchain":"S\xF6k blockkedja","Source":"K\xE4lla","Destination":"M\xE5l","Swap {type}":["Byt ",["type"]],"Search Token":"S\xF6k Token","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"F\xF6r n\xE4rvarande \xE4r du i kampanjl\xE4ge med restriktioner f\xF6r likviditetsk\xE4llor. Vill du byta ut det h\xE4r l\xE4get och utnyttja alla tillg\xE4ngliga likviditetsk\xE4llor?","The request ID is necessary to display the swap details.":"Beg\xE4ran ID \xE4r n\xF6dv\xE4ndigt f\xF6r att visa swap detaljer.","Connect Wallets":"Anslut pl\xE5nb\xF6cker","Choose a wallet to connect.":"V\xE4lj en pl\xE5nbok att ansluta.","This week":"Denna vecka","This month":"Denna m\xE5nad","This year":"I \xE5r","Required: >= {min} {symbol}":["Kr\xE4vs: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Kr\xE4vs: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Kr\xE4vs: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Kr\xE4vs: < ",["max"]," ",["symbol"]]," for network fee":" f\xF6r n\xE4tverksavgift"," for swap":" f\xF6r byte"," for input and network fee":" f\xF6r in- och n\xE4tverksavgift","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Beh\xF6vs \u2191 ",["requiredAmount"]," ",["symbol"],["reason"],", men du har ",["currentAmount"]," ",["symbol"]," i din ",["blockchain"]," pl\xE5nbok."],"Waiting for connecting wallet":"V\xE4ntar p\xE5 att ansluta pl\xE5nbok","Waiting for other running tasks to be finished":"V\xE4ntar p\xE5 att andra p\xE5g\xE5ende uppgifter ska vara klara","Waiting for changing wallet network":"V\xE4ntar p\xE5 att byta pl\xE5nboksn\xE4tverk","Sunday":"S\xF6ndag","Monday":"M\xE5ndag","Tuesday":"Tisdag","Wednesday":"Onsdag","Thursday":"Torsdag","Friday":"Fredag","Saturday":"L\xF6rdag","Powered By":"Drivs av","Aggregated Transaction":"Aggregerad transaktion","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Byt p\xE5 ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Bron till ",["toChain"]," via ",["swapper"]],"Failed":"Misslyckades","Completed":"Slutf\xF6rd","In progress":"p\xE5g\xE5r","Waiting for bridge transaction":"V\xE4ntar p\xE5 bryggtransaktion","Connected":"Ansluten","Disconnect":"Koppla fr\xE5n","Install":"Installera","Connecting...":"Ansluter...","Connecting":"Ansluter","Disconnected":"Fr\xE5nkopplad","you need to pass a correct state to Wallet.":"du m\xE5ste skicka ett korrekt tillst\xE5nd till pl\xE5nboken.","Balance":"Saldo","Max":"Max","Token":"Token","Chain":"Kedja"}`,
);
var Zt = JSON.parse(
  `{"Bridge Limit Error":"\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0441\u0442\u0443","Minimum required slippage: {minRequiredSlippage}":["\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0430 \u043D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u0430 \u043F\u043E\u0432\u0437\u0443\u043D\u043A\u0430: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["\u0412\u0430\u0448: ",["userSlippage"]],"Select chain types":"\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0442\u0438\u043F\u0438 \u043B\u0430\u043D\u0446\u044E\u0436\u043A\u0456\u0432","This wallet supports multiple chains. Select which chain you'd like to connect to.":"\u0426\u0435\u0439 \u0433\u0430\u043C\u0430\u043D\u0435\u0446\u044C \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454 \u043A\u0456\u043B\u044C\u043A\u0430 \u043B\u0430\u043D\u0446\u044E\u0436\u043A\u0456\u0432. \u041E\u0431\u0435\u0440\u0456\u0442\u044C, \u0434\u043E \u044F\u043A\u043E\u0433\u043E \u043B\u0430\u043D\u0446\u044E\u0433\u0430 \u0432\u0438 \u0445\u043E\u0442\u0456\u043B\u0438 \u0431 \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0438\u0441\u044F.","Something went wrong":"\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430","Something went wrong. Please refresh the app.":"\u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043E\u043D\u043E\u0432\u0456\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u0443.","No results found":"\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E","Try using different keywords":"\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0456\u043D\u0448\u0456 \u043A\u043B\u044E\u0447\u043E\u0432\u0456 \u0441\u043B\u043E\u0432\u0430","Select Blockchain":"\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D","All":"\u0412\u0441\u0456","More +{count}":["\u0411\u0456\u043B\u044C\u0448\u0435 +",["count"]],"Activate this tab":"\u0410\u043A\u0442\u0438\u0432\u0443\u0432\u0430\u0442\u0438 \u0446\u044E \u0432\u043A\u043B\u0430\u0434\u043A\u0443","Another tab is open and handles transactions.":"\u0406\u043D\u0448\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0430 - \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0456 \u0456 \u043E\u0431\u0440\u043E\u0431\u043A\u0430 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u0439.","Activate current tab":"\u0410\u043A\u0442\u0438\u0432\u0443\u0432\u0430\u0442\u0438 \u043F\u043E\u0442\u043E\u0447\u043D\u0443 \u0432\u043A\u043B\u0430\u0434\u043A\u0443","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"\u0412 \u0434\u0430\u043D\u0438\u0439 \u0447\u0430\u0441 \u0434\u0435\u044F\u043A\u0456 \u043E\u043F\u0435\u0440\u0430\u0446\u0456\u0457 \u0432\u0438\u043A\u043E\u043D\u0443\u044E\u0442\u044C\u0441\u044F \u0456 \u043E\u0431\u0440\u043E\u0431\u043B\u044F\u044E\u0442\u044C\u0441\u044F \u0456\u043D\u0448\u043E\u044E \u0432\u043A\u043B\u0430\u0434\u043A\u043E\u044E \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430. \u042F\u043A\u0449\u043E \u0432\u0438 \u0430\u043A\u0442\u0438\u0432\u0443\u0454\u0442\u0435 \u0446\u044E \u0432\u043A\u043B\u0430\u0434\u043A\u0443, \u0432\u0441\u0456 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u0457, \u0449\u043E \u0432\u0436\u0435 \u0437\u043D\u0430\u0445\u043E\u0434\u044F\u0442\u044C\u0441\u044F \u0432 \u0435\u0442\u0430\u043F\u0456 \u043F\u0456\u0434\u043F\u0438\u0441\u0443 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u0439, \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u044E\u0442\u044C\u0441\u044F.","Confirm":"\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438","Your {blockchainName} wallets":["\u0412\u0430\u0448\u0456 \u0433\u0430\u043C\u0430\u043D\u0446\u0456 ",["blockchainName"]],"Insufficient account balance":"\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043D\u044C\u043E \u0433\u0440\u043E\u0448\u0435\u0439 \u043D\u0430 \u0431\u0430\u043B\u0430\u043D\u0441\u0456","Proceed anyway":"\u0412\u0441\u0435 \u043E\u0434\u043D\u043E","You need to connect a {blockchainName} wallet.":["\u0412\u0438 \u043F\u043E\u0432\u0438\u043D\u043D\u0456 \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0438 ",["blockchainName"]," \u0433\u0430\u043C\u0430\u043D\u0435\u0446\u044C."],"Send to a different address":"\u041D\u0430\u0434\u0441\u0438\u043B\u0430\u0442\u0438 \u043D\u0430 \u0456\u043D\u0448\u0443 \u0430\u0434\u0440\u0435\u0441\u0443","Your destination address":"\u0412\u0430\u0448\u0430 \u0430\u0434\u0440\u0435\u0441\u0430 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F","Address {destination} doesn't match the blockchain address pattern.":["\u0410\u0434\u0440\u0435\u0441\u0430 ",["destination"]," \u043D\u0435 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 \u0430\u0434\u0440\u0435\u0441\u0438 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D."],"Add {chain} chain":["\u0414\u043E\u0434\u0430\u0442\u0438 \u043B\u0430\u043D\u0446\u044E\u0436\u043E\u043A ",["chain"]],"Add {blockchainDisplayName} Chain":["\u0414\u043E\u0434\u0430\u0442\u0438 ",["blockchainDisplayName"]," \u043B\u0430\u043D\u0446\u044E\u0436\u043E\u043A"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["You should connect a ",["blockchainDisplayName"]," supported wallet or choose a different ",["blockchainDisplayName"]," address"],"{blockchainDisplayName} Chain Added":["\u0414\u043E\u0434\u0430\u043D\u043E \u043B\u0430\u043D\u0446\u044E\u0436\u043E\u043A ",["blockchainDisplayName"]],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," \u0434\u043E\u0434\u0430\u0454\u0442\u044C\u0441\u044F \u0434\u043E \u0432\u0430\u0448\u043E\u0433\u043E \u0433\u0430\u043C\u0430\u043D\u0446\u044F, \u0439\u043E\u0433\u043E \u043C\u043E\u0436\u043D\u0430 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u043C\u0456\u043D\u0438."],"Request Rejected":"\u0417\u0430\u043F\u0438\u0442 \u0432\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E","You've rejected adding {blockchainDisplayName} chain to your wallet.":["\u0412\u0438 \u0432\u0456\u0434\u0445\u0438\u043B\u0438\u043B\u0438 \u0434\u043E\u0434\u0430\u0432\u0430\u043D\u043D\u044F ",["blockchainDisplayName"]," \u043B\u0430\u043D\u0446\u044E\u0436\u043A\u0430 \u0434\u043E \u0432\u0430\u0448\u043E\u0433\u043E \u0433\u0430\u043C\u0430\u043D\u0446\u044F."],"Show more wallets":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435 \u0433\u0430\u043C\u0430\u043D\u0446\u0456\u0432","Cancel":"\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438","Refresh":"\u041E\u043D\u043E\u0432\u0438\u0442\u0438","Notifications":"\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F","Settings":"\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F","Transactions History":"\u0406\u0441\u0442\u043E\u0440\u0456\u044F \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u0439","Connect Wallet":"\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0456\u0442\u044C Wallet","Today":"\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456","Swaps steps":"\u041A\u0440\u043E\u043A\u0438 \u0437\u043C\u0456\u043D\u0438","Retry":"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443","Reset":"Reset","There are no notifications.":"\u041D\u0435\u043C\u0430\u0454 \u0441\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u044C.","Slippage Error":"\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u043E\u043A\u0440\u0443\u0447\u0443\u0432\u0430\u043D\u043D\u044F","Slippage Warning":"\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0440\u043E Slippage","Yours: {amount} {symbol}":["\u0412\u0430\u0448: ",["amount"]," ",["symbol"]],"See All Routes":"\u041F\u043E\u0431\u0430\u0447\u0438\u0442\u0438 \u0432\u0441\u0456 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0438","View more info":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435","Gas & Fee Explanation":"\u0413\u0430\u0437 \u0456 \u043A\u043E\u043C\u0456\u0441\u0456\u044F","Details":"\u041F\u043E\u0434\u0440\u043E\u0431\u0438\u0446\u0456","Total Payable Fee":"\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0441\u0443\u043C\u0430 \u0432\u0438\u043F\u043B\u0430\u0442","Hide non-payable fees":"\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438 \u043D\u0435\u043E\u043F\u043B\u0430\u0447\u0435\u043D\u0456 \u043F\u043B\u0430\u0442\u0435\u0436\u0456","Show non-payable fees":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u043F\u043B\u0430\u0442\u043D\u0456 \u043F\u043B\u0430\u0442\u0435\u0436\u0456","Description":"\u041E\u043F\u0438\u0441","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.","Swap input":"Swap input","Estimated output":"\u0420\u043E\u0437\u0440\u0430\u0445\u0443\u043D\u043A\u043E\u0432\u0438\u0439 \u0432\u0438\u0445\u0456\u0434","Via:":"\u0427\u0435\u0440\u0435\u0437:","Chains:":"\u041B\u0430\u043D\u0446\u044E\u0433\u0438:","Sort by":"\u0421\u043E\u0440\u0442\u0443\u0432\u0430\u0442\u0438 \u0437\u0430","Smart Routing":"\u0420\u043E\u0437\u0443\u043C\u043D\u0430 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0438\u0437\u0430\u0446\u0456\u044F","Lowest Fee":"\u041D\u0430\u0439\u043D\u0438\u0436\u0447\u0430 \u043A\u043E\u043C\u0456\u0441\u0456\u044F","Fastest Transfer":"\u041D\u0430\u0439\u0448\u0432\u0438\u0434\u0448\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0430","Maximum Return":"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0435 \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F","Maximum Output":"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0432\u0438\u0445\u0456\u0434","Swapping":"Swapping","Gas cost":"\u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u0433\u0430\u0437\u0443","Receiving":"\u041E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F","Price impact":"\u0412\u043F\u043B\u0438\u0432 \u0446\u0456\u043D\u0438","You need to increase slippage to at least {minRequiredSlippage} for this route.":["\u0412\u0430\u043C \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0437\u0431\u0456\u043B\u044C\u0448\u0438\u0442\u0438 \u0441\u043B\u0430\u0439\u0434 \u043F\u0440\u0438\u043D\u0430\u0439\u043C\u043D\u0456 ",["minRequiredSlippage"]," \u0434\u043B\u044F \u0446\u044C\u043E\u0433\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0443."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["\u041C\u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0454\u043C\u043E \u0432\u0430\u043C \u0437\u0431\u0456\u043B\u044C\u0448\u0438\u0442\u0438 \u0441\u043B\u0430\u0439\u0434 \u043F\u0440\u0438\u043D\u0430\u0439\u043C\u043D\u0456 ",["minRequiredSlippage"]," \u0434\u043B\u044F \u0446\u044C\u043E\u0433\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0443."],"Caution, your slippage is high.":"\u041E\u0431\u0435\u0440\u0435\u0436\u043D\u043E, \u0442\u0432\u043E\u044F \u0441\u0445\u043E\u0432\u0430\u043D\u043A\u0430 \u0432\u0438\u0441\u043E\u043A\u0430.","Change":"\u0417\u043C\u0456\u043D\u0438\u0442\u0438","Change settings":"\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0438","High slippage":"\u0412\u0438\u0441\u043E\u043A\u0430 \u0441\u043B\u0438\u0437\u044C\u043A\u0430","Low slippage":"\u041D\u0438\u0437\u044C\u043A\u0430 \u0437\u0430\u043B\u0438\u0432\u043A\u0430"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" \u041E\u0431\u0435\u0440\u0435\u0436\u043D\u043E, \u0432\u0430\u0448 \u0441\u043B\u0430\u0439\u0434 \u0432\u0438\u0441\u043E\u043A\u0438\u0439 (=",["userSlippage"],"). \u0412\u0430\u0448\u0430 \u0442\u043E\u0440\u0433\u0456\u0432\u043B\u044F \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430."],"Confirm anyway":"\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0432\u0441\u0435 \u043E\u0434\u043D\u043E","Slippage tolerance per swap":"\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0456\u0441\u0442\u044C \u0441\u043F\u0443\u0441\u043A\u0443 \u043D\u0430 \u0441\u0432\u043E\u043F","Custom":"\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0446\u044C\u043A\u0430","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"\u0412\u0430\u0448\u0443 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u044E \u0431\u0443\u0434\u0435 \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u043E, \u044F\u043A\u0449\u043E \u0446\u044F \u0446\u0456\u043D\u0430 \u0437\u043C\u0456\u043D\u0438\u0442\u044C\u0441\u044F \u0431\u0456\u043B\u044C\u0448 \u043D\u0456\u0436 \u043D\u0430 \u0446\u0435\u0439 \u0432\u0456\u0434\u0441\u043E\u0442\u043E\u043A","Warning":"\u0417\u0430\u0441\u0442\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"\u0426\u0435\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0437\u0430\u0441\u0442\u043E\u0441\u043E\u0432\u0430\u043D\u043E \u043D\u0430 \u043A\u0440\u043E\u043A (\u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, 1 \u0434\u044E\u0439\u043C, \u0422\u043E\u0440\u0447\u0435\u0439\u043D \u0456 \u0442.\u0434). \u0426\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u0454, \u0449\u043E \u0431\u0443\u0434\u0435 \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u043E \u043B\u0438\u0448\u0435 \u043A\u0440\u043E\u043A, \u0430 \u043D\u0435 \u0432\u0441\u044F \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u044F.","Swap and Bridge":"\u041F\u043E\u043C\u0456\u043D\u044F\u0442\u0438 \u043C\u0456\u0441\u0446\u044F\u043C\u0438 \u0456 \u043C\u0456\u0441\u0442","Request ID":"\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043F\u0438\u0442\u0443","Not found":"\u041D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E","Swap with request ID = {requestId} not found.":["\u0421\u0432\u043E\u043F \u0437 RequestID = ",["requestId"]," \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["\u0412\u0438 \u043E\u0442\u0440\u0438\u043C\u0430\u043B\u0438 ",["amount"]," ",["token"]," \u0432 \u0433\u0430\u043C\u0430\u043D\u0446\u0456 ",["conciseAddress"]," \u043D\u0430 ",["chain"]," \u043B\u0430\u043D\u0446\u044E\u0436\u043A\u0443."],"Transaction was not sent.":"\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u044E \u043D\u0435 \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u043D\u043E.","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," \u043D\u0430 ",["blockchain"]," \u0437\u0430\u043B\u0438\u0448\u0430\u044E\u0442\u044C\u0441\u044F \u0432 \u0432\u0430\u0448\u043E\u043C\u0443 \u0433\u0430\u043C\u0430\u043D\u0446\u0456"],"Delete":"\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438","Try again":"\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437","View transaction":"\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0456\u044E","Connect":"\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0438\u0441\u044F","Swap Successful":"\u0417\u043C\u0456\u043D\u0430 \u0443\u0441\u043F\u0456\u0448\u043D\u0430","Transaction Failed":"\u041D\u0435\u0432\u0434\u0430\u043B\u0430 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u044F","Done":"\u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E","Diagnosis":"\u0414\u0456\u0430\u0433\u043D\u043E\u0437","See Details":"\u0414\u0438\u0432. \u0434\u043E\u043A\u043B\u0430\u0434\u043D\u0456\u0448\u0435","Cancel Swap":"\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438 \u0437\u043C\u0456\u043D\u0438","Are you sure you want to cancel this swap?":"\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438 \u0446\u0435 \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F?","Yes, Cancel it":"\u0422\u0430\u043A, \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438","No, Continue":"\u041D\u0456, \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438","Delete Transaction":"\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u044E","Are you sure you want to delete this swap?":"\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0431\u0430\u0436\u0430\u0454\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u0435 \u043F\u0435\u0440\u0435\u043C\u0456\u0449\u0435\u043D\u043D\u044F?","Yes, Delete it":"\u0422\u0430\u043A, \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0439\u043E\u0433\u043E","No, Cancel":"\u041D\u0456, \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438","Change Network":"\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043C\u0435\u0440\u0435\u0436\u0443","Network Changed":"\u041C\u0435\u0440\u0435\u0436\u0430 \u0437\u043C\u0456\u043D\u0435\u043D\u0430","Select Token":"\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0442\u043E\u043A\u0435\u043D","Wallet Connected":"\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0433\u0430\u043C\u0430\u043D\u0435\u0446\u044C","Your wallet is connected, you can use it to swap.":"\u0412\u0430\u0448 \u0433\u0430\u043C\u0430\u043D\u0435\u0446\u044C \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439, \u0432\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0439\u043E\u0433\u043E \u0434\u043B\u044F \u043E\u0431\u043C\u0456\u043D\u0443.","Failed to Connect":"\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437'\u0454\u0434\u043D\u0430\u0442\u0438\u0441\u044F","Your wallet is not connected. Please try again.":"\u0412\u0430\u0448 \u0433\u0430\u043C\u0430\u043D\u0435\u0446\u044C \u043D\u0435 \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.","Connecting to your wallet":"\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044F \u0434\u043E \u0432\u0430\u0448\u043E\u0433\u043E \u0433\u0430\u043C\u0430\u043D\u0446\u044F","Click connect in your wallet popup.":"\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0438\u0441\u044F \u0432 \u0441\u043F\u043B\u0438\u0432\u0430\u044E\u0447\u043E\u043C\u0443 \u0432\u0456\u043A\u043D\u0456 \u0432\u0430\u0448\u043E\u0433\u043E \u0433\u0430\u043C\u0430\u043D\u0446\u044F.","Failed Network, Please retry your swap.":"\u041D\u0435\u0432\u0434\u0430\u043B\u0430 \u043C\u0435\u0440\u0435\u0436\u0430, \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u0441\u0432\u043E\u043F.","Please reset your liquidity sources.":"\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0441\u043A\u0438\u043D\u044C\u0442\u0435 \u0432\u0430\u0448\u0456 \u0434\u0436\u0435\u0440\u0435\u043B\u0430 \u043B\u0456\u043A\u0432\u0456\u0434\u043D\u043E\u0441\u0442\u0456.","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"\u0412\u0438 \u043E\u0431\u043C\u0435\u0436\u0438\u043B\u0438 \u0434\u0436\u0435\u0440\u0435\u043B\u0430 \u043B\u0456\u043A\u0432\u0456\u0434\u043D\u043E\u0441\u0442\u0456, \u0456 \u0446\u0435 \u043C\u043E\u0436\u0435 \u043F\u0440\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u0434\u043E \u0442\u043E\u0433\u043E, \u0449\u043E \u0420\u0430\u043D\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0456\u0432. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043F\u043E\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043F\u0440\u043E \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u0434\u0436\u0435\u0440\u0435\u043B\u0430 \u043B\u0456\u043A\u0432\u0456\u0434\u043D\u043E\u0441\u0442\u0456.","No Routes Found.":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u0438 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E.","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"\u041F\u0440\u0438\u0447\u0438\u043D\u0430, \u0447\u043E\u043C\u0443 \u0420\u0430\u043D\u0433\u043E \u043D\u0435 \u0437\u043C\u0456\u0433 \u0437\u043D\u0430\u0439\u0442\u0438 \u043C\u0430\u0440\u0448\u0440\u0443\u0442: \u043D\u0438\u0437\u044C\u043A\u0430 \u043B\u0456\u043A\u0432\u0456\u0434\u043D\u0456\u0441\u0442\u044C, \u0434\u0443\u0436\u0435 \u043C\u0430\u043B\u0430 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0432\u0445\u0456\u0434\u043D\u0438\u0445 \u0434\u0430\u043D\u0438\u0445 \u0430\u0431\u043E \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0441\u0442\u044C \u043A\u043E\u043C\u0431\u0456\u043D\u0430\u0446\u0456\u0457 \u0442\u043E\u043A\u0435\u043D\u0443 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044F/\u0432\u0438\u0445\u0456\u0434\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0443.","Bridge Limit Error: Please increase your amount.":"\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0441\u0442\u0443. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0437\u0431\u0456\u043B\u044C\u0448\u0456\u0442\u044C \u0441\u0443\u043C\u0443.","Bridge Limit Error: Please decrease your amount.":"\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0441\u0442\u0443: \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0437\u043C\u0435\u043D\u0448\u0442\u0435 \u0441\u0443\u043C\u0443.","High Price Impact":"\u0412\u0438\u0441\u043E\u043A\u0438\u0439 \u0432\u043F\u043B\u0438\u0432 \u043D\u0430 \u0446\u0456\u043D\u0443","Price impact is too high!":"\u0422\u0430\u0440\u0438\u0444\u043D\u0438\u0439 \u0432\u043F\u043B\u0438\u0432 \u043D\u0430\u0434\u0442\u043E \u0432\u0438\u0441\u043E\u043A\u0438\u0439!","The price impact is significantly higher than the allowed amount.":"\u0412\u043F\u043B\u0438\u0432 \u0446\u0456\u043D \u0437\u043D\u0430\u0447\u043D\u043E \u0432\u0438\u0449\u0438\u0439, \u043D\u0456\u0436 \u0434\u043E\u0437\u0432\u043E\u043B\u0435\u043D\u0430 \u0441\u0443\u043C\u0430.","Confirm high price impact":"\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0432\u0438\u0441\u043E\u043A\u0438\u0439 \u0446\u0456\u043D\u043E\u0432\u0438\u0439 \u0432\u043F\u043B\u0438\u0432","Route updated and price impact is too high, try again later!":"\u0417\u043C\u0456\u043D\u0430 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0443 \u0456 \u0432\u043F\u043B\u0438\u0432 \u0446\u0456\u043D\u0438 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0438\u0441\u043E\u043A\u0438\u0439, \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u0456\u0437\u043D\u0456\u0448\u0435!","USD Price Unknown":"USD \u0446\u0456\u043D\u0430 \u043D\u0435\u0432\u0456\u0434\u043E\u043C\u0430","USD Price Unknown, Cannot calculate Price Impact.":"\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0430 \u0446\u0456\u043D\u0430 USD \u043D\u0435 \u043C\u043E\u0436\u0435 \u043E\u0431\u0447\u0438\u0441\u043B\u0438\u0442\u0438 \u0432\u043F\u043B\u0438\u0432 \u0446\u0456\u043D\u0438.","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"\u0426\u0456\u043D\u0430 \u0421\u0428\u0410 \u043D\u0435 \u0432\u0456\u0434\u043E\u043C\u0430, \u043D\u0435\u043C\u043E\u0436\u043B\u0438\u0432\u043E \u0440\u043E\u0437\u0440\u0430\u0445\u0443\u0432\u0430\u0442\u0438 \u0432\u043F\u043B\u0438\u0432 \u0446\u0456\u043D\u0438. \u0412\u043F\u043B\u0438\u0432 \u0446\u0456\u043D\u0438 \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u0432\u0438\u0449\u0438\u043C, \u043D\u0456\u0436 \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439. \u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438 \u043F\u043B\u0430\u0432\u0430\u043D\u043D\u044F?","Confirm USD Price Unknown":"\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0456\u0442\u044C \u043D\u0435\u0432\u0456\u0434\u043E\u043C\u0443 \u0446\u0456\u043D\u0443 USD","Swap":"\u041F\u043E\u043C\u0456\u043D\u044F\u0442\u0438","Swap anyway":"\u041F\u043E\u043C\u0456\u043D\u044F\u0442\u0438 \u043C\u0456\u0441\u0446\u044F\u043C\u0438 \u0432\u0441\u0435 \u043E\u0434\u043D\u043E","The route goes through Ethereum. Continue?":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 Ethereum. \u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438?","Network Fee":"\u041A\u043E\u043C\u0456\u0441\u0456\u044F \u0437\u0430 \u043C\u0435\u0440\u0435\u0436\u0443","Protocol Fee":"\u041A\u043E\u043C\u0456\u0441\u0456\u044F \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443","Affiliate Fee":"\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u044C\u043A\u0430 \u043A\u043E\u043C\u0456\u0441\u0456\u044F","Outbound Fee":"\u0412\u0438\u0445\u0456\u0434\u043D\u0438\u0439 \u043F\u043B\u0430\u0442\u0456\u0436","Rango Fee":"\u041F\u043B\u0430\u0442\u0430 \u0437\u0430 \u0440\u0430\u043D\u0433\u043E","Route has been updated.":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u0431\u0443\u043B\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E.","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["\u0421\u0443\u043C\u0430 \u0432\u0438\u0432\u043E\u0434\u0443 \u0437\u043C\u0456\u043D\u0435\u043D\u0430 \u043D\u0430 ",["newOutputAmount"]," (",["percentageChange"],"% \u0437\u043C\u0456\u043D\u0438)."],"Route swappers has been updated.":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u043D\u0456 \u0437\u0430\u043C\u0456\u043D\u0438 \u0431\u0443\u043B\u0438 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u0456.","Route internal coins has been updated.":"\u0420\u0435\u0439\u0441 \u0432\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u0456\u0445 \u043C\u043E\u043D\u0435\u0442 \u0431\u0443\u0432 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439.","Routes":"\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u0438","From":"\u0412\u0456\u0434","To":"\u041D\u0430","Light":"\u0421\u0432\u0456\u0442\u043B\u0430","Dark":"\u0422\u0435\u043C\u043D\u0430","Auto":"\u0410\u0432\u0442\u043E","Loading failed":"\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F","Bridges":"\u0411\u0440\u0456\u0434\u0436\u0435\u0441","Exchanges":"\u041E\u0431\u043C\u0456\u043D \u0432\u0430\u043B\u044E\u0442","Language":"\u041C\u043E\u0432\u0430:","Infinite approval":"\u041D\u0435\u0441\u043A\u0456\u043D\u0447\u0435\u043D\u043D\u0435 \u0437\u0430\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"\u0423\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u043D\u044F \u0440\u0435\u0436\u0438\u043C\u0443 \xAB\u041D\u0435\u0441\u043A\u0456\u043D\u0447\u0435\u043D\u043D\u043E\u0433\u043E \u0437\u0430\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F\xBB \u043D\u0430\u0434\u0430\u0454 \u043D\u0435\u043E\u0431\u043C\u0435\u0436\u0435\u043D\u0438\u0439 \u0434\u043E\u0441\u0442\u0443\u043F \u0434\u043E \u0440\u043E\u0437\u0443\u043C\u043D\u0438\u0445 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0456\u0432 DEXes/Bridgs, \u0449\u043E \u0434\u043E\u0437\u0432\u043E\u043B\u044F\u0454 \u0457\u043C \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0437\u0430\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u0443 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0442\u043E\u043A\u0435\u043D\u0456\u0432 \u0431\u0435\u0437 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u044C.","Theme":"\u0422\u0435\u043C\u0430","Confirm Swap":"\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0441\u0432\u043E\u043F","Start Swap":"\u041F\u043E\u0447\u0430\u0442\u0438 \u043F\u043E\u043C\u0456\u043D\u044F\u0442\u0438","You get":"\u0412\u0438 \u043E\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u0435","History":"\u0406\u0441\u0442\u043E\u0440\u0456\u044F","Search Transaction":"\u041F\u043E\u0448\u0443\u043A \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u0457","language":"\u043C\u043E\u0432\u0430","Deselect all":"\u0417\u043D\u044F\u0442\u0438 \u0432\u0441\u0456 \u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043D\u044F","Select all":"\u0412\u0438\u0434\u0456\u043B\u0438\u0442\u0438 \u0432\u0441\u0435","Search {sourceType}":["\u0428\u0443\u043A\u0430\u0442\u0438 ",["sourceType"]],"Search Blockchain":"\u041F\u043E\u0448\u0443\u043A \u0432 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0456","Source":"\u0414\u0436\u0435\u0440\u0435\u043B\u043E","Destination":"\u041F\u0443\u043D\u043A\u0442 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F","Swap {type}":["\u041F\u043E\u043C\u0456\u043D\u044F\u0442\u0438 ",["type"]],"Search Token":"\u041F\u043E\u0448\u0443\u043A \u043C\u0430\u0440\u043A\u0435\u0440","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"\u0412 \u0434\u0430\u043D\u0438\u0439 \u0447\u0430\u0441 \u0432\u0438 \u0432 \u0440\u0435\u0436\u0438\u043C\u0456 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0457 \u0437 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F\u043C\u0438 \u0434\u0436\u0435\u0440\u0435\u043B \u043B\u0456\u043A\u0432\u0456\u0434\u043D\u043E\u0441\u0442\u0456. \u0412\u0438 \u0445\u043E\u0442\u0456\u043B\u0438 \u0431 \u0432\u0438\u0439\u0442\u0438 \u0437 \u0446\u044C\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0443 \u0456 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0442\u0438 \u0432\u0441\u0456 \u043D\u0430\u044F\u0432\u043D\u0456 \u0434\u0436\u0435\u0440\u0435\u043B\u0430 \u043B\u0456\u043A\u0432\u0456\u0434\u043D\u043E\u0441\u0442\u0456?","The request ID is necessary to display the swap details.":"\u0406\u0434\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043F\u0438\u0442\u0443 \u043D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u0438\u0439 \u0434\u043B\u044F \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439 \u0441\u0432\u043E\u043F.","Connect Wallets":"\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044F \u0433\u0430\u043C\u0430\u043D\u0446\u0456\u0432","Choose a wallet to connect.":"\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0433\u0430\u043C\u0430\u043D\u0435\u0446\u044C \u0434\u043B\u044F \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044F.","This week":"\u0426\u044C\u043E\u0433\u043E \u0442\u0438\u0436\u043D\u044F","This month":"\u0426\u044C\u043E\u0433\u043E \u043C\u0456\u0441\u044F\u0446\u044F","This year":"\u0426\u044C\u043E\u0433\u043E \u0440\u043E\u043A\u0443","Required: >= {min} {symbol}":["\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E: < ",["max"]," ",["symbol"]]," for network fee":" \u0437\u0430 \u0437\u0431\u0456\u0440 \u043C\u0435\u0440\u0435\u0436\u0456"," for swap":" \u0434\u043B\u044F \u0441\u0432\u043E\u043F\u0430"," for input and network fee":" \u0437\u0430 \u0432\u0445\u0456\u0434\u043D\u0438\u0439 \u0442\u0430 \u043C\u0435\u0440\u0435\u0436\u0435\u0432\u0438\u0439 \u0437\u0431\u0456\u0440","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u0438\u0439 TrueCon ",["requiredAmount"]," ",["symbol"],["reason"],", \u0430\u043B\u0435 \u0432\u0438 \u043C\u0430\u0454\u0442\u0435 ",["currentAmount"]," ",["symbol"]," \u0432 \u0433\u0430\u043C\u0430\u043D\u0446\u0456 ",["blockchain"],"."],"Waiting for connecting wallet":"\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044F \u0433\u0430\u043C\u0430\u043D\u0446\u044F","Waiting for other running tasks to be finished":"\u041E\u0447\u0456\u043A\u0443\u0454\u043C\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F \u0456\u043D\u0448\u0438\u0445 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0438\u0445 \u0437\u0430\u0434\u0430\u0447","Waiting for changing wallet network":"\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0438 \u043C\u0435\u0440\u0435\u0436\u0456 \u0433\u0430\u043C\u0430\u043D\u0446\u044F","Sunday":"\u041D\u0435\u0434\u0456\u043B\u044F","Monday":"\u041F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A","Tuesday":"\u0412\u0456\u0432\u0442\u043E\u0440\u043E\u043A","Wednesday":"\u0421\u0435\u0440\u0435\u0434\u0430","Thursday":"\u0427\u0435\u0442\u0432\u0435\u0440","Friday":"\u041F'\u044F\u0442\u043D\u0438\u0446\u044F","Saturday":"\u0421\u0443\u0431\u043E\u0442\u0430","Powered By":"\u041D\u0430\u0434\u0430\u043D\u043E","Aggregated Transaction":"\u0421\u0443\u043A\u0443\u043F\u043D\u0430 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0456\u044F","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["\u041F\u043E\u043C\u0456\u043D\u044F\u0442\u0438 \u043D\u0430 ",["fromChain"]," \u0447\u0435\u0440\u0435\u0437 ",["swapper"]],"Bridge to {toChain} via {swapper}":["\u041C\u0456\u0441\u0442 \u0434\u043E ",["toChain"]," \u0447\u0435\u0440\u0435\u0437 ",["swapper"]],"Failed":"\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F","Completed":"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0456","In progress":"\u041E\u0431\u0440\u043E\u0431\u043A\u0430","Waiting for bridge transaction":"\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0456\u0457 \u0437 \u043C\u043E\u0441\u0442\u043E\u043C","Connected":"\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E","Disconnect":"\u0412\u0456\u0434'\u0454\u0434\u043D\u0430\u0442\u0438\u0441\u044C","Install":"\u0406\u043D\u0441\u0442\u0430\u043B\u044E\u0432\u0430\u0442\u0438","Connecting...":"\u0417\u2019\u0454\u0434\u043D\u0430\u043D\u043D\u044F...","Connecting":"\u0417\u2019\u0454\u0434\u043D\u0430\u043D\u043D\u044F","Disconnected":"\u0412\u0456\u0434\u2019\u0454\u0434\u043D\u0430\u043D\u043E","you need to pass a correct state to Wallet.":"\u0432\u0438 \u043C\u0430\u0454\u0442\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0441\u0442\u0430\u043D \u0434\u043E Wallet.","Balance":"\u0411\u0430\u043B\u0430\u043D\u0441","Max":"\u041C\u0430\u043A\u0441","Token":"\u041C\u0430\u0440\u043A\u0435\u0440","Chain":"\u041B\u0430\u043D\u0446\u044E\u0433"}`,
);
var qt = JSON.parse(
  `{"Bridge Limit Error":"\u6865\u63A5\u9650\u5236\u9519\u8BEF","Minimum required slippage: {minRequiredSlippage}":["Minimum required slippage: ",["minRequiredSlippage"]],"Yours: {userSlippage}":["Yours: ",["userSlippage"]],"Select chain types":"\u9009\u62E9\u94FE\u7C7B\u578B","This wallet supports multiple chains. Select which chain you'd like to connect to.":"\u8FD9\u4E2A\u94B1\u5305\u652F\u6301\u591A\u4E2A\u94FE\u3002\u9009\u62E9\u4F60\u60F3\u8981\u8FDE\u63A5\u7684\u94FE\u3002","Something went wrong":"\u51FA\u4E86\u9519\u3002","Something went wrong. Please refresh the app.":"\u51FA\u9519\u4E86\u3002\u8BF7\u5237\u65B0\u5E94\u7528\u7A0B\u5E8F\u3002","No results found":"\u672A\u627E\u5230\u7ED3\u679C","Try using different keywords":"\u5C1D\u8BD5\u4F7F\u7528\u4E0D\u540C\u7684\u5173\u952E\u5B57","Select Blockchain":"\u9009\u62E9Blockchain","All":"\u6240\u6709\u7684","More +{count}":["More +",["count"]],"Activate this tab":"\u6FC0\u6D3B\u6B64\u6807\u7B7E","Another tab is open and handles transactions.":"\u53E6\u4E00\u4E2A\u6807\u7B7E\u662F\u6253\u5F00\u548C\u5904\u7406\u4EA4\u6613\u3002","Activate current tab":"\u6FC0\u6D3B\u5F53\u524D\u6807\u7B7E","Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire.":"\u76EE\u524D\uFF0C\u6709\u4E9B\u4EA4\u6613\u6B63\u5728\u8FD0\u884C\uFF0C\u6B63\u5728\u7531\u5176\u4ED6\u6D4F\u89C8\u5668\u9009\u9879\u5361\u5904\u7406\u3002 \u5982\u679C\u60A8\u6FC0\u6D3B\u6B64\u6807\u7B7E\uFF0C\u6240\u6709\u5DF2\u7ECF\u5728\u4EA4\u6613\u7B7E\u540D\u6B65\u9AA4\u4E2D\u7684\u4EA4\u6613\u90FD\u5C06\u8FC7\u671F\u3002","Confirm":"\u786E\u8BA4","Your {blockchainName} wallets":["Your ",["blockchainName"]," wallets"],"Insufficient account balance":"\u8D26\u6237\u4F59\u989D\u4E0D\u8DB3","Proceed anyway":"\u4ECD\u7136\u7EE7\u7EED","You need to connect a {blockchainName} wallet.":["You need to connect a ",["blockchainName"]," wallet."],"Send to a different address":"\u53D1\u9001\u5230\u53E6\u4E00\u4E2A\u5730\u5740","Your destination address":"\u60A8\u7684\u76EE\u7684\u5730\u5740","Address {destination} doesn't match the blockchain address pattern.":["Address ",["destination"]," doesn't match the blockchain address pattern."],"Add {chain} chain":["Add ",["chain"]," chain"],"Add {blockchainDisplayName} Chain":["Add ",["blockchainDisplayName"]," Chain"],"You should connect a {blockchainDisplayName} supported wallet or choose a different {blockchainDisplayName} address":["You should connect a ",["blockchainDisplayName"]," supported wallet or choose a different ",["blockchainDisplayName"]," address"],"{blockchainDisplayName} Chain Added":[["blockchainDisplayName"]," Chain Added"],"{blockchainDisplayName} is added to your wallet, you can use it to swap.":[["blockchainDisplayName"]," is added to your wallet, you can use it to swap."],"Request Rejected":"\u8BF7\u6C42\u88AB\u62D2\u7EDD","You've rejected adding {blockchainDisplayName} chain to your wallet.":["You've rejected adding ",["blockchainDisplayName"]," chain to your wallet."],"Show more wallets":"\u663E\u793A\u66F4\u591A\u94B1\u5305","Cancel":"\u53D6\u6D88","Refresh":"\u5237\u65B0","Notifications":"\u901A\u77E5","Settings":"\u8BBE\u7F6E","Transactions History":"\u4EA4\u6613\u5386\u53F2","Connect Wallet":"\u8FDE\u63A5\u94B1\u5305","Today":"\u4ECA\u65E5\uFF1A","Swaps steps":"\u4E92\u6362\u6B65\u9AA4","Retry":"\u91CD\u8BD5","Reset":"Reset","There are no notifications.":"\u6CA1\u6709\u901A\u77E5\u3002","Slippage Error":"\u7FFB\u8F6C\u9519\u8BEF","Slippage Warning":"\u7FFB\u8F6C\u8B66\u544A","Yours: {amount} {symbol}":["Yours: ",["amount"]," ",["symbol"]],"See All Routes":"\u67E5\u770B\u6240\u6709\u8DEF\u7531","View more info":"\u67E5\u770B\u66F4\u591A\u4FE1\u606F","Gas & Fee Explanation":"\u6C14\u4F53\u548C\u8D39\u7528\u89E3\u91CA","Details":"\u8BE6\u7EC6\u4FE1\u606F","Total Payable Fee":"\u5E94\u652F\u4ED8\u8D39\u7528\u603B\u989D","Hide non-payable fees":"\u9690\u85CF\u975E\u652F\u4ED8\u8D39\u7528","Show non-payable fees":"\u663E\u793A\u975E\u5E94\u652F\u4ED8\u8D39\u7528","Description":"\u63CF\u8FF0","The following fees are considered in the transaction output and\\n                you won\u2019t need to pay extra gas for them.":"\u5728\u4EA4\u6613\u8F93\u51FA\u4E2D\u8003\u8651\u5230\u4EE5\u4E0B\u8D39\u7528\u548C\\n                \u60A8\u5C06\u4E0D\u9700\u8981\u652F\u4ED8\u989D\u5916\u7684\u6C14\u4F53\u3002","Swap input":"Swap input","Estimated output":"\u4F30\u8BA1\u8F93\u51FA","Via:":"Via\uFF1A","Chains:":"\u94FE\uFF1A","Sort by":"\u6392\u5E8F\u65B9\u5F0F","Smart Routing":"\u667A\u80FD\u8DEF\u7531","Lowest Fee":"\u6700\u4F4E\u8D39\u7528","Fastest Transfer":"\u6700\u5FEB\u7684\u4F20\u8F93","Maximum Return":"\u6700\u5927\u8FD4\u56DE","Maximum Output":"\u6700\u5927\u8F93\u51FA","Swapping":"Swapping","Gas cost":"\u7164\u6C14\u6210\u672C","Receiving":"\u63A5\u6536\u4E2D","Price impact":"\u4EF7\u683C\u5F71\u54CD","You need to increase slippage to at least {minRequiredSlippage} for this route.":["You need to increase slippage to at least ",["minRequiredSlippage"]," for this route."],"We recommend you to increase slippage to at least {minRequiredSlippage} for this route.":["We recommend you to increase slippage to at least ",["minRequiredSlippage"]," for this route."],"Caution, your slippage is high.":"\u6CE8\u610F\u529B\uFF0C\u60A8\u7684\u5E7B\u706F\u7247\u5F88\u9AD8\u3002","Change":"\u66F4\u6539","Change settings":"\u66F4\u6539\u8BBE\u7F6E","High slippage":"\u9AD8\u6ED1\u5757","Low slippage":"\u4F4E\u6ED1\u5757"," Caution, your slippage is high (={userSlippage}). Your trade may be front run.":[" Caution, your slippage is high (=",["userSlippage"],"). Your trade may be front run."],"Confirm anyway":"\u4ECD\u7136\u786E\u8BA4","Slippage tolerance per swap":"\u6BCF\u6B21\u4EA4\u6362\u65F6\u7FFB\u9875\u8303\u56F4","Custom":"\u81EA\u5B9A\u4E49","Your transaction will be reverted if the price changes unfavorably by more than this percentage":"\u5982\u679C\u4EF7\u683C\u53D8\u5316\u8D85\u8FC7\u6B64\u767E\u5206\u6BD4\uFF0C\u60A8\u7684\u4EA4\u6613\u5C06\u88AB\u8FD8\u539F\u3002","Warning":"\u8B66\u544A","This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction.":"\u6B64\u8BBE\u7F6E\u662F\u6BCF\u4E00\u6B65(\u4F8B\u59821Inch\u3001Thorchain\u7B49)\u5E94\u7528\u7684\uFF0C\u8FD9\u53EA\u610F\u5473\u7740\u8BE5\u6B65\u9AA4\u5C06\u88AB\u8FD8\u539F\uFF0C\u800C\u4E0D\u662F\u6574\u4E2A\u4EA4\u6613\u3002","Swap and Bridge":"\u4EA4\u6362\u6865\u63A5","Request ID":"\u8BF7\u6C42ID","Not found":"\u627E\u4E0D\u5230","Swap with request ID = {requestId} not found.":["Swap with request ID = ",["requestId"]," not found."],"You have received {amount} {token} in {conciseAddress} wallet on {chain} chain.":["You have received ",["amount"]," ",["token"]," in ",["conciseAddress"]," wallet on ",["chain"]," chain."],"Transaction was not sent.":"\u4EA4\u6613\u672A\u53D1\u9001\u3002","{amount} {symbol} on {blockchain} remain in your wallet":[["amount"]," ",["symbol"]," on ",["blockchain"]," remain in your wallet"],"Delete":"\u5220\u9664","Try again":"\u518D\u8BD5\u4E00\u6B21","View transaction":"\u67E5\u770B\u4EA4\u6613","Connect":"\u8FDE\u63A5","Swap Successful":"\u4EA4\u6362\u6210\u529F","Transaction Failed":"\u4EA4\u6613\u5931\u8D25","Done":"\u5B8C\u6210","Diagnosis":"\u8BCA\u65AD\u4FE1\u606F","See Details":"\u67E5\u770B\u8BE6\u7EC6\u4FE1\u606F","Cancel Swap":"\u53D6\u6D88\u5207\u6362","Are you sure you want to cancel this swap?":"\u60A8\u786E\u5B9A\u8981\u53D6\u6D88\u6B64\u4EA4\u6362\u5417\uFF1F","Yes, Cancel it":"\u662F\uFF0C\u53D6\u6D88\u5B83","No, Continue":"\u5426\uFF0C\u7EE7\u7EED","Delete Transaction":"\u5220\u9664\u4EA4\u6613","Are you sure you want to delete this swap?":"\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u4EA4\u6362\u5417\uFF1F","Yes, Delete it":"\u662F\uFF0C\u5220\u9664\u5B83","No, Cancel":"\u5426\uFF0C\u53D6\u6D88","Change Network":"\u66F4\u6539\u7F51\u7EDC","Network Changed":"\u7F51\u7EDC\u5DF2\u66F4\u6539","Select Token":"\u9009\u62E9\u4EE4\u724C","Wallet Connected":"\u94B1\u5305\u5DF2\u8FDE\u63A5","Your wallet is connected, you can use it to swap.":"\u60A8\u7684\u94B1\u5305\u5DF2\u8FDE\u63A5\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u5B83\u4EA4\u6362\u3002","Failed to Connect":"\u8FDE\u63A5\u5931\u8D25","Your wallet is not connected. Please try again.":"\u60A8\u7684\u94B1\u5305\u672A\u8FDE\u63A5\u3002\u8BF7\u91CD\u8BD5\u3002","Connecting to your wallet":"\u6B63\u5728\u8FDE\u63A5\u4F60\u7684\u94B1\u5305","Click connect in your wallet popup.":"\u70B9\u51FB\u5728\u4F60\u7684\u94B1\u5305\u5F39\u51FA\u7A97\u53E3\u4E2D\u8FDE\u63A5\u3002","Failed Network, Please retry your swap.":"\u7F51\u7EDC\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u60A8\u7684\u4EA4\u6362\u3002","Please reset your liquidity sources.":"\u8BF7\u91CD\u7F6E\u60A8\u7684\u6D41\u52A8\u8D44\u91D1\u6765\u6E90\u3002","You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.":"\u60A8\u9650\u5236\u4E86\u6D41\u52A8\u8D44\u91D1\u6765\u6E90\uFF0C\u8FD9\u53EF\u80FD\u5BFC\u81F4Rango\u627E\u4E0D\u5230\u8DEF\u5F84\u3002\u8BF7\u8003\u8651\u91CD\u7F6E\u60A8\u7684\u6D41\u52A8\u8D44\u91D1\u6765\u6E90\u3002","No Routes Found.":"\u672A\u627E\u5230\u8DEF\u7531\u3002","Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.":"\u4E3A\u4EC0\u4E48Rango\u627E\u4E0D\u5230\u8DEF\u7531\uFF1A\u4EE3\u5E01\u6D41\u52A8\u6027\u4F4E\uFF0C\u8F93\u5165\u91CF\u5F88\u4F4E\uFF0C\u6216\u8005\u6CA1\u6709\u9009\u62E9\u7684\u8F93\u5165/\u8F93\u51FA\u4EE3\u5E01\u7EC4\u5408\u53EF\u7528\u7684\u8DEF\u7531\u3002","Bridge Limit Error: Please increase your amount.":"\u6865\u63A5\u9650\u5236\u9519\u8BEF\uFF1A\u8BF7\u589E\u52A0\u60A8\u7684\u91D1\u989D\u3002","Bridge Limit Error: Please decrease your amount.":"\u6865\u63A5\u9650\u5236\u9519\u8BEF\uFF1A\u8BF7\u51CF\u5C11\u60A8\u7684\u91D1\u989D\u3002","High Price Impact":"\u9AD8\u4EF7\u683C\u5F71\u54CD","Price impact is too high!":"\u4EF7\u683C\u5F71\u54CD\u8FC7\u9AD8\uFF01","The price impact is significantly higher than the allowed amount.":"\u4EF7\u683C\u5F71\u54CD\u5927\u5927\u9AD8\u4E8E\u5141\u8BB8\u7684\u6570\u989D\u3002","Confirm high price impact":"\u786E\u8BA4\u9AD8\u4EF7\u683C\u5F71\u54CD","Route updated and price impact is too high, try again later!":"\u8DEF\u7531\u66F4\u65B0\u4E14\u4EF7\u683C\u5F71\u54CD\u592A\u5927\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5","USD Price Unknown":"\u7F8E\u5143\u4EF7\u683C\u672A\u77E5","USD Price Unknown, Cannot calculate Price Impact.":"\u7F8E\u5143\u4EF7\u683C\u672A\u77E5\uFF0C\u4E0D\u80FD\u8BA1\u7B97\u4EF7\u683C\u5F71\u54CD\u3002","USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?":"\u7F8E\u5143\u4EF7\u683C\u672A\u77E5\uFF0C\u4E0D\u80FD\u8BA1\u7B97\u4EF7\u683C\u5F71\u54CD\u3002\u4EF7\u683C\u5F71\u54CD\u53EF\u80FD\u9AD8\u4E8E\u901A\u5E38\u3002\u60A8\u786E\u5B9A\u8981\u7EE7\u7EED\u6389\u671F\u5417\uFF1F","Confirm USD Price Unknown":"\u786E\u8BA4\u7F8E\u5143\u4EF7\u683C\u672A\u77E5","Swap":"\u5207\u6362","Swap anyway":"\u4ECD\u7136\u5207\u6362","The route goes through Ethereum. Continue?":"\u822A\u7EBF\u7A7F\u8FC7\u592A\u592A\u7A7A\u4E86\u3002\u7EE7\u7EED\u5417\uFF1F","Network Fee":"\u7F51\u7EDC\u8D39\u7528","Protocol Fee":"\u534F\u8BAE\u8D39\u7528","Affiliate Fee":"\u52A0\u76DF\u8D39\u7528","Outbound Fee":"\u51FA\u7AD9\u8D39\u7528","Rango Fee":"Rango \u8D39\u7528","Route has been updated.":"\u8DEF\u7531\u5DF2\u66F4\u65B0\u3002","Output amount changed to {newOutputAmount} ({percentageChange}% change).":["Output amount changed to ",["newOutputAmount"]," (",["percentageChange"],"% change)."],"Route swappers has been updated.":"\u8DEF\u7531\u4EA4\u6362\u5668\u5DF2\u66F4\u65B0\u3002","Route internal coins has been updated.":"\u5185\u90E8\u786C\u5E01\u5DF2\u66F4\u65B0\u3002","Routes":"\u8DEF\u7531","From":"\u6765\u81EA","To":"\u6536\u4EF6\u4EBA","Light":"\u4EAE\u8272\u7684","Dark":"\u6DF1\u8272","Auto":"\u81EA\u52A8\u64CD\u4F5C","Loading failed":"\u52A0\u8F7D\u5931\u8D25","Bridges":"\u6865\u63A5","Exchanges":"\u4EA4\u6613","Language":"\u8BED\u8A00","Infinite approval":"\u65E0\u9650\u6279\u51C6","Enabling the 'Infinite approval' mode grants unrestricted access to smart contracts of DEXes/Bridges, allowing them to utilize the approved token amount without limitations.":"\u542F\u7528\\"\u65E0\u9650\u5BA1\u6279\\"\u6A21\u5F0F\u5141\u8BB8\u65E0\u9650\u5236\u8BBF\u95EEDEX/\u6865\u7684\u667A\u80FD\u5408\u7EA6\uFF0C\u5141\u8BB8\u4ED6\u4EEC\u4E0D\u53D7\u9650\u5236\u5730\u4F7F\u7528\u5DF2\u6279\u51C6\u7684\u4EE3\u5E01\u91D1\u989D\u3002","Theme":"\u4E3B\u9898","Confirm Swap":"\u786E\u8BA4\u5207\u6362","Start Swap":"\u542F\u52A8\u4EA4\u6362\u673A","You get":"\u4F60\u5F97\u5230\u4E86","History":"\u5386\u53F2\u8BB0\u5F55","Search Transaction":"\u641C\u7D22\u4EA4\u6613","language":"\u8BED\u8A00","Deselect all":"\u53D6\u6D88\u5168\u9009","Select all":"\u9009\u62E9\u6240\u6709","Search {sourceType}":["Search ",["sourceType"]],"Search Blockchain":"\u641C\u7D22Blockchain","Source":"\u6765\u6E90","Destination":"\u76EE\u6807","Swap {type}":["Swap ",["type"]],"Search Token":"\u641C\u7D22\u4EE4\u724C","Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?":"\u76EE\u524D\uFF0C\u60A8\u6B63\u5904\u4E8E\u6D3B\u52A8\u6A21\u5F0F\uFF0C\u5E76\u4E14\u9650\u5236\u4E86\u6D41\u52A8\u8D44\u91D1\u6765\u6E90\u3002 \u60A8\u60F3\u8981\u5207\u6362\u6B64\u6A21\u5F0F\u5E76\u4F7F\u7528\u6240\u6709\u53EF\u7528\u7684\u6D41\u52A8\u8D44\u91D1\u6765\u6E90\u5417\uFF1F","The request ID is necessary to display the swap details.":"\u8BF7\u6C42ID\u662F\u663E\u793A\u4EA4\u6362\u8BE6\u7EC6\u4FE1\u606F\u6240\u5FC5\u9700\u7684\u3002","Connect Wallets":"\u8FDE\u63A5\u94B1\u5305","Choose a wallet to connect.":"\u9009\u62E9\u8981\u8FDE\u63A5\u7684\u94B1\u5305\u3002","This week":"\u672C\u5468","This month":"\u672C\u6708","This year":"\u4ECA\u5E74\uFF1A","Required: >= {min} {symbol}":["Required: >= ",["min"]," ",["symbol"]],"Required: > {min} {symbol}":["Required: > ",["min"]," ",["symbol"]],"Required: <= {max} {symbol}":["Required: <= ",["max"]," ",["symbol"]],"Required: < {max} {symbol}":["Required: < ",["max"]," ",["symbol"]]," for network fee":" \u7F51\u7EDC\u8D39\u7528"," for swap":" \u6362\u884C"," for input and network fee":" \u8F93\u5165\u548C\u7F51\u7EDC\u8D39\u7528","Needs \u2248 {requiredAmount} {symbol}{reason}, but you have {currentAmount} {symbol} in your {blockchain} wallet.":["Needs \u2248 ",["requiredAmount"]," ",["symbol"],["reason"],", but you have ",["currentAmount"]," ",["symbol"]," in your ",["blockchain"]," wallet."],"Waiting for connecting wallet":"\u6B63\u5728\u7B49\u5F85\u8FDE\u63A5\u94B1\u5305","Waiting for other running tasks to be finished":"\u7B49\u5F85\u5176\u4ED6\u6B63\u5728\u8FD0\u884C\u7684\u4EFB\u52A1\u5B8C\u6210","Waiting for changing wallet network":"\u6B63\u5728\u7B49\u5F85\u66F4\u6539\u94B1\u5305\u7F51\u7EDC","Sunday":"\u5468\u65E5","Monday":"\u5468\u4E00","Tuesday":"\u661F\u671F\u4E8C","Wednesday":"\u661F\u671F\u4E09","Thursday":"\u661F\u671F\u56DB","Friday":"\u661F\u671F\u4E94","Saturday":"\u5468\u516D","Powered By":"\u652F\u6301\u8005","Aggregated Transaction":"\u5408\u8BA1\u4EA4\u6613","{blockchainCategory}":[["blockchainCategory"]],"Swap on {fromChain} via {swapper}":["Swap on ",["fromChain"]," via ",["swapper"]],"Bridge to {toChain} via {swapper}":["Bridge to ",["toChain"]," via ",["swapper"]],"Failed":"\u5931\u8D25","Completed":"\u5DF2\u5B8C\u6210","In progress":"\u8FDB\u884C\u4E2D","Waiting for bridge transaction":"\u7B49\u5F85\u6865\u63A5\u4EA4\u6613","Connected":"\u5DF2\u8FDE\u63A5","Disconnect":"\u65AD\u5F00\u8FDE\u63A5","Install":"\u5B89\u88C5","Connecting...":"\u6B63\u5728\u8FDE\u63A5...","Connecting":"\u6B63\u5728\u8FDE\u63A5","Disconnected":"\u65AD\u5F00\u8FDE\u63A5","you need to pass a correct state to Wallet.":"\u60A8\u9700\u8981\u5C06\u4E00\u4E2A\u6B63\u786E\u7684\u72B6\u6001\u4F20\u9012\u7ED9\u94B1\u5305\u3002","Balance":"\u4F59\u989D","Max":"\u6700\u5927\u503C","Token":"\u4EE4\u724C","Chain":"\u94FE\u6761"}`,
);
var l2 = {
  en: Dt,
  es: zt,
  ja: Ht,
  fr: At,
  pt: Ft,
  zh: qt,
  ru: Bt,
  de: It,
  uk: Zt,
  sv: Wt,
  fi: Mt,
  nl: Vt,
  el: Pt,
  it: Nt,
  pl: Et,
};
$1.load(l2);
function p2(e) {
  let [t, r] = s2((l) => l + 1, 0);
  return (
    jt(() => {
      $1.on("change", () => {
        r();
      });
    }, [$1]),
    jt(() => {
      $1.activate(e.language);
    }, [e.language]),
    a2.createElement(i2, { i18n: $1, key: t }, e.children)
  );
}
o(p2, "I18nManager");
import J from "react";
import C2 from "react";
import { createStitches as c2 } from "@stitches/react";
var d2 = {
  colors: {
    primary: "#1C3CF1",
    primary500: "#1C3CF1",
    primary600: "#0B27C5",
    secondary: "#469BF5",
    secondary100: "#E9F3FF",
    secondary200: "#D6EAFF",
    secondary300: "#C8E3FF",
    secondary400: "#B5D9FF",
    secondary500: "#469BF5",
    secondary600: "#2284ED",
    secondary700: "#242D5B",
    secondary800: "#131C49",
    secondary900: "#0E1744",
    neutral: "#E6E6E6",
    neutral100: "#F9F9F9",
    neutral200: "#F6F6F6",
    neutral300: "#F2F2F2",
    neutral400: "#EEEEEE",
    neutral500: "#E6E6E6",
    neutral600: "#A2A2A2",
    neutral700: "#727272",
    neutral800: "#1B1B1B",
    neutral900: "#121212",
    error100: "#FDF3F3",
    error300: "#FFD7D7",
    error500: "#FF3B3B",
    error600: "#432F2F",
    error700: "#191212",
    warning100: "#FFF1D4",
    warning300: "#FFD8B4",
    warning500: "#F17606",
    warning600: "#38271F",
    warning700: "#1A1412",
    info: "#5BABFF",
    info100: "#E9F3FF",
    info300: "#C8E2FF",
    info500: "#5BABFF",
    info600: "#2E2E41",
    info700: "#121521",
    success100: "#CEFAE6",
    success300: "#BDECD7",
    success500: "#06C270",
    success600: "#1F2825",
    success700: "#0F1412",
    background: "#FDFDFD",
    foreground: "#010101",
  },
  space: {
    0: "0rem",
    5: "0.313rem",
    10: "0.625rem",
    15: "0.938rem",
    20: "1.25rem",
    25: "1.563rem",
    30: "1.875rem",
    40: "2.5rem",
    46: "2.875rem",
    50: "3.125rem",
    60: "3.75rem",
    70: "4.375rem",
    80: "5rem",
    90: "5.625rem",
    100: "6.25rem",
    2: "2px",
    4: "4px",
    6: "6px",
    8: "8px",
    12: "12px",
    16: "16px",
    24: "24px",
    28: "28px",
    32: "32px",
  },
  radii: {
    xs: "5px",
    sm: "10px",
    xm: "15px",
    md: "25px",
    xl: "35px",
    lg: "40px",
    primary: "20px",
    secondary: "$md",
  },
  fontSizes: {
    10: "0.625rem",
    12: "0.75rem",
    14: "0.875rem",
    16: "1rem",
    18: "1.125rem",
    20: "1.25rem",
    22: "1.375rem",
    24: "1.5rem",
    28: "1.75rem",
    32: "2rem",
    36: "2.25rem",
    40: "2.5rem",
    48: "3rem",
  },
  fonts: { primary: "Roboto", widget: "$primary" },
  fontWeights: { regular: 400, medium: 500, semiBold: 600, bold: 700 },
  lineHeights: {
    12: "0.75rem",
    16: "1rem",
    20: "1.25rem",
    24: "1.5rem",
    26: "1.625rem",
    28: "1.75rem",
    30: "1.875rem",
    36: "2.25rem",
    40: "2.5rem",
    44: "2.75rem",
    52: "3.25rem",
    64: "4rem",
  },
  letterSpacings: {},
  sizes: {
    4: "4px",
    6: "6px",
    8: "8px",
    10: "10px",
    12: "12px",
    16: "16px",
    18: "18px",
    20: "20px",
    24: "24px",
    26: "26px",
    28: "28px",
    30: "30px",
    32: "32px",
    36: "36px",
    40: "40px",
    45: "45px",
    48: "48px",
  },
  borderWidths: {},
  borderStyles: {},
  shadows: {
    s: "0px 3px 5px 3px #f0f2f5, 0px 6px 10px 3px #f0f2f5, 0px 1px 18px 3px #f0f2f5",
  },
  zIndices: {},
  transitions: {},
},
  u2 = {
    xs: "(min-width: 375px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
  },
  m2 = { bc: (e) => ({ backgroundColor: e }) },
  h2 = {
    secondary: "#2284ED",
    secondary400: "#469BF5",
    secondary500: "#2284ED",
    secondary600: "#2B3462",
    neutral: "#222222",
    neutral900: "#E9E9E9",
    neutral800: "#E6E6E6",
    neutral700: "#B8B8B8",
    neutral600: "#A2A2A2",
    neutral500: "#222222",
    neutral400: "#1B1B1B",
    neutral300: "#121212",
    neutral200: "#111111",
    neutral100: "#101010",
    error500: "#FF5050",
    warning500: "#FF8A20",
    background: "#010101",
    foreground: "#FDFDFD",
  },
  g2 = c2,
  {
    styled: n,
    css: z,
    createTheme: Ot,
    keyframes: oe,
    globalCss: z5,
    config: M5,
  } = g2({ media: u2, theme: d2, utils: m2 }),
  Yt = Ot("light-theme-ui", {}),
  s = Ot("dark-theme-ui", {
    colors: h2,
    shadows: {
      s: "0px 3px 5px 3px #222, 0px 6px 10px 3px #222, 0px 1px 18px 3px #222",
    },
  });
var Ut = n("div", {
  flexShrink: 0,
  variants: {
    size: {
      2: {},
      4: {},
      8: {},
      10: {},
      12: {},
      16: {},
      18: {},
      20: {},
      24: {},
      30: {},
      32: {},
      40: {},
    },
    direction: { vertical: {}, horizontal: {} },
  },
  compoundVariants: [
    { size: 2, direction: "horizontal", css: { width: 2 } },
    { size: 2, direction: "vertical", css: { height: 2 } },
    { size: 4, direction: "horizontal", css: { width: "$4" } },
    { size: 4, direction: "vertical", css: { height: "$4" } },
    { size: 8, direction: "horizontal", css: { width: "$8" } },
    { size: 8, direction: "vertical", css: { height: "$8" } },
    { size: 10, direction: "horizontal", css: { width: "$10" } },
    { size: 10, direction: "vertical", css: { height: "$10" } },
    { size: 12, direction: "horizontal", css: { width: "$12" } },
    { size: 12, direction: "vertical", css: { height: "$12" } },
    { size: 16, direction: "horizontal", css: { width: "$16" } },
    { size: 16, direction: "vertical", css: { height: "$16" } },
    { size: 18, direction: "horizontal", css: { width: "$18" } },
    { size: 18, direction: "vertical", css: { height: "$18" } },
    { size: 20, direction: "horizontal", css: { width: "$20" } },
    { size: 20, direction: "vertical", css: { height: "$20" } },
    { size: 24, direction: "horizontal", css: { width: "$24" } },
    { size: 24, direction: "vertical", css: { height: "$24" } },
    { size: 30, direction: "horizontal", css: { width: "$30" } },
    { size: 30, direction: "vertical", css: { height: "$30" } },
    { size: 32, direction: "horizontal", css: { width: "$32" } },
    { size: 32, direction: "vertical", css: { height: "$32" } },
    { size: 40, direction: "vertical", css: { height: "$40" } },
  ],
});
var f2 = 12;
function g({ size: e = f2, direction: t = "vertical", ...r }) {
  return C2.createElement(Ut, { size: e, direction: t, ...r });
}
o(g, "Divider");
import y2 from "react";
var _t = n("span", {
  display: "inline-block",
  variants: {
    variant: { display: {}, headline: {}, title: {}, label: {}, body: {} },
    size: { large: {}, medium: {}, xmedium: {}, small: {}, xsmall: {} },
    align: {
      center: { textAlign: "center" },
      left: { textAlign: "left" },
      right: { textAlign: "right" },
    },
    noWrap: { true: { whiteSpace: "nowrap" } },
  },
  compoundVariants: [
    {
      size: "large",
      variant: "display",
      css: { fontSize: "$48", fontWeight: "$semiBold", lineHeight: "$64" },
    },
    {
      size: "medium",
      variant: "display",
      css: { fontSize: "$40", fontWeight: "$semiBold", lineHeight: "$52" },
    },
    {
      size: "small",
      variant: "display",
      css: { fontSize: "$36", fontWeight: "$semiBold", lineHeight: "$44" },
    },
    {
      size: "large",
      variant: "headline",
      css: { fontSize: "$32", fontWeight: "$semiBold", lineHeight: "$40" },
    },
    {
      size: "medium",
      variant: "headline",
      css: { fontSize: "$38", fontWeight: "$semiBold", lineHeight: "$36" },
    },
    {
      size: "small",
      variant: "headline",
      css: { fontSize: "$22", fontWeight: "$semiBold", lineHeight: "$30" },
    },
    {
      size: "xsmall",
      variant: "headline",
      css: { fontSize: "$20", fontWeight: "$semiBold", lineHeight: "$28" },
    },
    {
      size: "large",
      variant: "title",
      css: { fontSize: "$22", fontWeight: "$medium", lineHeight: "$28" },
    },
    {
      size: "medium",
      variant: "title",
      css: { fontSize: "$18", fontWeight: "$medium", lineHeight: "$26" },
    },
    {
      size: "xmedium",
      variant: "title",
      css: { fontSize: "$16", fontWeight: "$medium", lineHeight: "$24" },
    },
    {
      size: "small",
      variant: "title",
      css: { fontSize: "$14", fontWeight: "$medium", lineHeight: "$20" },
    },
    {
      size: "large",
      variant: "label",
      css: { fontSize: "$14", fontWeight: "$medium", lineHeight: "$20" },
    },
    {
      size: "medium",
      variant: "label",
      css: { fontSize: "$12", fontWeight: "$medium", lineHeight: "$16" },
    },
    {
      size: "small",
      variant: "label",
      css: { fontSize: "$10", fontWeight: "$medium", lineHeight: "$16" },
    },
    {
      size: "large",
      variant: "body",
      css: { fontSize: "$16", fontWeight: "$regular", lineHeight: "$24" },
    },
    {
      size: "medium",
      variant: "body",
      css: { fontSize: "$14", fontWeight: "$regular", lineHeight: "$20" },
    },
    {
      size: "small",
      variant: "body",
      css: { fontSize: "$12", fontWeight: "$regular", lineHeight: "$16" },
    },
    {
      size: "xsmall",
      variant: "body",
      css: { fontSize: "$10", fontWeight: "$regular", lineHeight: "$12" },
    },
  ],
});
function d({ children: e, className: t, color: r, ...l }) {
  let a = r
    ? { color: r.startsWith("$") ? r : `$${r}` }
    : { color: "$foreground" };
  return y2.createElement(
    _t,
    { className: `_typography _text ${t || ""}`, css: a, ...l },
    e,
  );
}
o(d, "Typography");
var w2 = n(d, { userSelect: "none" });
var Rt = o((e, t) => {
  if (t !== "regular")
    switch (e) {
      case "success":
      case "warning":
      case "error":
      case "info":
        return `${e}500`;
      default:
        return;
    }
}, "getColor"),
  Gt = o((e) => {
    switch (e) {
      case "alarm":
        return "small";
      case "regular":
        return "xsmall";
      default:
        return "xsmall";
    }
  }, "mapVariantToSize");
import E1 from "react";
import zo, { createElement as b2 } from "react";
import v2 from "react";
var J1 = n("svg", {
  variants: {
    color: {
      primary: { color: "$primary500" },
      secondary: { color: "$secondary500" },
      error: { color: "$error500" },
      warning: { color: "$warning500" },
      success: { color: "$success500" },
      black: { color: "$foreground" },
      white: { color: "$background" },
      info: { color: "$info500" },
      gray: { color: "$neutral700" },
    },
  },
});
function i(e) {
  let { size: t = "1em", color: r, children: l } = e,
    p = { ...l?.props, width: t, height: t, color: r, className: "_icon" };
  return v2.createElement(J1, { ...p }, l?.props.children);
}
o(i, "SvgIcon");
function k2(e) {
  return b2(
    i,
    e,
    zo.createElement(
      "svg",
      { viewBox: "0 0 24 25", xmlns: "http://www.w3.org/2000/svg" },
      zo.createElement("path", {
        fillRule: "evenodd",
        d: "M18.8611 13.6389H4.63889C4.15296 13.6389 3.75 13.2359 3.75 12.75C3.75 12.2641 4.15296 11.8611 4.63889 11.8611H18.8611C19.347 11.8611 19.75 12.2641 19.75 12.75C19.75 13.2359 19.347 13.6389 18.8611 13.6389Z",
        fill: "currentColor",
      }),
      zo.createElement("path", {
        fillRule: "evenodd",
        d: "M11.75 20.75C11.2641 20.75 10.8611 20.347 10.8611 19.8611V5.63889C10.8611 5.15296 11.2641 4.75 11.75 4.75C12.2359 4.75 12.6389 5.15296 12.6389 5.63889V19.8611C12.6389 20.347 12.2359 20.75 11.75 20.75Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(k2, "SvgAdd");
var S2 = k2;
import ge, { createElement as x2 } from "react";
function L2(e) {
  return x2(
    i,
    e,
    ge.createElement(
      "svg",
      { viewBox: "0 0 24 25", xmlns: "http://www.w3.org/2000/svg" },
      ge.createElement("path", {
        d: "M8.67039 5.54766C8.67994 5.54187 8.68937 5.53695 8.69935 5.53245L8.71277 5.52846C8.74207 5.52051 8.77226 5.51778 8.80218 5.52045C8.8367 5.52346 8.87064 5.53342 8.90134 5.54974C8.93205 5.56607 8.95903 5.58852 8.98102 5.61568C9.00257 5.64277 9.01894 5.67402 9.02829 5.70756L9.66563 7.65375L9.60439 7.67032C9.54198 7.68708 9.47797 7.70395 9.41702 7.72391C9.33427 7.75101 9.2558 7.78366 9.17544 7.81428L8.53809 5.86809C8.51629 5.80775 8.51786 5.74138 8.54227 5.68226C8.56661 5.62296 8.61265 5.57495 8.67039 5.54766Z",
        fill: "currentColor",
      }),
      ge.createElement("path", {
        d: "M4.31652 9.28115C4.34365 9.24036 4.38217 9.20811 4.4269 9.18856C4.46226 9.17289 4.50065 9.16523 4.53906 9.16635C4.57746 9.16747 4.61539 9.17714 4.64978 9.19471L6.48083 10.1223C6.42748 10.2155 6.37764 10.3093 6.3311 10.4045C6.30215 10.4635 6.27424 10.5231 6.247 10.5836L4.41595 9.65597C4.372 9.63416 4.33549 9.60011 4.30989 9.55818C4.28467 9.51613 4.27171 9.46782 4.27283 9.41878C4.27395 9.36974 4.28895 9.32188 4.31652 9.28115Z",
        fill: "currentColor",
      }),
      ge.createElement("path", {
        d: "M6.83869 14.1002C6.07832 11.7784 7.34267 9.27443 9.66435 8.51412C9.9063 8.43488 10.1502 8.37772 10.3939 8.34146C10.0982 9.29702 10.0106 10.3458 10.181 11.417C10.5306 13.6147 11.8965 15.3978 13.6791 16.2836C13.3073 16.5594 12.8853 16.781 12.4214 16.9329C10.0993 17.6934 7.59912 16.4223 6.83869 14.1002Z",
        fill: "currentColor",
      }),
      ge.createElement("path", {
        d: "M3.8378 14.911C3.86254 14.8466 3.91143 14.7948 3.97426 14.7669L3.99187 14.7607L3.99975 14.7585C4.00807 14.7552 4.01693 14.7523 4.02561 14.7501L5.97678 14.1111C5.99167 14.1653 6.00637 14.2214 6.02212 14.277C6.03057 14.3066 6.03933 14.3358 6.04876 14.3646C6.06177 14.4043 6.07607 14.443 6.09068 14.4814L6.13737 14.6015L4.1862 15.2404C4.12305 15.2687 4.05169 15.2706 3.98759 15.246C3.92313 15.2215 3.87145 15.1724 3.84351 15.1095C3.8152 15.0468 3.81343 14.9752 3.8378 14.911Z",
        fill: "currentColor",
      }),
      ge.createElement("path", {
        d: "M7.51423 19.1168L8.44186 17.2858C8.59168 17.3711 8.74049 17.4508 8.89807 17.5211L7.97561 19.3504C7.9445 19.4115 7.89054 19.4578 7.82552 19.4791C7.76014 19.5005 7.68924 19.4951 7.62801 19.4643C7.56708 19.4331 7.52078 19.3791 7.49943 19.3139C7.4889 19.2818 7.48472 19.2478 7.48711 19.2139C7.48993 19.18 7.49914 19.1469 7.51423 19.1168Z",
        fill: "currentColor",
      }),
      ge.createElement("path", {
        d: "M13.0798 19.7377L12.4423 17.7913C12.5256 17.7683 12.6078 17.7484 12.691 17.7212C12.7722 17.6945 12.8537 17.6609 12.9329 17.6307L13.5703 19.577C13.5813 19.6094 13.586 19.6437 13.5837 19.6778L13.5815 19.7C13.5775 19.7262 13.5695 19.752 13.5573 19.776C13.5421 19.8068 13.5211 19.8341 13.495 19.8565C13.4806 19.8688 13.4653 19.8795 13.4489 19.8884C13.4354 19.8957 13.4214 19.9017 13.4066 19.9065C13.3741 19.9172 13.3399 19.9212 13.3055 19.9186C13.2714 19.9158 13.238 19.9063 13.2079 19.8904C13.1966 19.8847 13.1858 19.878 13.1757 19.8707C13.1581 19.8583 13.1422 19.8434 13.1282 19.8269C13.1065 19.8007 13.09 19.7703 13.0798 19.7377Z",
        fill: "currentColor",
      }),
      ge.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14.2386 8.51423C14.5854 7.29762 15.4329 6.31226 16.5434 5.77669C16.777 5.66404 16.7626 5.29952 16.5044 5.27455C13.9779 5.03012 11.5363 6.63125 10.831 9.17829C10.0531 11.9895 11.6984 14.9386 14.5238 15.7463C16.3896 16.2796 18.3976 15.7372 19.7517 14.4016C19.9363 14.2195 19.7197 13.9339 19.4689 13.9996C16.3574 14.8152 13.1572 12.308 14.2386 8.51423Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(L2, "SvgAutoTheme");
var T2 = L2;
import Kt, { createElement as $2 } from "react";
function I2(e) {
  return $2(
    i,
    e,
    Kt.createElement(
      "svg",
      { viewBox: "0 0 24 24" },
      Kt.createElement("path", {
        fillRule: "evenodd",
        d: "M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z",
        fill: "currentColor",
      }),
    ),
  );
}
o(I2, "SvgAutorenew");
var P2 = I2;
import Mo, { createElement as D2 } from "react";
function z2(e) {
  return D2(
    i,
    e,
    Mo.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Mo.createElement(
        "g",
        { id: "Icons" },
        Mo.createElement("path", {
          id: "Border-Radius",
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M3.48926 7.74652C3.48926 5.15304 5.592 3 8.24997 3C8.53793 3 8.77138 3.22074 8.77138 3.49304C8.77138 3.76533 8.53793 3.98607 8.24997 3.98607C6.22533 3.98607 4.53208 5.64173 4.53208 7.74652C4.53208 8.01881 4.29864 8.23955 4.01067 8.23955C3.7227 8.23955 3.48926 8.01881 3.48926 7.74652ZM16.2071 3.49304C16.2071 3.22074 16.4406 3 16.7286 3C19.3865 3 21.4893 5.15304 21.4893 7.74652C21.4893 8.01882 21.2558 8.23956 20.9678 8.23956C20.6799 8.23956 20.4464 8.01882 20.4464 7.74652C20.4464 5.64173 18.7532 3.98607 16.7286 3.98607C16.4406 3.98607 16.2071 3.76533 16.2071 3.49304ZM5.60885 7.74638C5.60885 6.32747 6.76259 5.1266 8.24991 5.1266L16.7285 5.1266C18.2158 5.1266 19.3696 6.32747 19.3696 7.74638L19.3696 16.2533C19.3696 17.6722 18.2158 18.8731 16.7285 18.8731L8.2499 18.8731C6.76259 18.8731 5.60885 17.6722 5.60885 16.2533L5.60885 7.74638ZM8.24991 6.11267C7.39592 6.11267 6.65167 6.81615 6.65167 7.74638L6.65167 16.2533C6.65167 17.1836 7.39592 17.887 8.2499 17.887L16.7285 17.887C17.5825 17.887 18.3267 17.1836 18.3267 16.2533L18.3267 7.74638C18.3267 6.81616 17.5825 6.11267 16.7285 6.11267L8.24991 6.11267ZM4.01067 15.7604C4.29864 15.7604 4.53208 15.9812 4.53208 16.2535C4.53208 18.3583 6.22533 20.0139 8.24996 20.0139C8.53793 20.0139 8.77138 20.2347 8.77138 20.507C8.77138 20.7793 8.53793 21 8.24996 21C5.592 21 3.48926 18.847 3.48926 16.2535C3.48926 15.9812 3.7227 15.7604 4.01067 15.7604ZM20.9678 15.7604C21.2558 15.7604 21.4893 15.9812 21.4893 16.2535C21.4893 18.847 19.3865 21 16.7285 21C16.4406 21 16.2071 20.7793 16.2071 20.507C16.2071 20.2347 16.4406 20.0139 16.7285 20.0139C18.7532 20.0139 20.4464 18.3583 20.4464 16.2535C20.4464 15.9812 20.6799 15.7604 20.9678 15.7604Z",
          fill: "#727272",
        }),
      ),
    ),
  );
}
o(z2, "SvgBorderRadius");
var M2 = z2;
import Xt, { createElement as A2 } from "react";
function N2(e) {
  return A2(
    i,
    e,
    Xt.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Xt.createElement("path", {
        d: "M18.21 9.21C15.93 10.78 13.45 13.3 13 17H15V19H9V17H11C10.5 12.5 6.63 9 2 9V7C6.39 7 10.22 9.55 12 13.3C13.13 10.87 14.99 9.05 16.78 7.78L14 5H21V12L18.21 9.21Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(N2, "SvgBridges");
var H2 = N2;
import Jt, { createElement as V2 } from "react";
function E2(e) {
  return V2(
    i,
    e,
    Jt.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Jt.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M23.4595 6.04028C23.2057 5.78644 22.7941 5.78644 22.5403 6.04028L11.9999 16.5807L1.45952 6.04028C1.20568 5.78644 0.794123 5.78644 0.540283 6.04028C0.286442 6.29412 0.286442 6.70568 0.540283 6.95952L11.5403 17.9595C11.7941 18.2134 12.2057 18.2134 12.4595 17.9595L23.4595 6.95952C23.7134 6.70568 23.7134 6.29412 23.4595 6.04028Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(E2, "SvgChevronDown");
var Je = E2;
import Qt, { createElement as F2 } from "react";
function B2(e) {
  return F2(
    i,
    e,
    Qt.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Qt.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M17.9597 0.540478C18.2136 0.794319 18.2136 1.20588 17.9597 1.45972L7.41934 12.0001L17.9597 22.5405C18.2136 22.7943 18.2136 23.2059 17.9597 23.4597C17.7059 23.7136 17.2943 23.7136 17.0405 23.4597L6.04048 12.4597C5.78664 12.2059 5.78664 11.7943 6.04048 11.5405L17.0405 0.540478C17.2943 0.286637 17.7059 0.286637 17.9597 0.540478Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(B2, "SvgChevronLeft");
var W2 = B2;
import en, { createElement as Z2 } from "react";
function q2(e) {
  return Z2(
    i,
    e,
    en.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      en.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.04028 0.540478C5.78644 0.794319 5.78644 1.20588 6.04028 1.45972L16.5807 12.0001L6.04028 22.5405C5.78644 22.7943 5.78644 23.2059 6.04028 23.4597C6.29412 23.7136 6.70568 23.7136 6.95952 23.4597L17.9595 12.4597C18.2134 12.2059 18.2134 11.7943 17.9595 11.5405L6.95952 0.540478C6.70568 0.286637 6.29412 0.286637 6.04028 0.540478Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(q2, "SvgChevronRight");
var Q1 = q2;
import on, { createElement as j2 } from "react";
function O2(e) {
  return j2(
    i,
    e,
    on.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      on.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.17976 17.6273C1.41944 17.867 1.80803 17.867 2.04771 17.6273L12 7.67504L21.9523 17.6273C22.192 17.867 22.5806 17.867 22.8202 17.6273C23.0599 17.3877 23.0599 16.9991 22.8202 16.7594L12.434 6.37312C12.1943 6.13344 11.8057 6.13344 11.566 6.37312L1.17976 16.7594C0.940081 16.9991 0.940081 17.3877 1.17976 17.6273Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(O2, "SvgChevronUp");
var I1 = O2;
import Qe, { createElement as Y2 } from "react";
function U2(e) {
  return Y2(
    i,
    e,
    Qe.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Qe.createElement(
        "g",
        { clipPath: "url(#clip0_3736_40175)" },
        Qe.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M23.4597 0.540356C23.7135 0.794197 23.7135 1.20575 23.4597 1.45959L12.9193 12L23.4597 22.5404C23.7135 22.7942 23.7135 23.2058 23.4597 23.4596C23.2059 23.7134 22.7943 23.7134 22.5405 23.4596L12.0001 12.9192L1.45972 23.4596C1.20588 23.7134 0.794319 23.7134 0.540478 23.4596C0.286637 23.2057 0.286637 22.7942 0.540478 22.5403L11.0808 12L0.54048 1.45961C0.286639 1.20577 0.286639 0.794217 0.54048 0.540376C0.794321 0.286535 1.20588 0.286535 1.45972 0.540376L12.0001 11.0807L22.5405 0.540356C22.7943 0.286515 23.2059 0.286515 23.4597 0.540356Z",
          fill: "currentColor",
        }),
      ),
      Qe.createElement(
        "defs",
        null,
        Qe.createElement(
          "clipPath",
          { id: "clip0_3736_40175" },
          Qe.createElement("rect", { width: 24, height: 24, fill: "white" }),
        ),
      ),
    ),
  );
}
o(U2, "SvgClose");
var P1 = U2;
import tn, { createElement as _2 } from "react";
function R2(e) {
  return _2(
    i,
    e,
    tn.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      tn.createElement("path", {
        d: "M12 24C9.62663 24 7.30655 23.2962 5.33316 21.9776C3.35977 20.6591 1.8217 18.7849 0.913451 16.5922C0.00519937 14.3995 -0.232441 11.9867 0.230582 9.65892C0.693604 7.33115 1.83649 5.19295 3.51472 3.51472C5.19295 1.83649 7.33115 0.693604 9.65892 0.230582C11.9867 -0.232441 14.3995 0.00519937 16.5922 0.913451C18.7849 1.8217 20.6591 3.35977 21.9776 5.33316C23.2962 7.30655 24 9.62663 24 12C23.9964 15.1815 22.731 18.2317 20.4813 20.4813C18.2317 22.731 15.1815 23.9964 12 24ZM5.24958 10.7467C5.02396 10.7461 4.80338 10.8134 4.61649 10.9398C4.42961 11.0663 4.28505 11.2459 4.20158 11.4556C4.11812 11.6652 4.09962 11.8951 4.14847 12.1153C4.19732 12.3356 4.31128 12.5361 4.47553 12.6908L9.38309 17.3238C9.59865 17.5247 9.88439 17.6329 10.1789 17.6253C10.4734 17.6178 10.7532 17.495 10.9582 17.2833L19.556 8.28277C19.7619 8.06674 19.8735 7.77777 19.8663 7.47942C19.8591 7.18108 19.7338 6.89781 19.5177 6.69192C19.3017 6.48603 19.0127 6.3744 18.7144 6.38157C18.416 6.38875 18.1328 6.51414 17.9269 6.73017L10.1144 14.9139L6.02363 11.0527C5.81479 10.856 5.5387 10.7466 5.25183 10.7467H5.24958Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(R2, "SvgComplete");
var D1 = R2;
import nn, { createElement as G2 } from "react";
function K2(e) {
  return G2(
    i,
    e,
    nn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      nn.createElement("path", {
        d: "M20.4327 5.58132H16.0737V1.95344C16.071 1.43619 15.8811 0.941128 15.5451 0.575383C15.2091 0.209663 14.7541 0.00277478 14.2789 0H4.02234C3.54722 0.00280315 3.09223 0.209677 2.75619 0.575383C2.42017 0.941104 2.23026 1.43614 2.22754 1.95344V16.465C2.23029 16.9823 2.42019 17.4776 2.75619 17.8433C3.09221 18.209 3.54722 18.4157 4.02234 18.4187H8.38133V22.0466C8.38408 22.5638 8.57398 23.0589 8.90999 23.4246C9.246 23.7903 9.70101 23.9972 10.1761 24H20.4327C20.9079 23.9972 21.3628 23.7903 21.6989 23.4246C22.0349 23.0589 22.2248 22.5639 22.2275 22.0466V7.53495C22.2248 7.0177 22.0349 6.52245 21.6989 6.1567C21.3629 5.79098 20.9079 5.58429 20.4327 5.58132ZM4.02278 16.7441C3.88129 16.7441 3.76625 16.6192 3.76625 16.465V1.95344C3.76625 1.79927 3.88112 1.67443 4.0226 1.67443H14.2792C14.3472 1.67443 14.4125 1.70377 14.4605 1.7561C14.5086 1.80842 14.5356 1.87944 14.5356 1.95344V5.58132H10.1766C9.70145 5.58431 9.24647 5.791 8.91043 6.1567C8.57441 6.52242 8.3845 7.01765 8.38177 7.53495V16.7443L4.02278 16.7441ZM20.689 22.0467C20.689 22.1208 20.662 22.1918 20.614 22.2441C20.5659 22.2964 20.5006 22.3258 20.4327 22.3258H10.176C10.0346 22.3258 9.91969 22.2009 9.91969 22.0467V7.53515C9.91969 7.38097 10.0346 7.25595 10.176 7.25595H20.4327C20.5006 7.25595 20.5659 7.28548 20.614 7.3378C20.6621 7.39013 20.689 7.46114 20.689 7.53515V22.0467Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(K2, "SvgCopy");
var X2 = K2;
import L, { createElement as J2 } from "react";
function Q2(e) {
  return J2(
    i,
    e,
    L.createElement(
      "svg",
      { viewBox: "0 0 29 28", xmlns: "http://www.w3.org/2000/svg" },
      L.createElement("circle", { cx: 14.5, cy: 8, r: 7, fill: "#469BF5" }),
      L.createElement("path", {
        d: "M14.5001 3C13.9355 3 13.4778 5.04669 13.4778 7.57143C13.4778 10.0962 13.9355 12.1429 14.5001 12.1429C15.0646 12.1429 15.5224 10.0962 15.5224 7.57143C15.5224 5.04669 15.0646 3 14.5001 3ZM14.5707 11.8849C14.5061 11.9709 14.4415 11.9064 14.4415 11.9064C14.1816 11.6053 14.0516 11.0459 14.0516 11.0459C13.5968 9.58303 13.7051 6.44219 13.7051 6.44219C13.9188 3.9487 14.3075 3.35966 14.4398 3.22888C14.4533 3.21554 14.4711 3.20738 14.4901 3.20585C14.509 3.20432 14.5279 3.20951 14.5433 3.22052C14.7353 3.35648 14.8963 3.92507 14.8963 3.92507C15.3717 5.68909 15.3287 7.34556 15.3287 7.34556C15.3717 8.7869 15.0904 10.4003 15.0904 10.4003C14.8739 11.6265 14.5707 11.8849 14.5707 11.8849Z",
        fill: "white",
      }),
      L.createElement("path", {
        d: "M18.4671 5.29619C18.186 4.80656 16.1823 5.42826 13.9903 6.68463C11.7983 7.941 10.2521 9.35649 10.5329 9.84592C10.8138 10.3353 12.8177 9.71385 15.0097 8.45748C17.2017 7.20111 18.7479 5.78562 18.4671 5.29619ZM10.7923 9.77875C10.6846 9.7652 10.709 9.6768 10.709 9.6768C10.841 9.30162 11.261 8.91052 11.261 8.91052C12.3046 7.78823 15.0842 6.31912 15.0842 6.31912C17.3542 5.26349 18.0593 5.30803 18.2381 5.35725C18.2565 5.36237 18.2724 5.37383 18.2832 5.38958C18.2939 5.40533 18.2987 5.42437 18.2967 5.44332C18.2752 5.67751 17.8609 6.0999 17.8609 6.0999C16.5675 7.39043 15.1086 8.17758 15.1086 8.17758C13.8792 8.93243 12.3391 9.49111 12.3391 9.49111C11.1672 9.91321 10.7923 9.77875 10.7923 9.77875H10.7923Z",
        fill: "white",
      }),
      L.createElement("path", {
        d: "M18.4571 9.86134C18.7404 9.373 17.1981 7.95102 15.0138 6.6852C12.8295 5.41938 10.826 4.78999 10.543 5.27916C10.26 5.76833 11.8021 7.18947 13.9876 8.45529C16.1732 9.72111 18.1741 10.3506 18.4571 9.86134ZM10.7307 5.46785C10.6889 5.3687 10.7772 5.34482 10.7772 5.34482C11.1682 5.27101 11.7175 5.43921 11.7175 5.43921C13.2118 5.77933 15.8763 7.44763 15.8763 7.44763C17.9278 8.88253 18.2424 9.51456 18.2896 9.69397C18.2944 9.71237 18.2925 9.73188 18.2843 9.74904C18.2761 9.7662 18.2621 9.77992 18.2448 9.78777C18.0309 9.88567 17.4579 9.73981 17.4579 9.73981C15.692 9.26652 14.2797 8.39938 14.2797 8.39938C13.0108 7.71528 11.756 6.66266 11.756 6.66266C10.8026 5.86025 10.731 5.46894 10.731 5.46894L10.7307 5.46785Z",
        fill: "white",
      }),
      L.createElement("path", {
        d: "M14.4893 8.09906C14.7865 8.09906 15.0274 7.85827 15.0274 7.56125C15.0274 7.26422 14.7865 7.02344 14.4893 7.02344C14.1922 7.02344 13.9513 7.26422 13.9513 7.56125C13.9513 7.85827 14.1922 8.09906 14.4893 8.09906Z",
        fill: "white",
      }),
      L.createElement("path", {
        d: "M16.6954 5.81725C16.8677 5.81725 17.0075 5.67278 17.0075 5.49456C17.0075 5.31635 16.8677 5.17188 16.6954 5.17188C16.523 5.17188 16.3833 5.31635 16.3833 5.49456C16.3833 5.67278 16.523 5.81725 16.6954 5.81725Z",
        fill: "white",
      }),
      L.createElement("path", {
        d: "M11.5731 6.9149C11.7454 6.9149 11.8851 6.77043 11.8851 6.59222C11.8851 6.414 11.7454 6.26953 11.5731 6.26953C11.4007 6.26953 11.261 6.414 11.261 6.59222C11.261 6.77043 11.4007 6.9149 11.5731 6.9149Z",
        fill: "white",
      }),
      L.createElement("path", {
        d: "M13.8544 10.8719C14.0268 10.8719 14.1665 10.7275 14.1665 10.5492C14.1665 10.371 14.0268 10.2266 13.8544 10.2266C13.6821 10.2266 13.5424 10.371 13.5424 10.5492C13.5424 10.7275 13.6821 10.8719 13.8544 10.8719Z",
        fill: "white",
      }),
      L.createElement("circle", { cx: 7.5, cy: 20, r: 7, fill: "#469BF5" }),
      L.createElement(
        "g",
        { clipPath: "url(#clip0_9706_95038)" },
        L.createElement("path", {
          d: "M12.0037 16.8405C11.903 16.4592 11.5793 16.0779 10.9965 15.6535C10.5289 15.3153 10.0325 15.1211 9.63681 15.1211C9.55767 15.1211 9.48573 15.1283 9.41379 15.1427C9.23393 15.1786 9.07566 15.3081 8.97494 15.5024C8.85264 15.7326 8.82386 16.042 8.90299 16.229C8.93177 16.2866 8.96774 16.3585 9.01091 16.4233C8.62961 16.6535 8.41379 16.7182 8.38501 16.7254C9.37782 17.0563 10.2052 17.747 10.7231 18.6463L10.7303 18.5599C10.7519 18.3225 10.8239 18.0492 10.9246 17.7686C11.0253 17.7974 11.126 17.8117 11.2267 17.8117C11.4929 17.8117 11.7231 17.7038 11.867 17.5096C12.0109 17.3153 12.0685 17.0563 12.0037 16.8405Z",
          fill: "white",
        }),
        L.createElement("path", {
          d: "M10.9675 17.5614C11.6222 17.7413 11.8884 17.2377 11.802 16.8996C11.7085 16.5614 11.4064 16.2161 10.874 15.8276C10.3416 15.4391 9.80204 15.2809 9.45671 15.3528C9.11139 15.4247 9.01067 15.9499 9.097 16.1514C9.13297 16.2305 9.21211 16.3456 9.32002 16.4751C9.18333 16.5686 9.05384 16.6406 8.94592 16.7053C9.60779 17.0003 10.1833 17.4607 10.615 18.0363C10.6653 17.842 10.7373 17.6693 10.802 17.5183C10.8524 17.5255 10.91 17.5398 10.9675 17.5614Z",
          fill: "url(#paint0_radial_9706_95038)",
        }),
        L.createElement("path", {
          d: "M11.4713 16.5684C10.9246 15.9929 10.4641 15.8418 9.91018 15.7195C9.47853 15.6188 9.59364 15.3742 10.1188 15.4245C9.86702 15.3382 9.62961 15.3166 9.45695 15.3526C9.11162 15.4245 9.0109 15.9497 9.09723 16.1511C9.1332 16.2303 9.21234 16.3454 9.32026 16.4749C9.12601 16.6044 8.96054 16.6979 8.82385 16.7699C8.8886 16.7986 8.96774 16.8346 9.06126 16.885C9.30587 17.0145 9.57205 17.2303 9.57205 17.2303C9.16918 16.885 9.25551 16.7267 9.80946 16.3382C9.98213 16.2159 10.2987 16.2303 10.5936 16.3814C10.8886 16.5324 11.2339 16.9137 11.2339 16.9137L10.903 17.5468C10.9246 17.554 10.9462 17.5612 10.9677 17.5684C11.1764 17.626 11.3418 17.6116 11.4713 17.5612C11.6224 17.4677 12.0181 17.1511 11.4713 16.5684Z",
          fill: "#C0DAF6",
        }),
        L.createElement("path", {
          d: "M9.90274 16.0629C10.0466 16.1204 10.2337 16.2212 10.4639 16.3722C10.7373 16.5521 10.9747 16.7535 11.1258 16.9118C10.874 17.2428 10.7085 17.696 10.6078 18.0125C10.6581 18.0845 10.7157 18.1564 10.766 18.2284C10.8164 18.0485 10.9027 17.7823 11.0178 17.5161C11.0466 17.5233 11.0826 17.5233 11.1186 17.5233C11.2049 17.5233 11.3056 17.5089 11.3848 17.4442C11.4423 17.401 11.5071 17.3219 11.4999 17.178C11.4999 17.0413 11.3919 16.8687 11.1689 16.66C11.0107 16.5089 10.7948 16.3435 10.579 16.1924C9.96029 15.7823 9.52864 15.6672 9.3344 15.8615C9.2049 15.991 9.21929 16.1492 9.26245 16.2643C9.03224 16.4154 8.83799 16.5233 8.7085 16.5953C8.79483 16.624 8.87396 16.66 8.96029 16.696C9.19051 16.5737 9.52145 16.3651 9.90274 16.0629ZM11.2625 17.0917C11.284 17.1276 11.2912 17.1636 11.2912 17.1852C11.2912 17.2499 11.2696 17.2715 11.2553 17.2859C11.2265 17.3075 11.1689 17.3219 11.1186 17.3219C11.1617 17.2356 11.2121 17.1636 11.2625 17.0917ZM9.48547 16.0197C9.50706 15.9981 9.56461 15.9838 9.65814 15.9981C9.58619 16.0557 9.51425 16.1061 9.44231 16.1564C9.43511 16.1061 9.44231 16.0557 9.48547 16.0197Z",
          fill: "white",
        }),
        L.createElement("path", {
          d: "M7.2192 16.332C4.86668 16.332 2.96021 18.2385 2.96021 20.591C2.96021 22.9435 4.86668 24.85 7.2192 24.85C9.57172 24.85 11.4782 22.9435 11.4782 20.591C11.4782 18.2385 9.56452 16.332 7.2192 16.332ZM7.2192 24.6126C4.99618 24.6126 3.19762 22.814 3.19762 20.591C3.19762 18.368 4.99618 16.5694 7.2192 16.5694C9.44222 16.5694 11.2408 18.368 11.2408 20.591C11.2408 22.814 9.43502 24.6126 7.2192 24.6126Z",
          fill: "white",
        }),
        L.createElement("path", {
          d: "M7.21921 24.6135C9.44029 24.6135 11.2408 22.813 11.2408 20.5919C11.2408 18.3708 9.44029 16.5703 7.21921 16.5703C4.99814 16.5703 3.19763 18.3708 3.19763 20.5919C3.19763 22.813 4.99814 24.6135 7.21921 24.6135Z",
          fill: "#6CAFF5",
        }),
        L.createElement("path", {
          d: "M11.0398 20.5547C11.0398 22.6626 9.32759 24.3748 7.21967 24.3748C5.11176 24.3748 3.39233 22.6626 3.39233 20.5547H11.0398Z",
          fill: "#7EB8F5",
        }),
        L.createElement("path", {
          d: "M10.7375 20.5547C10.7375 22.6122 9.11165 24.2957 7.06848 24.3748H7.21956C9.32747 24.3748 11.0397 22.6626 11.0397 20.5547H10.7375Z",
          fill: "#7EB8F5",
        }),
        L.createElement("path", {
          d: "M11.0326 20.5885C11.0326 20.1497 10.27 19.8979 9.25564 19.8116C8.52183 19.754 7.78082 19.826 6.9319 20.0849C6.19809 20.3008 5.53622 20.2648 5.0542 20.2072C3.98226 20.0849 3.39233 20.0706 3.39233 20.5885C3.39233 21.3367 4.91751 22.272 7.20528 21.9483C8.36356 21.7828 8.96068 21.4447 9.64413 21.2144C10.3851 20.9698 11.0326 20.977 11.0326 20.5885Z",
          fill: "#7EB8F5",
        }),
        L.createElement("path", {
          d: "M9.52875 19.2577C9.67976 19.2577 9.80213 19.1353 9.80213 18.9843C9.80213 18.8333 9.67976 18.7109 9.52875 18.7109C9.37774 18.7109 9.25537 18.8333 9.25537 18.9843C9.25537 19.1353 9.37774 19.2577 9.52875 19.2577Z",
          fill: "#55A6FA",
          fillOpacity: 0.53,
        }),
        L.createElement("path", {
          d: "M8.47097 18.7754C8.82859 18.7754 9.11845 18.4856 9.11845 18.128C9.11845 17.7703 8.82859 17.4805 8.47097 17.4805C8.11334 17.4805 7.82349 17.7703 7.82349 18.128C7.82349 18.4856 8.11334 18.7754 8.47097 18.7754Z",
          fill: "#55A6FA",
          fillOpacity: 0.53,
        }),
        L.createElement("path", {
          d: "M9.16923 22.2728C9.20894 22.2728 9.24118 22.2406 9.24118 22.2008C9.24118 22.1611 9.20894 22.1289 9.16923 22.1289C9.12952 22.1289 9.09729 22.1611 9.09729 22.2008C9.09729 22.2406 9.12952 22.2728 9.16923 22.2728Z",
          fill: "white",
          fillOpacity: 0.3,
        }),
      ),
      L.createElement("circle", { cx: 21.5, cy: 20, r: 7, fill: "#469BF5" }),
      L.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M20.2726 16.668L24.1966 23.4457L25.4961 21.178L22.8716 16.668H20.2726Z",
        fill: "white",
      }),
      L.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M20.2726 21.3047L21.623 23.445H24.324L22.9735 21.3047H20.2726Z",
        fill: "white",
      }),
      L.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.1005 18.8086L17.75 21.1273L19.1005 23.446L21.8269 18.8086H19.1005Z",
        fill: "white",
      }),
      L.createElement(
        "defs",
        null,
        L.createElement(
          "radialGradient",
          {
            id: "paint0_radial_9706_95038",
            cx: 0,
            cy: 0,
            r: 1,
            gradientUnits: "userSpaceOnUse",
            gradientTransform:
              "translate(11.6708 16.4463) scale(3.21543 3.21542)",
          },
          L.createElement("stop", { stopColor: "#C2DBF5" }),
          L.createElement("stop", { offset: 1, stopColor: "#BCD8F5" }),
        ),
        L.createElement(
          "clipPath",
          { id: "clip0_9706_95038" },
          L.createElement("rect", {
            width: 10,
            height: 10,
            fill: "white",
            transform: "translate(2.5 15)",
          }),
        ),
      ),
    ),
  );
}
o(Q2, "SvgCosmosCategory");
var Ao = Q2;
import rn, { createElement as es } from "react";
function os(e) {
  return es(
    i,
    e,
    rn.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      rn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M17.3172 1.14659C18.8459 -0.382197 21.3246 -0.382197 22.8534 1.14659C24.3822 2.67538 24.3822 5.15404 22.8534 6.68283L21.9458 7.59042C21.4696 8.06664 21.4696 8.83873 21.9458 9.31494C22.9734 10.3425 22.9734 12.0084 21.9458 13.036C20.9183 14.0635 19.2523 14.0635 18.2248 13.036L10.964 5.77524C9.93643 4.7477 9.93643 3.08172 10.964 2.05419C11.9915 1.02665 13.6575 1.02665 14.685 2.05419C15.1612 2.5304 15.9333 2.5304 16.4096 2.05419L17.3172 1.14659ZM21.8551 2.14486C20.8777 1.16739 19.2929 1.16739 18.3154 2.14486L17.4078 3.05245C16.3803 4.07999 14.7143 4.07999 13.6868 3.05245C13.2105 2.57624 12.4384 2.57624 11.9622 3.05245C11.486 3.52866 11.486 4.30076 11.9622 4.77697L19.223 12.0377C19.6992 12.5139 20.4713 12.5139 20.9475 12.0377C21.4238 11.5615 21.4238 10.7894 20.9475 10.3132C19.92 9.28567 19.92 7.6197 20.9475 6.59216L21.8551 5.68456C22.8326 4.7071 22.8326 3.12232 21.8551 2.14486ZM11.4177 9.85952C11.1922 9.63393 10.8264 9.63393 10.6008 9.85951L3.49641 16.9639C2.33926 18.121 1.62441 19.6473 1.47625 21.277L1.41434 21.9581C1.38168 22.3173 1.68265 22.6183 2.04192 22.5857L2.72301 22.5237C4.35276 22.3756 5.87898 21.6607 7.03613 20.5036L14.1405 13.3992C14.3661 13.1736 14.3661 12.8079 14.1405 12.5823L11.4177 9.85952ZM9.60255 8.86125C10.3795 8.08433 11.6391 8.08434 12.416 8.86125L15.1388 11.584C15.9157 12.3609 15.9157 13.6206 15.1388 14.3975L8.0344 21.5019C6.64371 22.8925 4.80947 23.7517 2.85082 23.9297L2.16973 23.9916C0.932446 24.1041 -0.104108 23.0676 0.00837295 21.8303L0.0702906 21.1492C0.24835 19.1905 1.10746 17.3563 2.49815 15.9656L9.60255 8.86125Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(os, "SvgCustomColors");
var ts = os;
import an, { createElement as ns } from "react";
function rs(e) {
  return ns(
    i,
    e,
    an.createElement(
      "svg",
      { viewBox: "0 0 24 25", xmlns: "http://www.w3.org/2000/svg" },
      an.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9.37258 9.78494C9.37258 7.99775 10.1423 6.33088 11.4437 5.17318C11.7175 4.92967 11.5567 4.44003 11.1963 4.50607C7.66917 5.15238 4.97201 8.27321 5.00022 12.0067C5.03199 16.1273 8.40939 19.4968 12.5607 19.5C15.3021 19.502 17.82 17.9874 19.1426 15.6485C19.3229 15.3297 18.918 15.0255 18.6027 15.2119C14.6912 17.5249 9.37258 15.3579 9.37258 9.78494Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(rs, "SvgDarkMode");
var is = rs;
import e1, { createElement as as } from "react";
function ss(e) {
  return as(
    i,
    e,
    e1.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      e1.createElement(
        "g",
        { clipPath: "url(#clip0_3736_40135)" },
        e1.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M6.42673 4.10987C6.81047 1.73825 8.80256 0 11.1368 0H13.773C16.1072 0 18.0993 1.73825 18.483 4.10987C18.4847 4.1205 18.4862 4.13118 18.4874 4.14188L18.5405 4.60777C19.409 4.71723 20.1677 4.84185 20.8164 4.96697C20.8225 4.96804 20.8285 4.96921 20.8345 4.97045C21.7656 5.15059 22.4685 5.33139 22.9433 5.46895C23.1816 5.53796 23.3623 5.59608 23.4856 5.63775C23.5473 5.65859 23.5946 5.67531 23.6275 5.68723L23.6661 5.70141L23.6773 5.70564L23.6809 5.70701L23.6821 5.7075L23.6827 5.7077C23.6829 5.70779 23.6831 5.70787 23.4549 6.33476L23.6831 5.70787C24.0192 5.8377 24.1895 6.22362 24.0635 6.56985C23.9375 6.91583 23.5633 7.09125 23.2274 6.96194C23.2272 6.96189 23.2271 6.96185 23.227 6.9618L23.2266 6.96166L23.2222 6.95999L23.1963 6.95049C23.1719 6.94166 23.1333 6.92796 23.0803 6.91006C22.9745 6.87428 22.8115 6.82175 22.5914 6.75799C22.278 6.6672 21.8487 6.55361 21.3036 6.43317L20.5397 18.1139L20.5395 18.1166C20.3096 21.4316 17.6317 24 14.4051 24H10.5046C7.27806 24 4.6001 21.4316 4.37022 18.1166L4.37004 18.1139L3.60614 6.43317C3.06101 6.55361 2.63175 6.6672 2.31835 6.75799C2.09824 6.82175 1.93526 6.87428 1.82939 6.91006C1.77645 6.92796 1.7378 6.94166 1.71341 6.95049L1.68755 6.95999L1.68309 6.96166L1.68274 6.9618C1.34671 7.09138 0.972254 6.91596 0.84625 6.56985C0.720202 6.22362 0.890505 5.8377 1.22663 5.70787L1.45486 6.33476C1.22663 5.70787 1.22684 5.70779 1.22707 5.7077L1.22758 5.7075L1.22887 5.70701L1.23245 5.70564L1.24366 5.70141L1.28225 5.68723C1.31516 5.67531 1.36244 5.65859 1.42409 5.63775C1.54739 5.59608 1.72815 5.53796 1.96638 5.46895C2.44118 5.33139 3.14416 5.15059 4.07525 4.97045C4.08123 4.9692 4.08724 4.96804 4.09327 4.96697C4.74202 4.84186 5.50068 4.71723 6.36923 4.60777L6.42232 4.14188C6.42354 4.13118 6.42501 4.1205 6.42673 4.10987ZM7.01295 5.87877C7.02196 5.87794 7.03092 5.87693 7.03984 5.87573C8.53259 5.70737 10.3376 5.58798 12.4549 5.58798C14.5722 5.58798 16.3771 5.70737 17.8699 5.87573C17.8788 5.87693 17.8878 5.87794 17.8968 5.87877C18.6928 5.96908 19.3996 6.07327 20.0172 6.18058L19.2428 18.0212C19.2428 18.0217 19.2427 18.0222 19.2427 18.0227C19.0607 20.6363 16.9491 22.6609 14.4051 22.6609H10.5046C7.96052 22.6609 5.84891 20.6361 5.66701 18.0225C5.66698 18.022 5.66695 18.0216 5.66692 18.0212L4.89257 6.18058C5.51014 6.07327 6.21693 5.96908 7.01295 5.87877ZM17.215 4.46238C15.8455 4.33369 14.2588 4.24893 12.4549 4.24893C10.6509 4.24893 9.0642 4.33369 7.69472 4.46238L7.71155 4.31473C7.99687 2.5966 9.44306 1.33906 11.1368 1.33906H13.773C15.4667 1.33906 16.9129 2.59661 17.1982 4.31474L17.215 4.46238ZM12.4549 9.91416C12.8138 9.91416 13.1049 10.2139 13.1049 10.5837V17.6652C13.1049 18.035 12.8138 18.3348 12.4549 18.3348C12.0959 18.3348 11.8049 18.035 11.8049 17.6652L11.8049 10.5837C11.8049 10.2139 12.0959 9.91416 12.4549 9.91416ZM9.01736 11.3305C9.37635 11.3305 9.66736 11.6302 9.66736 12V16.2489C9.66736 16.6187 9.37635 16.9185 9.01736 16.9185C8.65838 16.9185 8.36736 16.6187 8.36736 16.2489V12C8.36736 11.6302 8.65838 11.3305 9.01736 11.3305ZM15.8924 11.3305C16.2513 11.3305 16.5424 11.6302 16.5424 12V16.2489C16.5424 16.6187 16.2513 16.9185 15.8924 16.9185C15.5334 16.9185 15.2424 16.6187 15.2424 16.2489V12C15.2424 11.6302 15.5334 11.3305 15.8924 11.3305Z",
          fill: "currentColor",
        }),
      ),
      e1.createElement(
        "defs",
        null,
        e1.createElement(
          "clipPath",
          { id: "clip0_3736_40135" },
          e1.createElement("rect", {
            width: 24,
            height: 24,
            fill: "white",
            transform: "translate(0.45459)",
          }),
        ),
      ),
    ),
  );
}
o(ss, "SvgDelete");
var ls = ss;
import u, { createElement as ps } from "react";
function cs(e) {
  return ps(
    i,
    e,
    u.createElement(
      "svg",
      { viewBox: "0 0 228 165", xmlns: "http://www.w3.org/2000/svg" },
      u.createElement("path", {
        d: "M37.772 108.328C37.772 90.9014 51.9386 76.78 69.4209 76.78H74.9067V68.0667C74.9067 52.2627 87.7472 39.4032 103.662 39.4032C119.517 39.4032 132.417 52.2026 132.417 68.0667C132.417 80.9263 142.907 91.3822 155.807 91.3822H181.127C183.9 91.3822 186.552 91.923 189.024 92.8844V108.328H37.772Z",
        fill: "url(#paint0_linear_7539_98594)",
      }),
      u.createElement("path", {
        d: "M82.3193 143.601H140.372C142.724 143.601 144.231 141.017 143.025 138.974L134.646 124.913C130.124 117.341 127.713 108.628 127.713 99.7948H95.0994C95.0994 108.628 92.6881 117.281 88.1668 124.913L79.7874 138.974C78.5817 141.017 80.0285 143.601 82.4398 143.601H82.3193Z",
        fill: "#D6EAFF",
      }),
      u.createElement("path", {
        d: "M140.373 144.202H82.3198C80.9936 144.202 79.7879 143.541 79.1248 142.339C78.4617 141.197 78.4617 139.815 79.1248 138.674L87.5042 124.612C91.9652 117.101 94.3766 108.568 94.3766 99.8547V99.2538H128.196V99.8547C128.196 108.568 130.547 117.161 135.068 124.612L143.447 138.674C144.111 139.815 144.171 141.197 143.447 142.339C142.784 143.481 141.579 144.202 140.252 144.202H140.373ZM95.6425 100.456C95.5219 109.169 93.1106 117.762 88.6496 125.273L80.2702 139.335C79.7879 140.116 79.7879 141.017 80.2702 141.798C80.6922 142.58 81.5361 143.06 82.3801 143.06H140.433C141.338 143.06 142.121 142.58 142.543 141.798C142.965 141.017 142.965 140.116 142.543 139.335L134.164 125.273C129.703 117.762 127.231 109.229 127.171 100.456H95.7631H95.6425Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M33.6713 117.341L189.083 117.341C194.043 117.341 198.065 113.333 198.065 108.388V9.77779C198.065 4.83286 194.043 0.824196 189.083 0.824196L33.6713 0.824196C28.7106 0.824196 24.6891 4.83286 24.6891 9.77779V108.388C24.6891 113.333 28.7106 117.341 33.6713 117.341Z",
        fill: "#D6EAFF",
      }),
      u.createElement("path", {
        d: "M189.022 117.942H33.611C28.306 117.942 24.0259 113.676 24.0259 108.388V9.77803C24.0259 4.48999 28.306 0.223511 33.611 0.223511H189.022C194.327 0.223511 198.607 4.48999 198.607 9.77803V108.388C198.607 113.676 194.327 117.942 189.022 117.942ZM33.611 1.42534C28.9691 1.42534 25.2316 5.151 25.2316 9.77803V108.388C25.2316 113.015 28.9691 116.741 33.611 116.741H189.022C193.664 116.741 197.402 113.015 197.402 108.388V9.77803C197.402 5.151 193.664 1.42534 189.022 1.42534H33.611Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M189.022 108.328V9.83826L33.7312 9.83826V108.328L189.022 108.328Z",
        fill: "white",
      }),
      u.createElement("path", {
        d: "M189.626 108.929H33.0688V9.23718H189.626V108.929ZM34.3348 107.727H188.42V10.439H34.2745V107.727H34.3348Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M37.772 108.328C37.772 90.9014 51.9386 76.78 69.4209 76.78H74.9067V68.0667C74.9067 52.2627 87.7472 39.4032 103.662 39.4032C119.517 39.4032 132.417 52.2026 132.417 68.0667C132.417 80.9263 142.907 91.3822 155.807 91.3822H181.127C183.9 91.3822 186.552 91.923 189.024 92.8844V108.328H37.772Z",
        fill: "url(#paint1_linear_7539_98594)",
      }),
      u.createElement("path", {
        opacity: 0.8,
        d: "M179.98 91.3822V104.122C176.484 103.761 173.229 102.559 170.456 100.696V91.3822H179.98Z",
        fill: "#3F5AF3",
      }),
      u.createElement("path", {
        d: "M186.972 143.601H218.138C222.001 143.601 225.131 140.481 225.131 136.631V62.2979C225.131 58.4482 222.001 55.3273 218.138 55.3273H186.972C183.11 55.3273 179.979 58.4482 179.979 62.2979V136.631C179.979 140.481 183.11 143.601 186.972 143.601Z",
        fill: "#D6EAFF",
      }),
      u.createElement("path", {
        d: "M218.14 144.202H186.973C182.753 144.202 179.377 140.777 179.377 136.631V62.2979C179.377 58.0915 182.814 54.7264 186.973 54.7264H218.14C222.36 54.7264 225.736 58.1516 225.736 62.2979V136.631C225.736 140.837 222.299 144.202 218.14 144.202ZM186.973 55.9283C183.416 55.9283 180.583 58.8126 180.583 62.2979V136.631C180.583 140.176 183.477 143.001 186.973 143.001H218.14C221.697 143.001 224.53 140.116 224.53 136.631V62.2979C224.53 58.7526 221.636 55.9283 218.14 55.9283H186.973Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M220.913 62.2377V136.571C220.913 138.073 219.647 139.335 218.14 139.335H186.973C185.466 139.335 184.2 138.073 184.2 136.571V62.2377C184.2 60.7354 185.466 59.4735 186.973 59.4735H218.14C219.647 59.4735 220.913 60.7354 220.913 62.2377Z",
        fill: "white",
      }),
      u.createElement("path", {
        d: "M218.139 139.996H186.972C185.103 139.996 183.596 138.493 183.596 136.631V62.2976C183.596 60.4348 185.103 58.9325 186.972 58.9325H218.139C220.008 58.9325 221.515 60.4348 221.515 62.2976V136.631C221.515 138.493 220.008 139.996 218.139 139.996ZM186.972 60.1343C185.766 60.1343 184.802 61.0958 184.802 62.2976V136.631C184.802 137.832 185.766 138.794 186.972 138.794H218.139C219.344 138.794 220.309 137.832 220.309 136.631V62.2976C220.309 61.0958 219.344 60.1343 218.139 60.1343H186.972Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        opacity: 0.8,
        d: "M167.261 91.3822V98.1124C165.332 96.1895 163.705 93.9661 162.62 91.3822H167.261Z",
        fill: "#3F5AF3",
      }),
      u.createElement("path", {
        d: "M202.586 67.045C201.259 67.045 200.174 65.9633 200.174 64.6413C200.174 63.3193 201.259 62.2377 202.586 62.2377C203.912 62.2377 204.997 63.3193 204.997 64.6413C204.997 65.9633 203.912 67.045 202.586 67.045ZM202.586 63.4395C201.923 63.4395 201.38 63.9803 201.38 64.6413C201.38 65.3023 201.923 65.8431 202.586 65.8431C203.249 65.8431 203.791 65.3023 203.791 64.6413C203.791 63.9803 203.249 63.4395 202.586 63.4395Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M111.317 6.8935C110.292 6.8935 109.448 6.05223 109.448 5.03068C109.448 4.00912 110.292 3.16785 111.317 3.16785C112.341 3.16785 113.185 4.00912 113.185 5.03068C113.185 6.05223 112.341 6.8935 111.317 6.8935ZM111.317 4.36967C110.955 4.36967 110.653 4.67013 110.653 5.03068C110.653 5.39122 110.955 5.69168 111.317 5.69168C111.678 5.69168 111.98 5.39122 111.98 5.03068C111.98 4.67013 111.678 4.36967 111.317 4.36967Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M46.2358 75.712H39.9061C39.5444 75.712 39.3032 75.4716 39.3032 75.111C39.3032 74.7505 39.5444 74.5101 39.9061 74.5101H46.2358C46.5975 74.5101 46.8387 74.7505 46.8387 75.111C46.8387 75.4716 46.5975 75.712 46.2358 75.712Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M54.6733 75.712H48.3436C47.9819 75.712 47.7407 75.4716 47.7407 75.111C47.7407 74.7505 47.9819 74.5101 48.3436 74.5101H54.6733C55.035 74.5101 55.2762 74.7505 55.2762 75.111C55.2762 75.4716 55.035 75.712 54.6733 75.712Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M227.183 79.1236C226.822 79.1236 226.581 78.8832 226.581 78.5227V72.2131C226.581 71.8525 226.822 71.6122 227.183 71.6122C227.545 71.6122 227.786 71.8525 227.786 72.2131V78.5227C227.786 78.8832 227.545 79.1236 227.183 79.1236Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M202.588 112.715H205.422C210.907 112.715 216.152 113.856 220.914 115.959V136.571C220.914 138.073 219.648 139.335 218.141 139.335H186.975C185.468 139.335 184.202 138.073 184.202 136.571V91.5624C194.57 93.0647 202.588 101.958 202.588 112.715Z",
        fill: "url(#paint2_linear_7539_98594)",
      }),
      u.createElement("path", {
        opacity: 0.8,
        d: "M197.042 98.4728C193.606 101.658 189.145 103.761 184.202 104.182V91.6224C189.265 92.3435 193.787 94.8674 197.042 98.4728Z",
        fill: "#3F5AF3",
      }),
      u.createElement("path", {
        d: "M140.373 140.597H128.316C127.955 140.597 127.713 140.356 127.713 139.996C127.713 139.635 127.955 139.395 128.316 139.395H140.373C140.735 139.395 140.976 139.635 140.976 139.996C140.976 140.356 140.735 140.597 140.373 140.597Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M124.641 140.597H120.722C120.361 140.597 120.12 140.356 120.12 139.996C120.12 139.635 120.361 139.395 120.722 139.395H124.641C125.003 139.395 125.244 139.635 125.244 139.996C125.244 140.356 125.003 140.597 124.641 140.597Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M117.826 140.597H116.5C116.138 140.597 115.897 140.356 115.897 139.996C115.897 139.635 116.138 139.395 116.5 139.395H117.826C118.188 139.395 118.429 139.635 118.429 139.996C118.429 140.356 118.188 140.597 117.826 140.597Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        opacity: 0.8,
        d: "M49.8892 83.5102C53.0842 80.9864 56.7615 79.1235 60.7402 77.9818V87.957C56.8218 87.1157 53.1445 85.6134 49.8892 83.5102Z",
        fill: "#3F5AF3",
      }),
      u.createElement("path", {
        d: "M113.365 140.597H97.6912C97.3295 140.597 97.0884 140.356 97.0884 139.996C97.0884 139.635 97.3295 139.395 97.6912 139.395H113.365C113.727 139.395 113.968 139.635 113.968 139.996C113.968 140.356 113.727 140.597 113.365 140.597Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M93.7137 140.597H82.3201C81.9584 140.597 81.7173 140.356 81.7173 139.996C81.7173 139.635 81.9584 139.395 82.3201 139.395H93.7137C94.0754 139.395 94.3166 139.635 94.3166 139.996C94.3166 140.356 94.0754 140.597 93.7137 140.597Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M162.063 50.1633C169.509 48.1187 173.883 40.4436 171.832 33.0205C169.781 25.5975 162.081 21.2374 154.635 23.2821C147.188 25.3267 142.814 33.0018 144.865 40.4249C146.916 47.8479 154.616 52.208 162.063 50.1633Z",
        fill: "url(#paint3_linear_7539_98594)",
      }),
      u.createElement(
        "g",
        { opacity: 0.8 },
        u.createElement("path", {
          d: "M187.816 135.91C187.455 135.91 187.213 135.669 187.213 135.309V119.384C187.213 119.024 187.455 118.784 187.816 118.784C188.178 118.784 188.419 119.024 188.419 119.384V135.309C188.419 135.669 188.178 135.91 187.816 135.91Z",
          fill: "white",
        }),
      ),
      u.createElement(
        "g",
        { opacity: 0.8 },
        u.createElement("path", {
          d: "M187.816 116.26C187.455 116.26 187.213 116.02 187.213 115.659V111.753C187.213 111.393 187.455 111.152 187.816 111.152C188.178 111.152 188.419 111.393 188.419 111.753V115.659C188.419 116.02 188.178 116.26 187.816 116.26Z",
          fill: "white",
        }),
      ),
      u.createElement(
        "g",
        { opacity: 0.8 },
        u.createElement("path", {
          d: "M187.816 109.469C187.455 109.469 187.213 109.229 187.213 108.868V107.967C187.213 107.606 187.455 107.366 187.816 107.366C188.178 107.366 188.419 107.606 188.419 107.967V108.868C188.419 109.229 188.178 109.469 187.816 109.469Z",
          fill: "white",
        }),
      ),
      u.createElement("path", {
        d: "M210.847 96.0089C210.847 95.2878 210.244 94.7469 209.581 94.7469C208.918 94.7469 208.315 95.3479 208.315 96.0089C208.315 96.6699 208.918 97.2708 209.581 97.2708C210.244 97.2708 210.847 96.6699 210.847 96.0089Z",
        fill: "url(#paint4_linear_7539_98594)",
      }),
      u.createElement("path", {
        d: "M200.48 75.9466C201.124 73.2337 199.439 70.5145 196.717 69.8731C193.996 69.2318 191.268 70.9112 190.624 73.6242C189.981 76.3372 191.666 79.0564 194.387 79.6977C197.109 80.339 199.837 78.6596 200.48 75.9466Z",
        fill: "url(#paint5_linear_7539_98594)",
      }),
      u.createElement("path", {
        d: "M218.139 139.996H186.972C185.103 139.996 183.596 138.493 183.596 136.631V62.2976C183.596 60.4348 185.103 58.9325 186.972 58.9325H218.139C220.008 58.9325 221.515 60.4348 221.515 62.2976V136.631C221.515 138.493 220.008 139.996 218.139 139.996ZM186.972 60.1343C185.766 60.1343 184.802 61.0958 184.802 62.2976V136.631C184.802 137.832 185.766 138.794 186.972 138.794H218.139C219.344 138.794 220.309 137.832 220.309 136.631V62.2976C220.309 61.0958 219.344 60.1343 218.139 60.1343H186.972Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M101.309 38.862H48.9829C46.5715 38.862 44.5822 36.879 44.5822 34.4753C44.5822 32.0717 43.1354 31.2905 41.3871 31.2905H23.7843C21.373 31.2905 19.3836 29.3075 19.3836 26.9038C19.3836 24.5002 17.9368 23.719 16.1886 23.719H4.61409C2.20274 23.719 0.213379 21.736 0.213379 19.3323C0.213379 16.9287 2.20274 14.9457 4.61409 14.9457H25.8942C28.3056 14.9457 30.2949 16.9287 30.2949 19.3323C30.2949 21.736 31.7417 22.5172 33.49 22.5172H76.1105C78.5219 22.5172 80.5112 24.5002 80.5112 26.9038C80.5112 29.3075 81.9581 30.0887 83.7063 30.0887H101.309C103.72 30.0887 105.71 32.0717 105.71 34.4753C105.71 36.879 103.72 38.862 101.309 38.862ZM4.5538 16.0874C2.80558 16.0874 1.35877 17.5296 1.35877 19.2722C1.35877 21.0149 2.80558 22.4571 4.5538 22.4571H16.1283C18.5396 22.4571 20.529 24.4401 20.529 26.8437C20.529 29.2474 21.9758 30.0286 23.724 30.0286H41.3269C43.7382 30.0286 45.7276 32.0116 45.7276 34.4153C45.7276 36.8189 47.1744 37.6001 48.9226 37.6001H101.249C102.997 37.6001 104.444 36.1579 104.444 34.4153C104.444 32.6726 102.997 31.2304 101.249 31.2304H83.646C81.2346 31.2304 79.2453 29.2474 79.2453 26.8437C79.2453 24.4401 77.7985 23.6589 76.0503 23.6589H33.4297C31.0183 23.6589 29.029 21.6759 29.029 19.2722C29.029 16.8686 27.5822 16.0874 25.8339 16.0874H4.5538Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M12.9149 45.4861C10.5035 45.4861 8.51416 43.5031 8.51416 41.0994C8.51416 38.6958 10.5035 36.7128 12.9149 36.7128C15.3262 36.7128 17.3156 38.6958 17.3156 41.0994C17.3156 43.5031 17.0744 41.7003 16.7127 41.7003C16.351 41.7003 16.1099 41.46 16.1099 41.0994C16.1099 39.3568 14.6631 37.9146 12.9149 37.9146C11.1666 37.9146 9.71984 39.3568 9.71984 41.0994C9.71984 42.8421 11.1666 44.2843 12.9149 44.2843C14.6631 44.2843 13.5177 44.5246 13.5177 44.8852C13.5177 45.2457 13.2766 45.4861 12.9149 45.4861Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M2.18466 45.4861C1.82296 45.4861 1.58182 45.2457 1.58182 44.8852C1.58182 44.5246 1.82296 44.2843 2.18466 44.2843C3.93289 44.2843 5.37969 42.8421 5.37969 41.0994C5.37969 39.3568 3.93289 37.9146 2.18466 37.9146C0.436432 37.9146 1.58182 37.6742 1.58182 37.3137C1.58182 36.9531 1.82296 36.7128 2.18466 36.7128C4.59601 36.7128 6.58537 38.6958 6.58537 41.0994C6.58537 43.5031 4.59601 45.4861 2.18466 45.4861Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M208.313 38.8621C205.902 38.8621 203.913 36.8791 203.913 34.4754C203.913 32.0718 205.902 30.0887 208.313 30.0887C210.725 30.0887 208.916 30.3291 208.916 30.6897C208.916 31.0502 208.675 31.2906 208.313 31.2906C206.565 31.2906 205.118 32.7328 205.118 34.4754C205.118 36.2181 206.565 37.6602 208.313 37.6602C210.062 37.6602 211.508 36.2181 211.508 34.4754C211.508 32.7328 211.749 33.8745 212.111 33.8745C212.473 33.8745 212.714 34.1149 212.714 34.4754C212.714 36.8791 210.725 38.8621 208.313 38.8621Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M219.95 38.8621C217.539 38.8621 215.549 36.8791 215.549 34.4754C215.549 32.0718 217.539 30.0887 219.95 30.0887C222.361 30.0887 220.553 30.3291 220.553 30.6897C220.553 31.0502 220.312 31.2906 219.95 31.2906C218.202 31.2906 216.755 32.7328 216.755 34.4754C216.755 36.2181 218.202 37.6602 219.95 37.6602C221.698 37.6602 220.553 37.9006 220.553 38.2612C220.553 38.6217 220.312 38.8621 219.95 38.8621Z",
        fill: "#0B27C4",
      }),
      u.createElement("path", {
        d: "M113.173 163.601L112.923 163.601L112.923 163.852L113.174 163.851L113.173 163.601ZM113.35 146.526C113.252 146.428 113.094 146.428 112.996 146.526L111.405 148.117C111.307 148.214 111.307 148.373 111.405 148.47C111.503 148.568 111.661 148.568 111.759 148.47L113.173 147.056L114.587 148.47C114.685 148.568 114.843 148.568 114.941 148.47C115.038 148.373 115.038 148.214 114.941 148.117L113.35 146.526ZM207.17 163.299L207.171 163.549L207.419 163.548L207.42 163.301L207.17 163.299ZM207.031 144.201L207.025 145.156L207.525 145.159L207.53 144.204L207.031 144.201ZM207.014 147.066L207.003 148.975L207.503 148.978L207.514 147.069L207.014 147.066ZM206.992 150.885L206.981 152.795L207.481 152.798L207.492 150.888L206.992 150.885ZM206.97 154.704L206.959 156.614L207.459 156.617L207.47 154.707L206.97 154.704ZM206.948 158.524L206.937 160.433L207.437 160.436L207.448 158.527L206.948 158.524ZM206.926 162.343L206.92 163.298L207.42 163.301L207.426 162.346L206.926 162.343ZM207.169 163.049L206.148 163.053L206.149 163.553L207.171 163.549L207.169 163.049ZM204.104 163.059L202.061 163.066L202.062 163.566L204.106 163.559L204.104 163.059ZM200.017 163.072L197.974 163.079L197.976 163.579L200.019 163.572L200.017 163.072ZM195.931 163.085L193.887 163.092L193.889 163.592L195.932 163.585L195.931 163.085ZM191.844 163.099L189.8 163.105L189.802 163.605L191.845 163.599L191.844 163.099ZM187.757 163.112L185.713 163.118L185.715 163.618L187.758 163.612L187.757 163.112ZM183.67 163.125L181.627 163.131L181.628 163.631L183.672 163.625L183.67 163.125ZM179.583 163.138L177.54 163.145L177.541 163.645L179.585 163.638L179.583 163.138ZM175.496 163.151L173.453 163.158L173.455 163.658L175.498 163.651L175.496 163.151ZM171.41 163.164L169.366 163.171L169.368 163.671L171.411 163.664L171.41 163.164ZM167.323 163.177L165.279 163.184L165.281 163.684L167.324 163.677L167.323 163.177ZM163.236 163.191L161.192 163.197L161.194 163.697L163.237 163.691L163.236 163.191ZM159.149 163.204L157.106 163.21L157.107 163.71L159.151 163.704L159.149 163.204ZM155.062 163.217L153.019 163.223L153.02 163.723L155.064 163.717L155.062 163.217ZM150.975 163.23L148.932 163.236L148.933 163.736L150.977 163.73L150.975 163.23ZM146.888 163.243L144.845 163.25L144.847 163.75L146.89 163.743L146.888 163.243ZM142.802 163.256L140.758 163.263L140.76 163.763L142.803 163.756L142.802 163.256ZM138.715 163.269L136.671 163.276L136.673 163.776L138.716 163.769L138.715 163.269ZM134.628 163.282L132.585 163.289L132.586 163.789L134.63 163.782L134.628 163.282ZM130.541 163.296L128.498 163.302L128.499 163.802L130.543 163.796L130.541 163.296ZM126.454 163.309L124.411 163.315L124.412 163.815L126.456 163.809L126.454 163.309ZM122.367 163.322L120.324 163.328L120.326 163.828L122.369 163.822L122.367 163.322ZM118.281 163.335L116.237 163.342L116.239 163.842L118.282 163.835L118.281 163.335ZM114.194 163.348L113.172 163.351L113.174 163.851L114.195 163.848L114.194 163.348ZM113.423 163.601L113.423 162.545L112.923 162.545L112.923 163.601L113.423 163.601ZM113.423 160.433L113.423 158.321L112.923 158.321L112.923 160.433L113.423 160.433ZM113.423 156.208L113.423 154.096L112.923 154.096L112.923 156.208L113.423 156.208ZM113.423 151.983L113.423 149.871L112.923 149.871L112.923 151.983L113.423 151.983ZM113.423 147.759L113.423 146.703L112.923 146.703L112.923 147.759L113.423 147.759ZM113.173 163.601L112.673 163.601L112.673 164.103L113.174 164.101L113.173 163.601ZM113.526 146.349C113.331 146.154 113.015 146.154 112.819 146.349L109.637 149.531C109.442 149.726 109.442 150.043 109.637 150.238C109.833 150.433 110.149 150.433 110.344 150.238L113.173 147.41L116.001 150.238C116.197 150.433 116.513 150.433 116.708 150.238C116.904 150.043 116.904 149.726 116.708 149.531L113.526 146.349ZM207.17 163.299L207.172 163.799L207.667 163.798L207.67 163.302L207.17 163.299ZM206.781 144.2L206.775 145.155L207.775 145.16L207.78 144.205L206.781 144.2ZM206.764 147.064L206.753 148.974L207.753 148.98L207.764 147.07L206.764 147.064ZM206.742 150.884L206.731 152.793L207.731 152.799L207.742 150.889L206.742 150.884ZM206.72 154.703L206.709 156.613L207.709 156.618L207.72 154.709L206.72 154.703ZM206.698 158.522L206.687 160.432L207.687 160.438L207.698 158.528L206.698 158.522ZM206.676 162.342L206.67 163.296L207.67 163.302L207.676 162.347L206.676 162.342ZM207.169 162.799L206.147 162.803L206.15 163.803L207.172 163.799L207.169 162.799ZM204.103 162.809L202.06 162.816L202.063 163.816L204.107 163.809L204.103 162.809ZM200.017 162.822L197.973 162.829L197.976 163.829L200.02 163.822L200.017 162.822ZM195.93 162.835L193.886 162.842L193.89 163.842L195.933 163.835L195.93 162.835ZM191.843 162.849L189.799 162.855L189.803 163.855L191.846 163.849L191.843 162.849ZM187.756 162.862L185.713 162.868L185.716 163.868L187.759 163.862L187.756 162.862ZM183.669 162.875L181.626 162.881L181.629 163.881L183.672 163.875L183.669 162.875ZM179.582 162.888L177.539 162.895L177.542 163.895L179.586 163.888L179.582 162.888ZM175.496 162.901L173.452 162.908L173.455 163.908L175.499 163.901L175.496 162.901ZM171.409 162.914L169.365 162.921L169.368 163.921L171.412 163.914L171.409 162.914ZM167.322 162.927L165.278 162.934L165.282 163.934L167.325 163.927L167.322 162.927ZM163.235 162.941L161.192 162.947L161.195 163.947L163.238 163.94L163.235 162.941ZM159.148 162.954L157.105 162.96L157.108 163.96L159.151 163.954L159.148 162.954ZM155.061 162.967L153.018 162.973L153.021 163.973L155.065 163.967L155.061 162.967ZM150.974 162.98L148.931 162.986L148.934 163.986L150.978 163.98L150.974 162.98ZM146.888 162.993L144.844 163L144.847 164L146.891 163.993L146.888 162.993ZM142.801 163.006L140.757 163.013L140.761 164.013L142.804 164.006L142.801 163.006ZM138.714 163.019L136.671 163.026L136.674 164.026L138.717 164.019L138.714 163.019ZM134.627 163.032L132.584 163.039L132.587 164.039L134.63 164.032L134.627 163.032ZM130.54 163.046L128.497 163.052L128.5 164.052L130.544 164.046L130.54 163.046ZM126.453 163.059L124.41 163.065L124.413 164.065L126.457 164.059L126.453 163.059ZM122.367 163.072L120.323 163.078L120.326 164.078L122.37 164.072L122.367 163.072ZM118.28 163.085L116.236 163.092L116.24 164.092L118.283 164.085L118.28 163.085ZM114.193 163.098L113.171 163.101L113.174 164.101L114.196 164.098L114.193 163.098ZM113.673 163.601L113.673 162.545L112.673 162.545L112.673 163.601L113.673 163.601ZM113.673 160.433L113.673 158.321L112.673 158.321L112.673 160.433L113.673 160.433ZM113.673 156.208L113.673 154.096L112.673 154.096L112.673 156.208L113.673 156.208ZM113.673 151.983L113.673 149.871L112.673 149.871L112.673 151.983L113.673 151.983ZM113.673 147.759L113.673 146.703L112.673 146.703L112.673 147.759L113.673 147.759Z",
        fill: "#0B27C4",
      }),
      u.createElement(
        "defs",
        null,
        u.createElement(
          "linearGradient",
          {
            id: "paint0_linear_7539_98594",
            x1: 8.23296,
            y1: 35.6175,
            x2: 371.22,
            y2: 246.222,
            gradientUnits: "userSpaceOnUse",
          },
          u.createElement("stop", { stopColor: "#2644F1" }),
          u.createElement("stop", { offset: 0.2, stopColor: "#1334F0" }),
          u.createElement("stop", { offset: 0.4, stopColor: "#3D59F3" }),
          u.createElement("stop", { offset: 0.6, stopColor: "#526AF4" }),
          u.createElement("stop", { offset: 0.8, stopColor: "#5E75F5" }),
          u.createElement("stop", { offset: 1, stopColor: "#0E2CD7" }),
        ),
        u.createElement(
          "linearGradient",
          {
            id: "paint1_linear_7539_98594",
            x1: -4.30604,
            y1: -56.4424,
            x2: 250.429,
            y2: 285.597,
            gradientUnits: "userSpaceOnUse",
          },
          u.createElement("stop", { stopColor: "#2644F1" }),
          u.createElement("stop", { offset: 0.2, stopColor: "#1334F0" }),
          u.createElement("stop", { offset: 0.4, stopColor: "#3D59F3" }),
          u.createElement("stop", { offset: 0.6, stopColor: "#526AF4" }),
          u.createElement("stop", { offset: 0.8, stopColor: "#5E75F5" }),
          u.createElement("stop", { offset: 1, stopColor: "#0E2CD7" }),
        ),
        u.createElement(
          "linearGradient",
          {
            id: "paint2_linear_7539_98594",
            x1: 40.3648,
            y1: -89.733,
            x2: 295.1,
            y2: 252.366,
            gradientUnits: "userSpaceOnUse",
          },
          u.createElement("stop", { stopColor: "#2644F1" }),
          u.createElement("stop", { offset: 0.2, stopColor: "#1334F0" }),
          u.createElement("stop", { offset: 0.4, stopColor: "#3D59F3" }),
          u.createElement("stop", { offset: 0.6, stopColor: "#526AF4" }),
          u.createElement("stop", { offset: 0.8, stopColor: "#5E75F5" }),
          u.createElement("stop", { offset: 1, stopColor: "#0E2CD7" }),
        ),
        u.createElement(
          "linearGradient",
          {
            id: "paint3_linear_7539_98594",
            x1: 42.7137,
            y1: -120.169,
            x2: 360.531,
            y2: 314.058,
            gradientUnits: "userSpaceOnUse",
          },
          u.createElement("stop", { stopColor: "#2644F1" }),
          u.createElement("stop", { offset: 0.2, stopColor: "#1334F0" }),
          u.createElement("stop", { offset: 0.4, stopColor: "#3D59F3" }),
          u.createElement("stop", { offset: 0.6, stopColor: "#526AF4" }),
          u.createElement("stop", { offset: 0.8, stopColor: "#5E75F5" }),
          u.createElement("stop", { offset: 1, stopColor: "#0E2CD7" }),
        ),
        u.createElement(
          "linearGradient",
          {
            id: "paint4_linear_7539_98594",
            x1: 47.7199,
            y1: -123.745,
            x2: 365.538,
            y2: 310.421,
            gradientUnits: "userSpaceOnUse",
          },
          u.createElement("stop", { stopColor: "#2644F1" }),
          u.createElement("stop", { offset: 0.2, stopColor: "#1334F0" }),
          u.createElement("stop", { offset: 0.4, stopColor: "#3D59F3" }),
          u.createElement("stop", { offset: 0.6, stopColor: "#526AF4" }),
          u.createElement("stop", { offset: 0.8, stopColor: "#5E75F5" }),
          u.createElement("stop", { offset: 1, stopColor: "#0E2CD7" }),
        ),
        u.createElement(
          "linearGradient",
          {
            id: "paint5_linear_7539_98594",
            x1: 48.4927,
            y1: -124.657,
            x2: 366.371,
            y2: 309.511,
            gradientUnits: "userSpaceOnUse",
          },
          u.createElement("stop", { stopColor: "#2644F1" }),
          u.createElement("stop", { offset: 0.2, stopColor: "#1334F0" }),
          u.createElement("stop", { offset: 0.4, stopColor: "#3D59F3" }),
          u.createElement("stop", { offset: 0.6, stopColor: "#526AF4" }),
          u.createElement("stop", { offset: 0.8, stopColor: "#5E75F5" }),
          u.createElement("stop", { offset: 1, stopColor: "#0E2CD7" }),
        ),
      ),
    ),
  );
}
o(cs, "SvgDesktop");
var ds = cs;
import Ce, { createElement as us } from "react";
function ms(e) {
  return us(
    i,
    e,
    Ce.createElement(
      "svg",
      { viewBox: "0 0 16 17", xmlns: "http://www.w3.org/2000/svg" },
      Ce.createElement("path", {
        fillRule: "evenodd",
        d: "M13.4552 8.11728H13.2618V3.37085C13.2618 3.32158 13.2418 3.27449 13.2065 3.24031C13.2038 3.23758 11.8927 1.96816 11.8902 1.9658C11.8549 1.9338 11.8102 1.91852 11.7636 1.91452H11.3889L11.0773 0.150203C11.0598 0.0512962 10.9651 -0.0145205 10.8668 0.00275184L3.4613 1.30817C3.36258 1.32563 3.29658 1.41981 3.31385 1.51871L3.43476 2.20852L1.1199 3.05104C1.02736 3.08268 0.975905 3.19304 1.01118 3.28413L2.29151 6.80168C1.84407 6.75477 1.42789 7.08567 1.43153 7.54748V15.2542C1.43153 15.6655 1.76607 16 2.17733 16H13.4554C13.8667 16 14.2012 15.6655 14.2012 15.2542V8.86326C14.2012 8.452 13.8667 8.11746 13.4554 8.11746L13.4552 8.11728ZM6.41086 8.11728C6.1496 8.1391 5.91997 7.86602 5.74179 7.71329V2.27815H11.5816V3.41194C11.5816 3.5123 11.6631 3.59376 11.7635 3.59376H12.8982V8.11728H6.41086ZM12.6404 3.23013H11.9453V2.53505L12.6404 3.23013ZM10.7508 0.392379L11.0197 1.91452H5.56016C5.4598 1.91452 5.37834 1.99598 5.37834 2.09634V7.38748C5.17908 7.21912 4.88817 6.89331 4.622 6.84095C4.54964 6.42678 3.74857 1.88761 3.70329 1.63489L10.7508 0.392379ZM1.41517 3.33049L3.50057 2.5716L4.24601 6.8015H2.67841L1.41517 3.33049ZM13.8374 15.254C13.8374 15.4647 13.666 15.6362 13.4552 15.6362H2.17715C1.96643 15.6362 1.79498 15.4647 1.79498 15.254V7.5473C1.79498 7.33657 1.96643 7.16512 2.17715 7.16512C2.38442 7.17058 4.11256 7.16112 4.36728 7.16512C4.50782 7.16512 4.64291 7.21676 4.74763 7.31057L5.78815 8.24255C5.9596 8.39618 6.18087 8.48091 6.41105 8.48091C6.41177 8.47836 13.0792 8.48182 13.0802 8.48164C13.0831 8.47964 13.452 8.48164 13.4554 8.48091C13.6661 8.48091 13.8376 8.65236 13.8376 8.86308L13.8374 15.254Z",
        fill: "currentColor",
      }),
      Ce.createElement("path", {
        fillRule: "evenodd",
        d: "M7.81629 10.5452H3.30512C3.20476 10.5452 3.12331 10.6267 3.12331 10.727V13.1862C3.12331 13.2866 3.20476 13.3681 3.30512 13.3681H7.81629C7.91665 13.3681 7.9981 13.2866 7.9981 13.1862V10.727C7.9981 10.6267 7.91665 10.5452 7.81629 10.5452ZM7.63447 13.0044H3.48694V10.9089H7.63447V13.0044Z",
        fill: "currentColor",
      }),
      Ce.createElement("path", {
        fillRule: "evenodd",
        d: "M7.81629 13.7564H3.30512C3.06767 13.7601 3.06495 14.1159 3.30512 14.12H7.81629C8.05373 14.1164 8.05646 13.7606 7.81629 13.7564Z",
        fill: "currentColor",
      }),
      Ce.createElement("path", {
        fillRule: "evenodd",
        d: "M6.71577 5.27262H11.9909C12.2282 5.26917 12.2313 4.91318 11.9909 4.909H6.71577C6.4785 4.91245 6.47541 5.26844 6.71577 5.27262Z",
        fill: "currentColor",
      }),
      Ce.createElement("path", {
        fillRule: "evenodd",
        d: "M11.9909 5.81807H6.71577C6.4785 5.82152 6.47541 6.17751 6.71577 6.18169H11.9909C12.2282 6.17824 12.2313 5.82225 11.9909 5.81807Z",
        fill: "currentColor",
      }),
      Ce.createElement("path", {
        fillRule: "evenodd",
        d: "M10.9 6.72713H6.71577C6.47814 6.73077 6.47577 7.08658 6.71577 7.09076H10.9C11.1377 7.08713 11.14 6.73132 10.9 6.72713Z",
        fill: "currentColor",
      }),
      Ce.createElement("path", {
        fillRule: "evenodd",
        d: "M6.71577 4.18174H8.71826C8.95662 4.17792 8.95771 3.8223 8.71826 3.81811H6.71577C6.47741 3.82193 6.47632 4.17756 6.71577 4.18174Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(ms, "SvgDocument");
var hs = ms;
import sn, { createElement as gs } from "react";
function Cs(e) {
  return gs(
    i,
    e,
    sn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      sn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M23.7846 4.31584C24.1751 4.70637 24.1751 5.33953 23.7846 5.73006L10.0607 19.4539C9.1495 20.3651 7.67211 20.3651 6.76089 19.4539L1.03703 13.7301C0.64651 13.3395 0.64651 12.7064 1.03703 12.3158C1.42756 11.9253 2.06072 11.9253 2.45125 12.3158L8.17511 18.0397C8.30528 18.1699 8.51634 18.1699 8.64651 18.0397L22.3704 4.31584C22.7609 3.92532 23.3941 3.92532 23.7846 4.31584Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(Cs, "SvgDone");
var z1 = Cs;
import V, { createElement as fs } from "react";
function ys(e) {
  return fs(
    i,
    e,
    V.createElement(
      "svg",
      { viewBox: "0 0 29 28", xmlns: "http://www.w3.org/2000/svg" },
      V.createElement("circle", { cx: 14.25, cy: 8, r: 7, fill: "#469BF5" }),
      V.createElement(
        "g",
        { clipPath: "url(#clip0_9706_64247)" },
        V.createElement("path", {
          d: "M14.2491 3L14.182 3.22789V9.84004L14.2491 9.90697L17.3183 8.09273L14.2491 3Z",
          fill: "#85BBF5",
        }),
        V.createElement("path", {
          d: "M14.2491 3L11.1798 8.09273L14.2491 9.90697V6.69762V3Z",
          fill: "#E2EBF5",
        }),
        V.createElement("path", {
          d: "M14.2491 10.4891L14.2113 10.5352V12.8905L14.2491 13.0009L17.3202 8.67578L14.2491 10.4891Z",
          fill: "#85BBF5",
        }),
        V.createElement("path", {
          d: "M14.2491 13.0009V10.4891L11.1798 8.67578L14.2491 13.0009Z",
          fill: "#E2EBF5",
        }),
        V.createElement("path", {
          d: "M14.2491 9.90858L17.3184 8.09433L14.2491 6.69922V9.90858Z",
          fill: "#69ADF5",
        }),
        V.createElement("path", {
          d: "M11.1798 8.09433L14.2491 9.90858V6.69922L11.1798 8.09433Z",
          fill: "#85BBF5",
        }),
      ),
      V.createElement("circle", { cx: 7.25, cy: 20, r: 7, fill: "#469BF5" }),
      V.createElement(
        "g",
        { clipPath: "url(#clip1_9706_64247)" },
        V.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M4.3298 22.9628H5.50681C5.78393 22.9628 5.92249 22.9628 6.04615 22.9285C6.18173 22.8882 6.30539 22.8168 6.4082 22.7184C6.50261 22.6285 6.57073 22.5092 6.70512 22.2741L6.7052 22.2739L6.70915 22.267L8.2357 19.5685C8.37128 19.3316 8.43833 19.2124 8.46813 19.0873C8.5009 18.9517 8.5009 18.8087 8.46813 18.6731C8.43855 18.5489 8.37082 18.4305 8.23726 18.1972L8.23422 18.1918L7.63676 17.1489C7.51311 16.9314 7.45053 16.8226 7.37157 16.7824C7.28664 16.7392 7.18532 16.7392 7.1004 16.7824C7.02144 16.8226 6.95887 16.9314 6.8352 17.1489L3.92902 22.2715C3.80685 22.486 3.74576 22.5933 3.75023 22.6812C3.75619 22.7766 3.80535 22.863 3.88581 22.9151C3.9603 22.9628 4.08247 22.9628 4.3298 22.9628ZM10.1657 22.9628H8.47915C8.23034 22.9628 8.10519 22.9628 8.03218 22.9151C7.95173 22.863 7.90257 22.7751 7.89661 22.6797C7.89216 22.5925 7.95374 22.4862 8.07694 22.2736L8.07697 22.2735L8.07986 22.2685L8.92165 20.8233C9.04531 20.6103 9.10788 20.5045 9.18536 20.4643C9.27024 20.4211 9.37014 20.4211 9.45501 20.4643C9.53194 20.5034 9.59184 20.6047 9.71043 20.8053L9.71061 20.8056L9.72022 20.8218L10.565 22.267L10.5772 22.288L10.5772 22.2881C10.6943 22.4901 10.7541 22.5932 10.7498 22.6783C10.7453 22.7736 10.6946 22.8615 10.6142 22.9137C10.5397 22.9628 10.4145 22.9628 10.1657 22.9628H10.1657Z",
          fill: "white",
        }),
      ),
      V.createElement("circle", { cx: 21.25, cy: 20, r: 7, fill: "#469BF5" }),
      V.createElement("path", {
        d: "M22.18 23.3046V24.4253L21.2029 25L20.2547 24.4253V23.3046L21.2029 23.8793L22.18 23.3046ZM16.9501 19.4253L17.8983 20V21.9253L19.5363 22.9023V24.023L16.9501 22.5V19.4253ZM25.4558 19.4253V22.5L22.8409 24.023V22.9023L24.4788 21.9253V20L25.4558 19.4253ZM22.8409 17.9023L23.8179 18.477V19.5977L22.18 20.5747V22.5287L21.2317 23.1034L20.2834 22.5287V20.5747L18.588 19.5977V18.477L19.565 17.9023L21.2029 18.8793L22.8409 17.9023ZM18.588 20.4023L19.5363 20.977V22.0977L18.588 21.523V20.4023ZM23.8179 20.4023V21.523L22.8696 22.0977V20.977L23.8179 20.4023ZM17.8983 16.9253L18.8754 17.5L17.8983 18.0747V19.1954L16.9501 18.6207V17.5L17.8983 16.9253ZM24.5075 16.9253L25.4846 17.5V18.6207L24.5075 19.1954V18.0747L23.5593 17.5L24.5075 16.9253ZM21.2029 16.9253L22.18 17.5L21.2029 18.0747L20.2547 17.5L21.2029 16.9253ZM21.2029 15L23.8179 16.523L22.8696 17.0977L21.2317 16.1207L19.565 17.0977L18.6167 16.523L21.2029 15Z",
        fill: "white",
      }),
      V.createElement(
        "defs",
        null,
        V.createElement(
          "clipPath",
          { id: "clip0_9706_64247" },
          V.createElement("rect", {
            width: 10,
            height: 10,
            fill: "white",
            transform: "translate(9.25 3)",
          }),
        ),
        V.createElement(
          "clipPath",
          { id: "clip1_9706_64247" },
          V.createElement("rect", {
            width: 8,
            height: 8,
            fill: "white",
            transform: "translate(3.25 16)",
          }),
        ),
      ),
    ),
  );
}
o(ys, "SvgEvmCategory");
var No = ys;
import ln, { createElement as ws } from "react";
function vs(e) {
  return ws(
    i,
    e,
    ln.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      ln.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM10.8 18V15.6H13.2V18H10.8ZM10.8 6V13.2H13.2V6H10.8Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(vs, "SvgError");
var $e = vs;
import Ho, { createElement as bs } from "react";
function ks(e) {
  return bs(
    i,
    e,
    Ho.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Ho.createElement(
        "g",
        { id: "Icons" },
        Ho.createElement("path", {
          id: "Vector",
          d: "M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z",
          fill: "currentColor",
        }),
      ),
    ),
  );
}
o(ks, "SvgExchange");
var Ss = ks;
import pn, { createElement as xs } from "react";
function Ls(e) {
  return xs(
    i,
    e,
    pn.createElement(
      "svg",
      { viewBox: "0 0 24 24" },
      pn.createElement("path", {
        fillRule: "evenodd",
        d: "M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
        fill: "currentColor",
      }),
    ),
  );
}
o(Ls, "SvgExit");
var Ts = Ls;
import cn, { createElement as $s } from "react";
function Is(e) {
  return $s(
    i,
    e,
    cn.createElement(
      "svg",
      { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
      cn.createElement("path", {
        fillRule: "evenodd",
        d: "M8.8548 12.9707C12.067 12.9707 14.6803 10.3574 14.6803 7.1452C14.6803 3.93297 12.067 1.31969 8.8548 1.31969C5.64257 1.31969 3.02929 3.93297 3.02929 7.1452C3.02929 8.37412 3.4121 9.51535 4.06437 10.4562L3.21525 11.3053L3.20468 11.2948C3.11783 11.2081 2.97714 11.2081 2.89045 11.2948L0.374595 13.8106C0.13297 14.0522 0 14.3745 0 14.7181C0 15.0617 0.13297 15.3839 0.374595 15.6254C0.616221 15.867 0.938332 16 1.28207 16C1.62582 16 1.94793 15.867 2.18955 15.6254L4.70541 13.1095C4.74716 13.0678 4.77047 13.0113 4.77047 12.9524C4.77047 12.8936 4.747 12.8369 4.70541 12.7953L4.69485 12.7848L5.54397 11.9356C6.48482 12.5879 7.62588 12.9709 8.85497 12.9709L8.8548 12.9707ZM8.8548 1.76404C11.8219 1.76404 14.236 4.17795 14.236 7.1452C14.236 10.1125 11.822 12.5264 8.8548 12.5264C5.88755 12.5264 3.47364 10.1123 3.47364 7.1452C3.47364 4.17812 5.88772 1.76404 8.8548 1.76404ZM1.87516 15.3112C1.71754 15.4688 1.50693 15.5556 1.28207 15.5556C1.05722 15.5556 0.846612 15.4688 0.688994 15.3112C0.531375 15.1536 0.444517 14.943 0.444517 14.7181C0.444517 14.4932 0.531375 14.2826 0.688994 14.125L3.04774 11.7663L4.23407 12.9526L1.87532 15.3113L1.87516 15.3112ZM4.38045 12.4704L3.52948 11.6196L4.334 10.815C4.5877 11.1269 4.87292 11.4121 5.18481 11.666L4.38028 12.4705L4.38045 12.4704ZM8.8548 11.6999C11.3663 11.6999 13.4095 9.6567 13.4095 7.1452C13.4095 4.6337 11.3663 2.59053 8.8548 2.59053C6.3433 2.59053 4.30013 4.6337 4.30013 7.1452C4.30013 9.6567 6.3433 11.6999 8.8548 11.6999ZM8.8548 3.03488C11.1212 3.03488 12.965 4.87868 12.965 7.14503C12.965 9.41138 11.1212 11.2554 8.8548 11.2554C6.58845 11.2554 4.74465 9.41155 4.74465 7.14503C4.74465 4.87851 6.58845 3.03488 8.8548 3.03488ZM6.51584 8.35165L6.24655 8.75324C6.18736 8.84144 6.19893 8.95899 6.27405 9.03411L6.96589 9.72595C7.04101 9.8009 7.15856 9.81247 7.24676 9.75328L7.64835 9.48399L8.05396 9.65234L8.14753 10.1265C8.16799 10.2307 8.25937 10.3058 8.36551 10.3058H9.34409C9.45023 10.3058 9.54161 10.2307 9.56207 10.1265L9.65563 9.65234L10.0613 9.48399L10.4628 9.75328C10.551 9.81247 10.6688 9.8009 10.7437 9.72595L11.4355 9.03411C11.5107 8.95899 11.5221 8.84128 11.463 8.75324L11.1938 8.35165L11.3621 7.94587L11.8363 7.85247C11.9404 7.83185 12.0156 7.74063 12.0156 7.63449V6.65591C12.0156 6.54977 11.9404 6.45839 11.8363 6.43793L11.3621 6.34453L11.1938 5.93892L11.463 5.53733C11.5222 5.44913 11.5107 5.33158 11.4355 5.25646L10.7437 4.56462C10.6686 4.4895 10.5509 4.4781 10.4628 4.53729L10.0613 4.80658L9.65563 4.63823L9.56207 4.16403C9.54161 4.05991 9.45023 3.98479 9.34409 3.98479H8.36551C8.25937 3.98479 8.16799 4.05991 8.14753 4.16403L8.05396 4.63823L7.64835 4.80658L7.24676 4.53729C7.15856 4.4781 7.04085 4.48967 6.96589 4.56462L6.27405 5.25646C6.19893 5.33158 6.18753 5.44913 6.24655 5.53733L6.51584 5.93892L6.34749 6.34453L5.8733 6.43793C5.76917 6.45855 5.69405 6.54977 5.69405 6.65591V7.63449C5.69405 7.74063 5.76917 7.83201 5.8733 7.85247L6.34749 7.94587L6.51584 8.35165ZM6.13857 6.83852L6.55022 6.75736C6.62316 6.74294 6.68403 6.69314 6.71253 6.62439L6.9721 5.99878C7.0006 5.93003 6.99289 5.85172 6.95147 5.78985L6.71756 5.44108L7.15118 5.00746L7.49995 5.24137C7.56183 5.28279 7.64013 5.2905 7.70888 5.26216L8.33449 5.0026C8.40307 4.97409 8.45304 4.91322 8.46729 4.84028L8.54845 4.42863H9.16165L9.24281 4.84028C9.25723 4.91322 9.30703 4.97409 9.37561 5.0026L10.0012 5.26216C10.07 5.29067 10.1484 5.28296 10.2101 5.24137L10.5589 5.00746L10.9925 5.44108L10.7586 5.78985C10.7172 5.85156 10.7095 5.93003 10.738 5.99878L10.9976 6.62439C11.0261 6.69297 11.0869 6.74294 11.1599 6.75719L11.5715 6.83835V7.45155L11.1599 7.53271C11.0869 7.54713 11.0261 7.59693 10.9976 7.66568L10.738 8.29129C10.7095 8.36004 10.7172 8.43834 10.7588 8.50022L10.9927 8.84899L10.5591 9.28261L10.2103 9.04869C10.1486 9.00728 10.0701 8.99957 10.0014 9.0279L9.37578 9.28747C9.3072 9.31598 9.25723 9.37684 9.24298 9.44978L9.16182 9.86144H8.54862L8.46746 9.44978C8.45304 9.37684 8.40324 9.31598 8.33466 9.28747L7.70905 9.0279C7.6403 8.9994 7.56199 9.00711 7.50012 9.04869L7.15135 9.28261L6.71773 8.84899L6.95164 8.50022C6.99306 8.43851 7.00077 8.36004 6.97227 8.29129L6.7127 7.66568C6.68419 7.5971 6.62333 7.54713 6.55038 7.53271L6.13873 7.45155V6.83835L6.13857 6.83852ZM8.8548 8.88839C9.8161 8.88839 10.5982 8.10634 10.5982 7.14503C10.5982 6.18373 9.8161 5.40167 8.8548 5.40167C7.8935 5.40167 7.11144 6.18373 7.11144 7.14503C7.11144 8.10634 7.8935 8.88839 8.8548 8.88839ZM8.8548 5.84619C9.57096 5.84619 10.1536 6.42888 10.1536 7.14503C10.1536 7.86119 9.57096 8.44388 8.8548 8.44388C8.13864 8.44388 7.55596 7.86119 7.55596 7.14503C7.55596 6.42888 8.13864 5.84619 8.8548 5.84619ZM15.8353 10.564C15.816 10.5692 15.7967 10.5716 15.7776 10.5716C15.6795 10.5716 15.5896 10.5062 15.5631 10.4067L15.4971 10.1602C15.1235 10.9799 14.5946 11.7351 13.9486 12.3656C13.1831 13.1126 12.2471 13.6912 11.2417 14.0393C11.2177 14.0477 11.1931 14.0516 11.1689 14.0516C11.0769 14.0516 10.9907 13.9939 10.959 13.902C10.9189 13.786 10.9803 13.6594 11.0963 13.6193C12.8617 13.0083 14.2829 11.7186 15.0641 10.0402L14.9068 10.1443C14.8046 10.2122 14.6666 10.1841 14.5988 10.0818C14.5311 9.97948 14.5591 9.84148 14.6614 9.77374L15.4164 9.27372C15.4761 9.23432 15.5509 9.22576 15.6178 9.25125C15.6847 9.27657 15.7352 9.33241 15.7538 9.40149L15.9924 10.2917C16.0241 10.4102 15.9538 10.5323 15.8353 10.564ZM10.9837 0.583581C10.9442 0.523888 10.9359 0.449103 10.961 0.382199C10.9863 0.315295 11.0423 0.264823 11.1113 0.246211L12.0015 0.00760352C12.12 -0.0240878 12.2419 0.0461697 12.2736 0.164719C12.3053 0.283268 12.235 0.405171 12.1165 0.436862L11.8707 0.50276C12.6997 0.880709 13.4635 1.41862 14.0981 2.07492C14.8337 2.83551 15.4047 3.76345 15.7491 4.75829C15.7892 4.87432 15.7278 5.00092 15.6118 5.041C15.5876 5.04938 15.5631 5.05324 15.539 5.05324C15.4469 5.05324 15.3607 4.99555 15.3291 4.90367C14.7192 3.14169 13.4281 1.71827 11.7505 0.936378L11.8542 1.09299C11.922 1.19527 11.894 1.33327 11.7917 1.40102C11.754 1.426 11.7114 1.43807 11.6691 1.43807C11.597 1.43807 11.5264 1.40303 11.4837 1.33847L10.9837 0.583581ZM1.7172 3.99837C1.68534 3.87982 1.75577 3.75792 1.87432 3.72622C1.99287 3.69453 2.11477 3.76479 2.14646 3.88334L2.21253 4.12966C2.58796 3.30635 3.12017 2.54777 3.77027 1.91562C4.53388 1.17314 5.46667 0.597331 6.46805 0.250738C6.58392 0.210663 6.71052 0.272034 6.75076 0.388067C6.79084 0.504101 6.72947 0.630699 6.61343 0.670775C4.84945 1.28129 3.42736 2.57159 2.64598 4.24972L2.80292 4.14576C2.90521 4.07785 3.04321 4.10602 3.11095 4.2083C3.17869 4.31059 3.15069 4.44859 3.04841 4.51633L2.29335 5.01635C2.25646 5.04083 2.2137 5.05324 2.17061 5.05324C2.14411 5.05324 2.11745 5.04854 2.09196 5.03882C2.02506 5.0135 1.97459 4.95766 1.95598 4.88858L1.7172 3.99837Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(Is, "SvgExplorer");
var Ps = Is;
import dn, { createElement as Ds } from "react";
function zs(e) {
  return Ds(
    i,
    e,
    dn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      dn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M21.4046 1.85421C21.1566 1.83395 20.8342 1.83345 20.3523 1.83345H14.6314C14.2724 1.83345 13.9814 1.54243 13.9814 1.18345C13.9814 0.824463 14.2724 0.533448 14.6314 0.533448L20.3786 0.533448C20.8274 0.533438 21.2032 0.53343 21.5104 0.558531C21.8312 0.58474 22.134 0.641521 22.4209 0.787689C22.8598 1.01133 23.2167 1.36818 23.4403 1.80709C23.5865 2.09396 23.6433 2.3968 23.6695 2.71758C23.6946 3.02482 23.6946 3.40062 23.6945 3.8495V9.59659C23.6945 9.95558 23.4035 10.2466 23.0445 10.2466C22.6856 10.2466 22.3945 9.95558 22.3945 9.59659V3.87565C22.3945 3.39375 22.394 3.07141 22.3738 2.82344C22.3541 2.58305 22.3192 2.47034 22.282 2.39727C22.183 2.20297 22.025 2.045 21.8307 1.946C21.7577 1.90877 21.6449 1.87385 21.4046 1.85421ZM21.8215 2.40646C22.0754 2.6603 22.0754 3.07186 21.8215 3.3257L12.6873 12.46C12.4334 12.7138 12.0219 12.7138 11.768 12.46C11.5142 12.2061 11.5142 11.7946 11.768 11.5407L20.9023 2.40646C21.1561 2.15262 21.5677 2.15262 21.8215 2.40646ZM7.93747 4.13908H10.4248C10.7838 4.13908 11.0748 4.4301 11.0748 4.78908C11.0748 5.14807 10.7838 5.43908 10.4248 5.43908H7.96644C6.80836 5.43908 5.97889 5.43959 5.32826 5.49275C4.68523 5.54528 4.27433 5.646 3.94301 5.81482C3.29435 6.14532 2.76698 6.67269 2.43648 7.32135C2.26766 7.65267 2.16694 8.06357 2.11441 8.7066C2.06125 9.35723 2.06074 10.1867 2.06074 11.3448V16.2616C2.06074 17.4196 2.06125 18.2491 2.11441 18.8997C2.16694 19.5428 2.26766 19.9537 2.43648 20.285C2.76698 20.9336 3.29435 21.461 3.94301 21.7915C4.27433 21.9603 4.68523 22.061 5.32827 22.1136C5.97889 22.1667 6.80836 22.1673 7.96644 22.1673H12.8832C14.0413 22.1673 14.8708 22.1667 15.5214 22.1136C16.1644 22.061 16.5753 21.9603 16.9066 21.7915C17.5553 21.461 18.0827 20.9336 18.4132 20.285C18.582 19.9537 18.6827 19.5428 18.7352 18.8997C18.7884 18.2491 18.7889 17.4196 18.7889 16.2616V13.8032C18.7889 13.4442 19.0799 13.1532 19.4389 13.1532C19.7979 13.1532 20.0889 13.4442 20.0889 13.8032V16.2905C20.0889 17.4133 20.0889 18.2958 20.0309 19.0056C19.9718 19.729 19.8492 20.33 19.5715 20.8752C19.1163 21.7684 18.3901 22.4947 17.4968 22.9498C16.9517 23.2276 16.3507 23.3502 15.6273 23.4093C14.9175 23.4673 14.035 23.4673 12.9121 23.4673H7.93758C6.8147 23.4673 5.93218 23.4673 5.2224 23.4093C4.49897 23.3502 3.89795 23.2276 3.35282 22.9498C2.45956 22.4947 1.73331 21.7684 1.27817 20.8752C1.00041 20.33 0.87783 19.729 0.818724 19.0056C0.760735 18.2958 0.760738 17.4133 0.760742 16.2905V11.3158C0.760738 10.193 0.760735 9.31049 0.818724 8.60074C0.87783 7.87731 1.00041 7.27629 1.27817 6.73116C1.73331 5.83789 2.45956 5.11165 3.35282 4.65651C3.89795 4.37875 4.49897 4.25617 5.2224 4.19706C5.93215 4.13907 6.81465 4.13908 7.93747 4.13908Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(zs, "SvgExternalLink");
var Ms = zs;
import o1, { createElement as As } from "react";
function Ns(e) {
  return As(
    i,
    e,
    o1.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      o1.createElement(
        "g",
        { id: "Icons" },
        o1.createElement(
          "g",
          { id: "Font" },
          o1.createElement("path", {
            d: "M20.2235 8.41095C19.7886 8.41095 19.4469 8.07056 19.4469 7.63735V5.73429C19.4469 5.37843 19.2295 5.09994 19.0276 5.09994H4.97239C4.77049 5.09994 4.55306 5.36296 4.55306 5.73429V7.63735C4.55306 8.07056 4.21139 8.41095 3.77653 8.41095C3.34167 8.41095 3 8.07056 3 7.63735V5.73429C3 4.52747 3.88525 3.55273 4.97239 3.55273H19.0276C20.1148 3.55273 21 4.52747 21 5.73429V7.63735C21 8.05509 20.6428 8.41095 20.2235 8.41095Z",
            fill: "#727272",
          }),
          o1.createElement("path", {
            d: "M11.9921 20.2625C11.5573 20.2625 11.2156 19.9221 11.2156 19.4889V4.32634C11.2156 3.89312 11.5573 3.55273 11.9921 3.55273C12.427 3.55273 12.7687 3.89312 12.7687 4.32634V19.4889C12.7687 19.9067 12.427 20.2625 11.9921 20.2625Z",
            fill: "#727272",
          }),
          o1.createElement("path", {
            d: "M14.6953 20.4481H9.2906C8.85575 20.4481 8.51407 20.1077 8.51407 19.6745C8.51407 19.2413 8.85575 18.9009 9.2906 18.9009H14.6953C15.1301 18.9009 15.4718 19.2413 15.4718 19.6745C15.4718 20.1077 15.1301 20.4481 14.6953 20.4481Z",
            fill: "#727272",
          }),
        ),
      ),
    ),
  );
}
o(Ns, "SvgFont");
var Hs = Ns;
import M1, { createElement as Vs } from "react";
function Es(e) {
  return Vs(
    i,
    e,
    M1.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      M1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M23.8071 0C24.1477 0 24.4237 0.276065 24.4237 0.616609V17.6986C24.4237 17.7076 24.4235 17.7165 24.4232 17.7255C24.3829 18.6498 23.8666 19.4876 23.0583 19.9387C22.2503 20.3897 21.2662 20.3897 20.4582 19.9387C19.6499 19.4876 19.1337 18.6498 19.0934 17.7255C19.093 17.7165 19.0928 17.7076 19.0928 17.6986V11.5193C19.0928 11.1389 18.9418 10.7742 18.6727 10.5052L18.6726 10.5051C18.4039 10.2362 18.0391 10.0851 17.6586 10.0851C17.3181 10.0851 17.042 9.80903 17.042 9.46848C17.042 9.12794 17.3181 8.85187 17.6586 8.85187C18.3659 8.85187 19.0445 9.13273 19.5447 9.63314M19.5448 9.63324C20.0451 10.1335 20.326 10.8119 20.326 11.5193V17.684C20.3517 18.1764 20.6283 18.6214 21.0592 18.8618L21.0593 18.8619C21.4937 19.1044 22.0229 19.1044 22.4573 18.8619L22.4573 18.8618C22.8882 18.6214 23.1649 18.1763 23.1905 17.684V0.616609C23.1905 0.276065 23.4666 0 23.8071 0",
        fill: "currentColor",
      }),
      M1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.53542 0.57105L5.53714 0.571045L14.4217 0.571047C15.3082 0.57351 16.1576 0.926858 16.7844 1.55365C17.4112 2.18044 17.7645 3.02981 17.767 3.91636L17.767 3.91808L17.767 20.3758H18.8651C19.2057 20.3758 19.4817 20.6518 19.4817 20.9924V23.3831C19.4817 23.7236 19.2057 23.9997 18.8651 23.9997H1.09952C0.758975 23.9997 0.48291 23.7236 0.48291 23.3831V20.9924C0.48291 20.6518 0.758975 20.3758 1.09952 20.3758H2.18995V3.91637C2.19242 3.02981 2.54577 2.18043 3.17256 1.55365C3.79938 0.926839 4.64891 0.573525 5.53542 0.57105ZM5.53805 1.80427C4.97773 1.80604 4.44078 2.02946 4.04457 2.42567C3.64832 2.82191 3.42493 3.35873 3.42317 3.91902V20.9924C3.42317 21.3329 3.14711 21.609 2.80656 21.609H1.71613V22.7665H18.2485V21.609H17.1504C16.8098 21.609 16.5338 21.3329 16.5338 20.9924V3.91862C16.5319 3.35847 16.3085 2.82182 15.9124 2.42566C15.5161 2.02942 14.9793 1.80603 14.419 1.80427H5.53805Z",
        fill: "currentColor",
      }),
      M1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.22655 4.30646C6.18948 4.30646 6.15949 4.33645 6.15949 4.37352V8.75265C6.15985 8.75356 6.16028 8.75458 6.16078 8.75571C6.16671 8.76915 6.17792 8.78734 6.19405 8.80464C6.21007 8.82182 6.22439 8.83114 6.2323 8.83503C6.23277 8.83526 6.23319 8.83546 6.23357 8.83564H13.7229C13.7599 8.83564 13.7899 8.80564 13.7899 8.76858V4.38944C13.7896 4.38853 13.7891 4.38752 13.7886 4.38639C13.7827 4.37294 13.7715 4.35476 13.7554 4.33746C13.7393 4.32028 13.725 4.31096 13.7171 4.30707C13.7166 4.30684 13.7162 4.30664 13.7158 4.30646H6.22655ZM4.92627 4.37352C4.92627 3.65538 5.50838 3.07324 6.22655 3.07324H13.7229C14.1221 3.07324 14.4468 3.27076 14.6572 3.49636C14.862 3.71596 15.0231 4.03077 15.0231 4.37352V8.76858C15.0231 9.48672 14.441 10.0689 13.7229 10.0689H6.22655C5.8273 10.0689 5.50257 9.87134 5.29217 9.64573C5.08738 9.42614 4.92627 9.11132 4.92627 8.76858V4.37352Z",
        fill: "currentColor",
      }),
      M1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M23.7244 3.19696C23.9967 3.40155 24.0515 3.7881 23.8469 4.06033L22.489 5.86725C22.3169 6.09312 22.2662 6.38829 22.3529 6.65787C22.4396 6.92722 22.6522 7.13715 22.922 7.22041L23.9853 7.53627C24.3118 7.63324 24.4978 7.97649 24.4008 8.30293C24.3038 8.62938 23.9606 8.8154 23.6341 8.71843L22.5634 8.40035C21.9063 8.1994 21.3894 7.68949 21.179 7.03563C20.9687 6.38201 21.0916 5.66758 21.5067 5.12163L22.8611 3.31944C23.0657 3.0472 23.4522 2.99237 23.7244 3.19696Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(Es, "SvgGas");
var Vo = Es;
import Eo, { createElement as Fs } from "react";
function Bs(e) {
  return Fs(
    i,
    e,
    Eo.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Eo.createElement(
        "g",
        { id: "Height" },
        Eo.createElement("path", {
          id: "Height_2",
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M12.3807 23.7933C12.1204 24.0689 11.6983 24.0689 11.4379 23.7933L7.19526 19.301C6.93491 19.0254 6.93491 18.5784 7.19526 18.3028C7.45561 18.0271 7.87772 18.0271 8.13807 18.3028L11.2426 21.59V2.41003L8.13807 5.69723C7.87772 5.97289 7.45561 5.97289 7.19526 5.69723C6.93491 5.42156 6.93491 4.97462 7.19526 4.69896L11.4379 0.206747C11.6983 -0.0689157 12.1204 -0.0689157 12.3807 0.206747L16.6234 4.69896C16.8837 4.97462 16.8837 5.42156 16.6234 5.69723C16.363 5.97289 15.9409 5.97289 15.6805 5.69723L12.576 2.41003V21.59L15.6805 18.3028C15.9409 18.0271 16.363 18.0271 16.6234 18.3028C16.8837 18.5784 16.8837 19.0254 16.6234 19.301L12.3807 23.7933Z",
          fill: "currentColor",
        }),
      ),
    ),
  );
}
o(Bs, "SvgHeight");
var Ws = Bs;
import Ie, { createElement as Zs } from "react";
function qs(e) {
  return Zs(
    i,
    e,
    Ie.createElement(
      "svg",
      { viewBox: "0 0 8 7", xmlns: "http://www.w3.org/2000/svg" },
      Ie.createElement(
        "g",
        { clipPath: "url(#clip0_14768_268730)" },
        Ie.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M4.0687 0.915086C2.84154 0.915086 1.84673 1.9099 1.84673 3.13706C1.84673 4.36422 2.84154 5.35904 4.0687 5.35904C5.29586 5.35904 6.29068 4.36422 6.29068 3.13706C6.29068 1.9099 5.29586 0.915086 4.0687 0.915086ZM1.0625 3.13706C1.0625 1.47678 2.40842 0.130859 4.0687 0.130859C5.72898 0.130859 7.0749 1.47678 7.0749 3.13706C7.0749 4.79734 5.72898 6.14326 4.0687 6.14326C2.40842 6.14326 1.0625 4.79734 1.0625 3.13706Z",
          fill: "#C8E2FF",
        }),
        Ie.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M7.07471 3.09881C7.08137 3.62208 6.95131 4.13803 6.69741 4.59563C6.4435 5.05322 6.07454 5.43661 5.62701 5.70787C5.17949 5.97913 4.6689 6.12887 4.14576 6.14228C3.62261 6.15568 3.10503 6.03229 2.6442 5.78431C2.18337 5.53632 1.79526 5.17233 1.51825 4.72834C1.40362 4.54461 1.45963 4.30274 1.64336 4.18811C1.82709 4.07348 2.06896 4.1295 2.1836 4.31323C2.38834 4.64139 2.67521 4.91043 3.01582 5.09372C3.35644 5.27701 3.739 5.36822 4.12567 5.35831C4.51234 5.3484 4.88973 5.23772 5.22051 5.03722C5.55129 4.83673 5.824 4.55335 6.01167 4.21513C6.19934 3.87691 6.29547 3.49556 6.29054 3.10879C6.28562 2.72202 6.17982 2.34323 5.98361 2.0099C5.78739 1.67656 5.50756 1.40022 5.17178 1.2082C4.83601 1.01619 4.45593 0.915151 4.06913 0.915086C3.85257 0.915049 3.67704 0.739464 3.67708 0.522906C3.67712 0.306348 3.8527 0.130823 4.06926 0.130859C4.59258 0.130948 5.10681 0.267645 5.56109 0.52743C6.01537 0.787216 6.39397 1.16109 6.65944 1.61207C6.92491 2.06306 7.06805 2.57553 7.07471 3.09881Z",
          fill: "#5BABFF",
        }),
      ),
      Ie.createElement(
        "defs",
        null,
        Ie.createElement(
          "clipPath",
          { id: "clip0_14768_268730" },
          Ie.createElement("rect", {
            width: 6.27381,
            height: 6.27381,
            fill: "white",
            transform: "translate(0.931763)",
          }),
        ),
      ),
    ),
  );
}
o(qs, "SvgInProgress");
var js = qs;
import un, { createElement as Os } from "react";
function Ys(e) {
  return Os(
    i,
    e,
    un.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      un.createElement("path", {
        d: "M12 24C9.62663 24 7.30655 23.2962 5.33316 21.9776C3.35977 20.6591 1.8217 18.7849 0.913451 16.5922C0.00519935 14.3995 -0.232441 11.9867 0.230582 9.65892C0.693604 7.33115 1.83649 5.19295 3.51472 3.51472C5.19295 1.83649 7.33115 0.693604 9.65892 0.230582C11.9867 -0.232441 14.3995 0.00519935 16.5922 0.913451C18.7849 1.8217 20.6591 3.35977 21.9776 5.33316C23.2962 7.30655 24 9.62663 24 12C23.9964 15.1815 22.731 18.2317 20.4813 20.4813C18.2317 22.731 15.1815 23.9964 12 24ZM9.91412 8.40428V9.70711L11.5837 9.99513V17.9201L9.91412 18.2081V19.4997H15.2762V18.2081L13.6066 17.9201V8.40428H9.91412ZM11.5837 3.50122V5.56235H13.6089V3.50122H11.5837Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(Ys, "SvgInfoError");
var A1 = Ys;
import eo, { createElement as Us } from "react";
function _s(e) {
  return Us(
    i,
    e,
    eo.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      eo.createElement("path", {
        d: "M12.2133 10.1543C11.969 10.1582 11.736 10.2584 11.5656 10.4334C11.3952 10.6082 11.3015 10.8434 11.3048 11.0872V17.5287C11.3013 17.775 11.3971 18.0125 11.5705 18.1879C11.744 18.3633 11.9807 18.4619 12.2278 18.4619C12.475 18.4619 12.7117 18.3633 12.8852 18.1879C13.0587 18.0124 13.1543 17.775 13.1507 17.5287V11.0872C13.1543 10.8385 13.0566 10.599 12.8798 10.4232C12.7033 10.2475 12.4628 10.1504 12.2133 10.1543Z",
        fill: "currentColor",
      }),
      eo.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M13.1508 7.38487C13.1508 7.89462 12.7375 8.30795 12.2278 8.30795C11.718 8.30795 11.3047 7.89462 11.3047 7.38487C11.3047 6.87511 11.718 6.46179 12.2278 6.46179C12.7375 6.46179 13.1508 6.87511 13.1508 7.38487Z",
        fill: "currentColor",
      }),
      eo.createElement("path", {
        d: "M12.2275 0.00012207C5.6104 0.00012207 0.227539 5.38298 0.227539 12.0001C0.227539 18.6173 5.6104 24.0001 12.2275 24.0001C18.8447 24.0001 24.2275 18.6173 24.2275 12.0001C24.2275 5.38298 18.8447 0.00012207 12.2275 0.00012207ZM12.2275 1.71441C17.9185 1.71441 22.5133 6.30928 22.5133 12.0001C22.5133 17.691 17.9184 22.2858 12.2275 22.2858C6.5367 22.2858 1.94182 17.691 1.94182 12.0001C1.94182 6.30928 6.5367 1.71441 12.2275 1.71441Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(_s, "SvgInfo");
var Rs = _s;
import _, { createElement as Gs } from "react";
function Ks(e) {
  return Gs(
    i,
    e,
    _.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      _.createElement(
        "g",
        { id: "Icons" },
        _.createElement(
          "g",
          { id: "Language" },
          _.createElement("path", {
            d: "M14.3359 18.2133C14.2438 18.2133 14.1433 18.1883 14.0596 18.1464C13.7498 17.9874 13.6242 17.6109 13.7749 17.3012L15.5666 13.728C15.6754 13.5188 15.8931 13.3849 16.1275 13.3849C16.3619 13.3849 16.5796 13.5188 16.6885 13.7364L18.4801 17.3096C18.6392 17.6192 18.5136 17.9958 18.1954 18.1547C17.8857 18.3137 17.5089 18.1883 17.3499 17.8703L16.1275 15.4184L14.9052 17.8703C14.788 18.0878 14.5619 18.2133 14.3359 18.2133Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M17.5928 17.5773H14.6458C14.3025 17.5773 14.0179 17.2928 14.0179 16.9497C14.0179 16.6066 14.3025 16.3221 14.6458 16.3221H17.5928C17.936 16.3221 18.2207 16.6066 18.2207 16.9497C18.2207 17.2928 17.9444 17.5773 17.5928 17.5773Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M16.119 21C13.4316 21 11.2381 18.8159 11.2381 16.1213C11.2381 13.4268 13.4232 11.2427 16.119 11.2427C18.8065 11.2427 21 13.4268 21 16.1213C21 18.8159 18.8149 21 16.119 21ZM16.119 12.5063C14.1181 12.5063 12.4939 14.1297 12.4939 16.1297C12.4939 18.1297 14.1181 19.7532 16.119 19.7532C18.1116 19.7532 19.7442 18.1297 19.7442 16.1297C19.7442 14.1297 18.12 12.5063 16.119 12.5063Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M6.02235 12.5899C5.09304 12.5899 4.35629 12.3305 3.83722 11.8284C3.28465 11.2928 3 10.4811 3 9.43513V6.15482C3 4.12135 4.12187 3 6.15631 3H9.43819C10.4847 3 11.2884 3.27615 11.8326 3.83682C12.3601 4.38075 12.6196 5.16739 12.5945 6.17157V9.43513C12.6196 10.456 12.3601 11.2594 11.8159 11.8033C11.2717 12.3473 10.468 12.5983 9.42981 12.5816H6.16467C6.10607 12.5899 6.06421 12.5899 6.02235 12.5899ZM6.15631 4.2636C4.80839 4.2636 4.25582 4.81592 4.25582 6.16319V9.4435C4.25582 10.1381 4.40652 10.6401 4.70791 10.933C5.00094 11.2175 5.46979 11.3431 6.13119 11.3347H9.42981C10.1331 11.3515 10.6187 11.2092 10.9117 10.9163C11.2047 10.6234 11.3387 10.1297 11.3219 9.45188V6.15482C11.3387 5.48536 11.2047 5.00835 10.9201 4.71547C10.627 4.41421 10.1247 4.2636 9.42981 4.2636H6.15631Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M9.48837 7.48523H6.08928C5.74602 7.48523 5.46136 7.20071 5.46136 6.85761C5.46136 6.51452 5.74602 6.23 6.08928 6.23H9.48837C9.83163 6.23 10.1163 6.51452 10.1163 6.85761C10.1163 7.20071 9.84 7.48523 9.48837 7.48523Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M7.79723 7.48528C7.45397 7.48528 7.16932 7.20076 7.16932 6.85766V6.28863C7.16932 5.94554 7.45397 5.66102 7.79723 5.66102C8.14049 5.66102 8.42514 5.94554 8.42514 6.28863V6.85766C8.42514 7.20076 8.14049 7.48528 7.79723 7.48528Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M6.08928 10.1296C5.74602 10.1296 5.46136 9.84513 5.46136 9.50204C5.46136 9.15894 5.74602 8.87442 6.08928 8.87442C7.15254 8.87442 8.01487 7.97067 8.01487 6.84934C8.01487 6.50624 8.29953 6.22173 8.64278 6.22173C8.98604 6.22173 9.2707 6.50624 9.2707 6.84934C9.2707 8.65686 7.84743 10.1296 6.08928 10.1296Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M9.49674 10.1296C8.71813 10.1296 7.97301 9.73635 7.44556 9.04179C7.23626 8.76564 7.29487 8.3723 7.57115 8.16309C7.84743 7.95389 8.24091 8.01249 8.45022 8.28864C8.73487 8.67357 9.11162 8.8828 9.49674 8.8828C9.83999 8.8828 10.1246 9.16731 10.1246 9.51041C10.1246 9.8535 9.83999 10.1296 9.49674 10.1296Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M9.48842 20.9999C5.91351 20.9999 3 18.0878 3 14.5146C3 14.1715 3.28465 13.887 3.62791 13.887C3.97117 13.887 4.25582 14.1715 4.25582 14.5146C4.25582 16.9916 5.98049 19.0669 8.29957 19.6109L8.07352 19.2343C7.89771 18.933 7.98981 18.5481 8.29121 18.3723C8.58423 18.1966 8.97772 18.2887 9.15354 18.5899L10.0326 20.0543C10.1498 20.2468 10.1498 20.4895 10.041 20.682C9.92377 20.8744 9.71447 20.9999 9.48842 20.9999Z",
            fill: "currentColor",
          }),
          _.createElement("path", {
            d: "M20.3722 10.1213C20.0289 10.1213 19.7443 9.83681 19.7443 9.49371C19.7443 7.01673 18.0196 4.9414 15.7005 4.39747L15.9266 4.77405C16.1024 5.0753 16.0103 5.46026 15.7089 5.63599C15.4158 5.81173 15.0224 5.71967 14.8465 5.41841L13.9675 3.95398C13.8503 3.76152 13.8503 3.51884 13.9591 3.32637C14.0679 3.12553 14.2772 3.00838 14.5033 3.00838C18.0782 3.00838 20.9917 5.9205 20.9917 9.49371C21.0001 9.83681 20.7154 10.1213 20.3722 10.1213Z",
            fill: "currentColor",
          }),
        ),
      ),
    ),
  );
}
o(Ks, "SvgLanguage");
var Xs = Ks;
import mn, { createElement as Js } from "react";
function Qs(e) {
  return Js(
    i,
    e,
    mn.createElement(
      "svg",
      { viewBox: "0 0 24 25", xmlns: "http://www.w3.org/2000/svg" },
      mn.createElement("path", {
        d: "M12.0363 4.5C12.0248 4.50117 12.0134 4.50307 12.0022 4.50569C11.9349 4.51415 11.8731 4.54737 11.829 4.59888C11.7848 4.65039 11.7614 4.71649 11.7634 4.7843V6.95074C11.8546 6.9463 11.944 6.93937 12.0363 6.93937C12.1268 6.93937 12.2198 6.94649 12.3093 6.95074V4.7843C12.3108 4.74752 12.3049 4.7108 12.2918 4.67636C12.2788 4.64193 12.2589 4.61048 12.2334 4.58392C12.2079 4.55736 12.1773 4.53623 12.1435 4.5218C12.1096 4.50738 12.0731 4.49997 12.0363 4.5ZM6.53762 6.76889C6.48594 6.77394 6.43678 6.79361 6.3959 6.82561C6.35502 6.85761 6.32411 6.90061 6.3068 6.94956C6.28949 6.9985 6.2865 7.05137 6.29817 7.10195C6.30985 7.15254 6.3357 7.19876 6.37271 7.23517L7.90802 8.77047C8.03137 8.63463 8.15858 8.50694 8.29468 8.38381L6.75938 6.8485C6.73071 6.81951 6.6959 6.79731 6.65753 6.78353C6.61915 6.76976 6.57818 6.76476 6.53762 6.76889ZM17.4724 6.76889C17.4099 6.77565 17.3517 6.80377 17.3075 6.8485L15.7722 8.38381C15.9075 8.50601 16.0419 8.63001 16.1646 8.76479L17.6942 7.23518C17.7348 7.1954 17.762 7.14391 17.7719 7.08793C17.7819 7.03194 17.7741 6.97424 17.7497 6.92289C17.7253 6.87154 17.6854 6.8291 17.6357 6.80149C17.586 6.77388 17.5289 6.76248 17.4724 6.76889ZM12.0249 7.81517C9.44027 7.81517 7.34498 9.91611 7.34498 12.5007C7.34498 15.0853 9.44009 17.1862 12.0249 17.1862C14.6094 17.1862 16.7104 15.0855 16.7104 12.5007C16.7104 9.91611 14.6094 7.81517 12.0249 7.81517ZM4.24599 12.2278C4.1736 12.2353 4.10717 12.2713 4.06132 12.3278C4.01546 12.3843 3.99394 12.4567 4.00148 12.5291C4.00902 12.6015 4.04501 12.6679 4.10152 12.7138C4.15804 12.7597 4.23046 12.7812 4.30285 12.7736H6.47511C6.47085 12.6845 6.46374 12.5966 6.46374 12.5064C6.46374 12.4142 6.47066 12.3188 6.47511 12.2278H4.30285C4.29338 12.2273 4.28389 12.2273 4.27442 12.2278C4.26495 12.2273 4.25546 12.2273 4.24599 12.2278ZM17.6031 12.2278C17.6075 12.3188 17.6088 12.4142 17.6088 12.5064C17.6088 12.5966 17.6073 12.6845 17.6031 12.7736H19.7695C19.8057 12.7742 19.8417 12.7676 19.8753 12.7541C19.909 12.7407 19.9396 12.7207 19.9654 12.6953C19.9912 12.6699 20.0117 12.6396 20.0257 12.6062C20.0397 12.5728 20.047 12.5369 20.047 12.5007C20.047 12.4645 20.0397 12.4286 20.0257 12.3952C20.0117 12.3618 19.9912 12.3315 19.9654 12.3061C19.9396 12.2807 19.909 12.2607 19.8753 12.2472C19.8417 12.2338 19.8057 12.2272 19.7695 12.2278H17.6031ZM7.90797 16.2309L6.37267 17.7662C6.34728 17.7916 6.32714 17.8217 6.3134 17.8549C6.29966 17.8881 6.29259 17.9236 6.29259 17.9596C6.29259 18.0321 6.32139 18.1016 6.37267 18.1529C6.42394 18.2042 6.49349 18.233 6.566 18.233C6.63852 18.233 6.70806 18.2042 6.75934 18.1529L8.28894 16.6176C8.15392 16.4951 8.03041 16.3659 7.90797 16.2309ZM16.1645 16.2422C16.0427 16.3759 15.912 16.5018 15.7778 16.6232L17.3074 18.1528C17.3587 18.2041 17.4282 18.2329 17.5008 18.2329C17.5733 18.2329 17.6428 18.2041 17.6941 18.1528C17.7454 18.1015 17.7742 18.032 17.7742 17.9595C17.7742 17.8869 17.7454 17.8174 17.6941 17.7661L16.1645 16.2422ZM11.7632 18.0561V20.2226C11.7626 20.2588 11.7692 20.2948 11.7827 20.3284C11.7961 20.362 11.8161 20.3926 11.8415 20.4185C11.8669 20.4443 11.8972 20.4648 11.9306 20.4788C11.9641 20.4928 11.9999 20.5 12.0361 20.5C12.0724 20.5 12.1082 20.4928 12.1416 20.4788C12.175 20.4648 12.2053 20.4443 12.2307 20.4185C12.2561 20.3926 12.2761 20.362 12.2896 20.3284C12.303 20.2948 12.3097 20.2588 12.3091 20.2226V18.0561C12.2197 18.0605 12.1266 18.0674 12.0361 18.0674C11.9439 18.0674 11.8544 18.0605 11.7632 18.0561Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(Qs, "SvgLightMode");
var e3 = Qs;
import hn, { createElement as o3 } from "react";
function t3(e) {
  return o3(
    i,
    e,
    hn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      hn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.477539 12.0001C0.477539 9.15583 2.78327 6.8501 5.62754 6.8501H7.82754C8.24175 6.8501 8.57754 7.18588 8.57754 7.6001C8.57754 8.01431 8.24175 8.3501 7.82754 8.3501H5.62754C3.6117 8.3501 1.97754 9.98426 1.97754 12.0001C1.97754 14.0159 3.6117 15.6501 5.62754 15.6501H7.82754C8.24175 15.6501 8.57754 15.9859 8.57754 16.4001C8.57754 16.8143 8.24175 17.1501 7.82754 17.1501H5.62754C2.78327 17.1501 0.477539 14.8444 0.477539 12.0001ZM15.8775 7.6001C15.8775 7.18588 16.2133 6.8501 16.6275 6.8501H18.8275C21.6718 6.8501 23.9775 9.15583 23.9775 12.0001C23.9775 14.8444 21.6718 17.1501 18.8275 17.1501H16.6275C16.2133 17.1501 15.8775 16.8143 15.8775 16.4001C15.8775 15.9859 16.2133 15.6501 16.6275 15.6501H18.8275C20.8434 15.6501 22.4775 14.0159 22.4775 12.0001C22.4775 9.98426 20.8434 8.3501 18.8275 8.3501H16.6275C16.2133 8.3501 15.8775 8.01431 15.8775 7.6001ZM7.07754 12.0001C7.07754 11.5859 7.41333 11.2501 7.82754 11.2501H16.6275C17.0418 11.2501 17.3775 11.5859 17.3775 12.0001C17.3775 12.4143 17.0418 12.7501 16.6275 12.7501H7.82754C7.41333 12.7501 7.07754 12.4143 7.07754 12.0001Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(t3, "SvgLink");
var n3 = t3;
import R, { createElement as r3 } from "react";
function i3(e) {
  return r3(
    i,
    e,
    R.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      R.createElement("path", {
        d: "M24.432 11.1616C24.5297 11.9542 24.3082 12.7531 23.8169 13.3826C23.3254 14.012 22.6039 14.4206 21.8113 14.5181C21.0187 14.6157 20.2196 14.3945 19.5903 13.903C18.9607 13.4115 18.5523 12.69 18.4547 11.8974C18.3572 11.1047 18.5784 10.3059 19.0699 9.67634C19.5615 9.047 20.2827 8.63838 21.0753 8.54093C21.8682 8.44325 22.667 8.66448 23.2964 9.15599C23.9259 9.64753 24.3343 10.369 24.432 11.1616Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M19.9341 3.46405C20.4122 3.93997 20.6819 4.5865 20.6834 5.26117C20.6849 5.93583 20.4185 6.58367 19.9425 7.06182C19.4664 7.53997 18.8201 7.80962 18.1452 7.81117C17.4706 7.81273 16.8229 7.54622 16.3446 7.07027C15.8664 6.59435 15.5968 5.94782 15.5952 5.27315C15.5937 4.59832 15.8602 3.95065 16.3361 3.4725C16.812 2.99412 17.4586 2.72469 18.1332 2.72315C18.8081 2.72137 19.4557 2.98788 19.9341 3.46405H19.9341Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M13.2107 0.786521C13.7696 0.902717 14.2596 1.23635 14.5727 1.71383C14.8856 2.19109 14.9962 2.77341 14.88 3.33253C14.7638 3.89142 14.4301 4.38138 13.9527 4.69448C13.4752 5.00738 12.8931 5.118 12.334 5.0018C11.7751 4.8856 11.2851 4.55197 10.972 4.0745C10.6591 3.59701 10.5485 3.01491 10.6647 2.45579C10.7809 1.89691 11.1145 1.40694 11.592 1.09384C12.0693 0.780943 12.6516 0.670326 13.2107 0.786521Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M7.17135 1.74731C7.633 1.52184 8.16556 1.48928 8.65131 1.65655C9.13727 1.82359 9.53694 2.17707 9.76217 2.63895C9.98742 3.10059 10.0202 3.63293 9.85294 4.11891C9.68567 4.60487 9.33241 5.00431 8.87054 5.22977C8.40889 5.45502 7.87632 5.4878 7.39057 5.32053C6.90462 5.15327 6.50495 4.80001 6.27971 4.33814C6.05447 3.87626 6.02168 3.34392 6.18895 2.85794C6.35621 2.37221 6.70948 1.97254 7.17135 1.74731Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M2.63401 5.40181C2.85056 4.99971 3.21807 4.7002 3.65569 4.56905C4.09326 4.43792 4.56495 4.48609 4.96706 4.70264C5.36916 4.91942 5.66867 5.28693 5.79982 5.72449C5.93073 6.16206 5.88278 6.63375 5.666 7.03586C5.44945 7.43774 5.08194 7.73725 4.64432 7.86839C4.20676 7.99953 3.73506 7.95135 3.33295 7.7348C2.93085 7.51803 2.63134 7.15052 2.5002 6.71295C2.36906 6.27561 2.41723 5.80392 2.63401 5.40181Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M0.56274 10.2383C0.521481 9.8407 0.639906 9.44326 0.891915 9.13308C1.14393 8.82263 1.5088 8.62526 1.90623 8.58422C2.30387 8.54297 2.70153 8.66139 3.01172 8.9134C3.32191 9.16541 3.51931 9.53029 3.56057 9.92771C3.60161 10.3254 3.48318 10.7228 3.23117 11.033C2.97938 11.3432 2.61428 11.5408 2.21686 11.5818C1.81944 11.6231 1.42178 11.5047 1.1116 11.2527C0.801376 11.0006 0.604001 10.6358 0.56274 10.2383Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M0.838025 15.3494C0.582888 15.08 0.445065 14.7203 0.455102 14.3492C0.465138 13.9783 0.622145 13.6264 0.891549 13.3712C1.16095 13.1161 1.52071 12.9783 1.89182 12.9883C2.2627 12.9983 2.61439 13.1553 2.86976 13.4248C3.1249 13.6942 3.26272 14.0539 3.25269 14.4248C3.24265 14.7959 3.08564 15.1476 2.81624 15.403C2.54683 15.6581 2.18707 15.7959 1.8162 15.7859C1.44509 15.7759 1.0934 15.6188 0.838025 15.3494Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M3.04198 19.3038C2.70389 19.2485 2.40169 19.0611 2.20186 18.7828C2.00181 18.5047 1.92063 18.1586 1.97594 17.8205C2.03126 17.4825 2.21859 17.1802 2.4967 16.9802C2.7748 16.7803 3.12118 16.6989 3.45923 16.7542C3.7971 16.8096 4.09952 16.9971 4.29935 17.2752C4.4994 17.5533 4.58058 17.8995 4.52527 18.2375C4.46995 18.5756 4.28262 18.8778 4.00451 19.0779C3.72619 19.2777 3.38003 19.3591 3.04198 19.3038Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M6.31283 21.765C6.03451 21.9107 5.70999 21.9399 5.41025 21.8462C5.11051 21.7523 4.86029 21.5433 4.71463 21.2652C4.569 20.9869 4.53978 20.6624 4.63367 20.3626C4.72734 20.0629 4.93631 19.8127 5.21442 19.667C5.49275 19.5214 5.81744 19.4922 6.11701 19.5861C6.41674 19.6797 6.66697 19.8887 6.81263 20.167C6.95826 20.4451 6.98747 20.7699 6.89358 21.0696C6.79992 21.3691 6.59095 21.6194 6.31283 21.765Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M9.33649 22.6063C9.20825 22.8289 8.99683 22.9915 8.74883 23.0582C8.50061 23.1251 8.23633 23.0905 8.01353 22.9623C7.79096 22.8341 7.62838 22.6226 7.56169 22.3744C7.49478 22.1264 7.52935 21.8619 7.65759 21.6393C7.78583 21.4168 7.99725 21.2542 8.24548 21.1873C8.49348 21.1206 8.75798 21.1552 8.98055 21.2834C9.20334 21.4116 9.36593 21.623 9.43261 21.871C9.4993 22.1193 9.46473 22.3838 9.33649 22.6063Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M11.5464 22.9354C11.461 23.084 11.3201 23.1924 11.1546 23.2367C10.9891 23.2813 10.8129 23.2581 10.6644 23.1727C10.3553 22.9948 10.2491 22.5998 10.4271 22.2907C10.5127 22.1424 10.6537 22.034 10.819 21.9894C10.9844 21.945 11.1606 21.968 11.3091 22.0534C11.4575 22.139 11.5658 22.28 11.6104 22.4453C11.655 22.6107 11.6319 22.7871 11.5464 22.9354Z",
        fill: "currentColor",
      }),
      R.createElement("path", {
        d: "M13.7535 22.6851C13.6964 22.7839 13.6025 22.8562 13.4921 22.8859C13.3819 22.9158 13.2644 22.9004 13.1654 22.8433C12.9593 22.7246 12.8886 22.4615 13.0073 22.2554C13.1259 22.0493 13.3891 21.9784 13.5951 22.097C13.6942 22.1541 13.7664 22.248 13.7961 22.3584C13.8257 22.4686 13.8103 22.5861 13.7535 22.6851Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(i3, "SvgLoading");
var Fo = i3;
import y, { createElement as a3 } from "react";
function s3(e) {
  return a3(
    i,
    e,
    y.createElement(
      "svg",
      { viewBox: "0 0 124 45", xmlns: "http://www.w3.org/2000/svg" },
      y.createElement(
        "g",
        { clipPath: "url(#clip0_4784_46479)" },
        y.createElement("path", {
          d: "M61.5225 16.129H59.7776V21.4426H56.1006V5.27441H62.5335C65.5899 5.27441 68.0452 7.74673 68.0452 10.8155C68.0452 12.8012 66.8507 14.6025 65.0824 15.5051L68.5058 21.4426H64.5555L61.5225 16.129ZM59.7776 12.8954H62.5335C63.5445 12.8954 64.372 11.9967 64.372 10.8155C64.372 9.63432 63.5445 8.73565 62.5335 8.73565H59.7776V12.8915V12.8954Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M81.3251 9.8931V21.4423H77.8784V20.3553C77.1211 21.2343 75.993 21.7641 74.4551 21.7641C71.4455 21.7641 68.9629 19.1074 68.9629 15.6658C68.9629 12.2241 71.4455 9.56738 74.4551 9.56738C75.993 9.56738 77.1211 10.0972 77.8784 10.9762V9.88918H81.3251V9.8931ZM77.8784 15.6658C77.8784 13.9351 76.7308 12.8481 75.146 12.8481C73.5612 12.8481 72.4135 13.9351 72.4135 15.6658C72.4135 17.3964 73.5612 18.4834 75.146 18.4834C76.7308 18.4834 77.8784 17.3964 77.8784 15.6658Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M94.8778 14.3472V21.4384H91.4311V14.8573C91.4311 13.425 90.5372 12.7539 89.4325 12.7539C88.1678 12.7539 87.2973 13.4917 87.2973 15.132V21.4384H83.8506V9.89308H87.2973V10.9801C87.918 10.1246 89.0656 9.57129 90.584 9.57129C92.9027 9.57129 94.8818 11.2352 94.8818 14.3511L94.8778 14.3472Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M109.027 9.89355V20.8659C109.027 24.747 106.018 26.3874 102.961 26.3874C100.572 26.3874 98.5738 25.4848 97.516 23.5933L100.455 21.8862C100.892 22.6946 101.56 23.3421 103.075 23.3421C104.683 23.3421 105.67 22.5102 105.67 20.8698V19.8063C104.913 20.7521 103.808 21.3094 102.317 21.3094C99.054 21.3094 96.665 18.6291 96.665 15.4425C96.665 12.256 99.054 9.57568 102.317 9.57568C103.812 9.57568 104.913 10.129 105.67 11.0787V9.9014H109.023L109.027 9.89355ZM105.674 15.4347C105.674 13.8414 104.527 12.7544 102.895 12.7544C101.263 12.7544 100.116 13.8414 100.116 15.4347C100.116 17.0279 101.263 18.115 102.895 18.115C104.527 18.115 105.674 17.0279 105.674 15.4347Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M110.979 15.6658C110.979 12.2241 113.688 9.56738 117.069 9.56738C120.449 9.56738 123.158 12.2241 123.158 15.6658C123.158 19.1074 120.445 21.7641 117.069 21.7641C113.692 21.7641 110.979 19.1074 110.979 15.6658ZM119.708 15.6658C119.708 14.0254 118.56 12.9423 117.065 12.9423C115.57 12.9423 114.422 14.0293 114.422 15.6658C114.422 17.3022 115.57 18.3892 117.065 18.3892C118.56 18.3892 119.708 17.3022 119.708 15.6658Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M56.7563 36.4374H61.7527V37.1556H56.0029V27.1133H61.6825V27.8314H56.7602V31.7322H61.3272V32.4503H56.7602V36.4374H56.7563Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M69.6027 37.1556H68.7322L66.3199 34.0279L63.9076 37.1556H63.0371L65.8905 33.4667L63.2089 29.9819H64.0793L66.3199 32.8938L68.5761 29.9819H69.431L66.761 33.4549L69.6027 37.1556Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M74.2122 37.3128C73.1387 37.3128 72.2448 36.9557 71.5305 36.2375C70.8162 35.5194 70.4609 34.6325 70.4609 33.569C70.4609 32.5055 70.8162 31.6186 71.5305 30.9005C72.2448 30.1823 73.1387 29.8252 74.2122 29.8252C74.907 29.8252 75.5354 29.99 76.0975 30.3197C76.6596 30.6493 77.0695 31.0967 77.3232 31.6618L76.7377 32.0071C76.5269 31.548 76.199 31.183 75.7462 30.9162C75.2934 30.6493 74.7821 30.5159 74.2122 30.5159C73.3573 30.5159 72.6391 30.8102 72.0575 31.3988C71.4758 31.9875 71.187 32.7135 71.187 33.5729C71.187 34.4323 71.4758 35.1583 72.0575 35.747C72.6391 36.3356 73.3573 36.6299 74.2122 36.6299C74.7821 36.6299 75.2934 36.4965 75.7462 36.2297C76.199 35.9628 76.5425 35.5978 76.7806 35.1387L77.3818 35.4958C77.0968 36.0491 76.6713 36.4926 76.1053 36.8222C75.5393 37.1519 74.907 37.3167 74.2161 37.3167L74.2122 37.3128Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M82.5582 29.825C83.4053 29.825 84.0766 30.084 84.5763 30.6059C85.0759 31.1279 85.3258 31.8225 85.3258 32.6937V37.1556H84.5997V32.6937C84.5997 32.0226 84.4163 31.4928 84.0493 31.1004C83.6824 30.708 83.1671 30.5117 82.4997 30.5117C81.7658 30.5117 81.1686 30.7551 80.7002 31.2417C80.2357 31.7283 80.0014 32.4386 80.0014 33.3647V37.1517H79.2871V27.1094H80.0014V31.3398C80.5167 30.3273 81.3677 29.8171 82.5543 29.8171L82.5582 29.825Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M93.96 29.9821H94.6899V37.1558H93.96V35.535C93.6555 36.0884 93.2379 36.524 92.7031 36.8418C92.1683 37.1558 91.5672 37.3167 90.8919 37.3167C89.8731 37.3167 89.0026 36.9556 88.2805 36.2336C87.5583 35.5115 87.1953 34.6246 87.1953 33.5729C87.1953 32.5212 87.5583 31.6343 88.2805 30.9122C89.0026 30.1901 89.8731 29.8291 90.8919 29.8291C91.5672 29.8291 92.1722 29.9861 92.7031 30.3039C93.234 30.6179 93.6555 31.0535 93.96 31.6107V29.99V29.9821ZM88.7996 35.7352C89.3852 36.3277 90.0995 36.626 90.9465 36.626C91.7936 36.626 92.5079 36.3277 93.0856 35.7352C93.6672 35.1426 93.9561 34.4205 93.9561 33.569C93.9561 32.7174 93.6672 31.9953 93.0856 31.4027C92.504 30.8102 91.7897 30.5119 90.9465 30.5119C90.1034 30.5119 89.3852 30.8102 88.7996 31.4027C88.2141 31.9953 87.9214 32.7174 87.9214 33.569C87.9214 34.4205 88.2141 35.1426 88.7996 35.7352Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M100.499 29.8252C101.346 29.8252 102.017 30.0842 102.517 30.6062C103.016 31.1281 103.266 31.8227 103.266 32.6939V37.1558H102.54V32.6939C102.54 32.0228 102.357 31.4931 101.99 31.1006C101.623 30.7082 101.108 30.512 100.44 30.512C99.7062 30.512 99.109 30.7553 98.6406 31.2419C98.1761 31.7285 97.9419 32.4388 97.9419 33.365V37.1519H97.2275V29.9783H97.9419V31.34C98.4571 30.3275 99.3081 29.8174 100.495 29.8174L100.499 29.8252Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M111.955 29.9822H112.669V36.8105C112.669 37.8543 112.33 38.6745 111.655 39.2788C110.979 39.8832 110.132 40.1814 109.113 40.1814C108.294 40.1814 107.595 40.0284 107.017 39.7223C106.436 39.4162 106.014 38.9963 105.749 38.4587L106.377 38.1016C106.834 39.0277 107.747 39.4947 109.117 39.4947C110.003 39.4947 110.698 39.2514 111.202 38.7687C111.705 38.286 111.959 37.6346 111.959 36.8105V35.4919C111.662 36.057 111.249 36.5004 110.71 36.8262C110.171 37.1519 109.566 37.3128 108.891 37.3128C107.864 37.3128 106.99 36.9517 106.272 36.2297C105.553 35.5076 105.194 34.6207 105.194 33.569C105.194 32.5173 105.553 31.6304 106.272 30.9083C106.99 30.1862 107.864 29.8252 108.891 29.8252C109.566 29.8252 110.171 29.9861 110.71 30.3118C111.249 30.6375 111.662 31.081 111.959 31.6461V29.9822H111.955ZM106.783 35.7352C107.369 36.3278 108.083 36.626 108.93 36.626C109.777 36.626 110.491 36.3278 111.077 35.7352C111.662 35.1426 111.955 34.4206 111.955 33.569C111.955 32.7174 111.662 31.9953 111.077 31.4028C110.491 30.8102 109.777 30.5119 108.93 30.5119C108.083 30.5119 107.369 30.8102 106.783 31.4028C106.198 31.9953 105.905 32.7174 105.905 33.569C105.905 34.4206 106.198 35.1426 106.783 35.7352Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M118.419 29.8252C119.465 29.8252 120.316 30.198 120.968 30.9436C121.62 31.6892 121.944 32.5761 121.944 33.5965C121.944 33.6357 121.944 33.6906 121.936 33.7691C121.932 33.8476 121.928 33.9025 121.928 33.9418H115.464C115.55 34.7463 115.87 35.3938 116.428 35.8843C116.987 36.3788 117.674 36.6221 118.489 36.6221C119.059 36.6221 119.559 36.5044 119.988 36.265C120.418 36.0256 120.738 35.7117 120.96 35.3192L121.589 35.692C121.296 36.1904 120.874 36.5828 120.332 36.8772C119.789 37.1715 119.173 37.3167 118.478 37.3167C117.385 37.3167 116.483 36.9635 115.78 36.2611C115.078 35.5586 114.723 34.6599 114.723 33.5729C114.723 32.4859 115.066 31.6108 115.757 30.8965C116.448 30.1862 117.334 29.8291 118.419 29.8291V29.8252ZM118.419 30.5119C117.611 30.5119 116.936 30.767 116.393 31.2733C115.851 31.7795 115.542 32.4349 115.464 33.2393H121.202C121.124 32.3878 120.824 31.7206 120.297 31.2379C119.77 30.7553 119.141 30.5119 118.419 30.5119Z",
          fill: "currentColor",
        }),
        y.createElement("path", {
          d: "M22.3785 44.9961C34.7378 44.9961 44.757 34.9234 44.757 22.498C44.757 10.0727 34.7378 0 22.3785 0C10.0192 0 0 10.0727 0 22.498C0 34.9234 10.0192 44.9961 22.3785 44.9961Z",
          fill: "white",
        }),
        y.createElement("path", {
          d: "M19.3255 15.3717C19.3255 15.3717 20.2663 15.8936 21.6871 16.6863L40.2442 8.94759C39.5728 8.05677 38.8389 7.21697 38.0465 6.43604C37.9177 6.5106 37.8084 6.55376 37.8084 6.55376L18.4512 14.7359C18.6698 14.9596 18.9547 15.1755 19.3255 15.3678V15.3717Z",
          fill: "url(#paint0_linear_4784_46479)",
        }),
        y.createElement("path", {
          d: "M42.2159 12.0829L38.7964 13.4133C36.0601 14.4218 25.2905 18.6875 25.2905 18.6875C27.0509 19.6647 28.9519 20.7164 30.6265 21.6347C34.9086 23.9853 32.1996 29.1458 31.6336 30.1269C31.6258 30.1387 31.618 30.1544 31.6102 30.1661C31.5633 30.2446 31.536 30.2917 31.536 30.2917C31.536 30.2917 31.9381 26.4341 29.233 25.0096C26.5084 23.5851 20.2589 20.2416 17.6319 18.8327C16.3945 18.1695 15.4967 16.9648 15.3289 15.5677C15.204 14.5199 15.4655 13.3152 16.7146 12.2635C17.4445 11.5845 18.2252 11.2196 18.2252 11.2196L32.1879 5.45871C32.1879 5.45871 32.2777 5.42339 32.4065 5.35668L35.3106 4.14407C31.657 1.5344 27.1993 0 22.3785 0C10.0202 0 0 10.0737 0 22.498C0 26.4969 1.04222 30.2525 2.86514 33.5057L8.26752 31.1394L19.0215 26.6029C17.1674 25.5825 15.4538 24.6289 14.6419 24.1933C14.2359 23.9736 13.7284 23.6322 13.3225 23.4163C11.1444 22.2587 9.7157 18.9897 13.0219 15.1125C13.0219 15.1125 12.6784 18.7935 14.7238 20.0414C16.6756 21.2344 24.2444 25.1312 26.4888 26.3399C27.0666 26.65 27.5974 27.0463 28.019 27.5486C28.8934 28.5886 29.2252 29.8757 28.8582 31.2335C28.8426 31.3003 28.8192 31.367 28.7997 31.4298C28.788 31.4729 28.7724 31.5161 28.7567 31.5553C28.7333 31.622 28.7099 31.6848 28.6865 31.7476C28.6787 31.7672 28.6709 31.7869 28.6631 31.8065C27.8941 33.6784 25.8409 34.2396 25.8409 34.2396L25.591 34.322L12.5223 39.714L9.64153 40.9854C13.2561 43.5048 17.6436 44.9882 22.3785 44.9882C34.7368 44.9882 44.757 34.9145 44.757 22.4902C44.757 18.7307 43.8358 15.1871 42.212 12.0712L42.2159 12.0829Z",
          fill: "url(#paint1_linear_4784_46479)",
        }),
        y.createElement("path", {
          d: "M22.6365 28.5845L8.29916 34.7064L4.66895 36.2487C5.33644 37.1159 6.06248 37.9322 6.84707 38.6896L7.34671 38.4384L26.1262 30.5663L22.6326 28.5806L22.6365 28.5845Z",
          fill: "url(#paint2_linear_4784_46479)",
        }),
        y.createElement("path", {
          opacity: 0.1,
          d: "M19.0181 26.603L22.6366 28.5848L20.8254 29.3579L17.0391 27.4389L19.0181 26.603Z",
          fill: "#4D4D4D",
        }),
        y.createElement("path", {
          opacity: 0.1,
          d: "M25.8408 34.2513C25.8408 34.2513 28.8464 32.1126 26.1257 30.5703L24.4199 31.2845C24.4199 31.2845 27.2694 32.0537 25.8408 34.2513Z",
          fill: "#4D4D4D",
        }),
        y.createElement("path", {
          opacity: 0.1,
          d: "M19.0181 26.603L22.6366 28.5848L20.8254 29.3579L17.0391 27.4389L19.0181 26.603Z",
          fill: "#4D4D4D",
        }),
        y.createElement("path", {
          opacity: 0.1,
          d: "M25.8408 34.2513C25.8408 34.2513 28.8464 32.1126 26.1257 30.5703L24.4199 31.2845C24.4199 31.2845 27.2694 32.0537 25.8408 34.2513Z",
          fill: "#4D4D4D",
        }),
        y.createElement("path", {
          opacity: 0.3,
          d: "M20.3095 13.9196L18.3968 14.7281C18.3968 14.7281 15.6293 12.295 19.0097 10.9019C19.0097 10.9019 17.9128 12.7737 20.3056 13.9196H20.3095Z",
          fill: "#4D4D4D",
        }),
        y.createElement("path", {
          opacity: 0.3,
          d: "M25.2904 18.7109L21.6602 16.6938L23.405 15.9639L26.9728 18.0281L25.2904 18.7109Z",
          fill: "#4D4D4D",
        }),
      ),
      y.createElement(
        "defs",
        null,
        y.createElement(
          "linearGradient",
          {
            id: "paint0_linear_4784_46479",
            x1: 18.4512,
            y1: 11.5651,
            x2: 40.2442,
            y2: 11.5651,
            gradientUnits: "userSpaceOnUse",
          },
          y.createElement("stop", { stopColor: "#469BF5" }),
          y.createElement("stop", { offset: 0.09, stopColor: "#3A81F3" }),
          y.createElement("stop", { offset: 0.21, stopColor: "#2F68F2" }),
          y.createElement("stop", { offset: 0.34, stopColor: "#2654F2" }),
          y.createElement("stop", { offset: 0.49, stopColor: "#2046F1" }),
          y.createElement("stop", { offset: 0.67, stopColor: "#1D3EF1" }),
          y.createElement("stop", { offset: 1, stopColor: "#1C3CF1" }),
        ),
        y.createElement(
          "linearGradient",
          {
            id: "paint1_linear_4784_46479",
            x1: 0,
            y1: 22.498,
            x2: 44.7609,
            y2: 22.498,
            gradientUnits: "userSpaceOnUse",
          },
          y.createElement("stop", { offset: 0.08, stopColor: "#469BF5" }),
          y.createElement("stop", { offset: 0.7, stopColor: "#2756F2" }),
          y.createElement("stop", { offset: 1, stopColor: "#1C3CF1" }),
        ),
        y.createElement(
          "linearGradient",
          {
            id: "paint2_linear_4784_46479",
            x1: 4.67285,
            y1: 33.639,
            x2: 26.1301,
            y2: 33.639,
            gradientUnits: "userSpaceOnUse",
          },
          y.createElement("stop", { offset: 0.08, stopColor: "#469BF5" }),
          y.createElement("stop", { offset: 0.24, stopColor: "#4191F4" }),
          y.createElement("stop", { offset: 0.51, stopColor: "#3678F3" }),
          y.createElement("stop", { offset: 0.85, stopColor: "#2550F1" }),
          y.createElement("stop", { offset: 1, stopColor: "#1C3CF1" }),
        ),
        y.createElement(
          "clipPath",
          { id: "clip0_4784_46479" },
          y.createElement("rect", {
            width: 123.158,
            height: 45,
            fill: "white",
          }),
        ),
      ),
    ),
  );
}
o(s3, "SvgLogoWithText");
var l3 = s3;
import oo, { createElement as p3 } from "react";
function c3(e) {
  return p3(
    i,
    e,
    oo.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      oo.createElement("path", {
        fillRule: "evenodd",
        d: "M3 7H21",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
      }),
      oo.createElement("path", {
        fillRule: "evenodd",
        d: "M3 12H21",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
      }),
      oo.createElement("path", {
        fillRule: "evenodd",
        d: "M3 17H21",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
      }),
    ),
  );
}
o(c3, "SvgMenu");
var d3 = c3;
import to, { createElement as u3 } from "react";
function m3(e) {
  return u3(
    i,
    e,
    to.createElement(
      "svg",
      { viewBox: "0 0 25 25", xmlns: "http://www.w3.org/2000/svg" },
      to.createElement("path", {
        fillRule: "evenodd",
        d: "M7.80078 12.5C7.80078 11.6716 7.12921 11 6.30078 11C5.47235 11 4.80078 11.6716 4.80078 12.5C4.80078 13.3284 5.47235 14 6.30078 14C7.12921 14 7.80078 13.3284 7.80078 12.5Z",
        fill: "currentColor",
      }),
      to.createElement("path", {
        fillRule: "evenodd",
        d: "M13.8008 12.5C13.8008 11.6716 13.1292 11 12.3008 11C11.4724 11 10.8008 11.6716 10.8008 12.5C10.8008 13.3284 11.4724 14 12.3008 14C13.1292 14 13.8008 13.3284 13.8008 12.5Z",
        fill: "currentColor",
      }),
      to.createElement("path", {
        fillRule: "evenodd",
        d: "M19.8008 12.5C19.8008 11.6716 19.1292 11 18.3008 11C17.4724 11 16.8008 11.6716 16.8008 12.5C16.8008 13.3284 17.4724 14 18.3008 14C19.1292 14 19.8008 13.3284 19.8008 12.5Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(m3, "SvgMore");
var h3 = m3;
import pe, { createElement as g3 } from "react";
function C3(e) {
  return g3(
    i,
    e,
    pe.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      pe.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M16.0304 2.4375V3.12441C16.0304 2.4375 16.0301 2.4375 16.0304 2.4375L16.0319 2.4375L16.0337 2.43751L16.0383 2.43753L16.0514 2.43769C16.0618 2.43785 16.0757 2.43815 16.0928 2.43869C16.1269 2.43978 16.174 2.44185 16.2323 2.44582C16.3486 2.45373 16.5106 2.46924 16.7041 2.49975C17.0884 2.56031 17.612 2.6823 18.1526 2.93156C19.2617 3.44284 20.4302 4.49412 20.5947 6.51644L20.5969 6.54424V12.2916H19.2231V6.60106C19.0998 5.19398 18.3333 4.52763 17.5775 4.17918C17.1833 3.99747 16.7896 3.90398 16.4902 3.85681C16.342 3.83344 16.2206 3.82201 16.139 3.81646C16.1049 3.81414 16.0779 3.81286 16.0591 3.81215C14.4249 3.99225 13.6604 4.74826 13.2775 5.40608C13.0756 5.7529 12.9692 6.09267 12.9139 6.34615C12.8864 6.47201 12.8721 6.57383 12.8648 6.64072C12.8612 6.67407 12.8593 6.69844 12.8584 6.71244L12.858 6.71956V16.88L12.8557 16.9078C12.6915 18.9309 11.5302 19.9824 10.4243 20.4932C9.88568 20.7421 9.36417 20.8632 8.98144 20.9231C8.78867 20.9532 8.62727 20.9684 8.51139 20.9761C8.45335 20.9799 8.40642 20.9819 8.37236 20.9829C8.35532 20.9834 8.34147 20.9837 8.33102 20.9838L8.31792 20.9839L8.31333 20.9839H8.31153C6.00027 20.9881 4.73082 20.0094 4.08107 18.9328C3.76952 18.4165 3.61648 17.9054 3.54043 17.527C3.50215 17.3366 3.4826 17.1759 3.47258 17.0595C3.46756 17.0012 3.46489 16.9536 3.46348 16.9186C3.46278 16.901 3.46239 16.8866 3.46217 16.8755L3.46196 16.8613L3.46192 16.8561L3.46192 16.854C3.46192 16.8535 3.46191 16.8522 4.14882 16.8522H3.46191V12.2916H4.83572V16.8488L4.83619 16.8634C4.83681 16.8789 4.83821 16.9055 4.84132 16.9416C4.84756 17.0141 4.86053 17.1231 4.8873 17.2563C4.94134 17.5252 5.04848 17.8769 5.2573 18.2229C5.64805 18.8704 6.46017 19.614 8.3103 19.6101L8.31297 19.6101L8.3316 19.6097C8.3501 19.6091 8.38034 19.6079 8.42071 19.6053C8.50165 19.5999 8.62205 19.5888 8.76918 19.5658C9.06627 19.5193 9.45701 19.4268 9.84817 19.2461C10.5972 18.9001 11.3607 18.2353 11.4842 16.8233V6.68664L12.1711 6.70407C11.4844 6.68664 11.4842 6.68706 11.4842 6.68664L11.4844 6.68491L11.4845 6.68287L11.4847 6.6779L11.4852 6.66444C11.4857 6.65392 11.4864 6.64034 11.4874 6.62387C11.4896 6.59096 11.4931 6.54642 11.4991 6.4918C11.511 6.38273 11.5325 6.23231 11.5717 6.05306C11.6496 5.6963 11.7995 5.21429 12.0902 4.71496C12.6891 3.68608 13.8445 2.65953 15.9599 2.44113L15.9951 2.4375H16.0304ZM12.8576 6.72561C12.8576 6.7264 12.8576 6.72625 12.8576 6.72561V6.72561Z",
        fill: "currentColor",
      }),
      pe.createElement(
        "mask",
        {
          id: "mask0_3736_40141",
          style: { maskType: "alpha" },
          maskUnits: "userSpaceOnUse",
          x: 3,
          y: 2,
          width: 20,
          height: 19,
        },
        pe.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M3.11822 18.3546L21.1163 2.88989L22.7441 4.78442L4.74609 20.2491L3.11822 18.3546Z",
          fill: "black",
        }),
      ),
      pe.createElement(
        "g",
        { mask: "url(#mask0_3736_40141)" },
        pe.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M16.0251 2.43726V3.12416C16.0251 2.43726 16.0247 2.43726 16.0251 2.43726L16.0265 2.43726L16.0283 2.43726L16.0329 2.43729L16.046 2.43744C16.0564 2.4376 16.0703 2.4379 16.0874 2.43845C16.1216 2.43953 16.1686 2.44161 16.2269 2.44557C16.3432 2.45349 16.5052 2.469 16.6988 2.4995C17.083 2.56006 17.6066 2.68206 18.1473 2.93132C19.2563 3.4426 20.4248 4.49387 20.5893 6.5162L20.5916 6.54399V12.2913H19.2177V6.60081C19.0944 5.19374 18.328 4.52739 17.5721 4.17894C17.178 3.99723 16.7842 3.90374 16.4849 3.85656C16.3366 3.83319 16.2153 3.82177 16.1336 3.81622C16.0995 3.81389 16.0725 3.81261 16.0537 3.81191C14.4195 3.992 13.655 4.74801 13.2721 5.40584C13.0703 5.75266 12.9638 6.09243 12.9085 6.3459C12.881 6.47177 12.8667 6.57358 12.8594 6.64047C12.8558 6.67382 12.8539 6.69819 12.853 6.71219L12.8526 6.71932V16.8798L12.8504 16.9075C12.6861 18.9307 11.5248 19.9821 10.4189 20.493C9.88031 20.7418 9.3588 20.863 8.97606 20.9228C8.7833 20.953 8.6219 20.9682 8.50602 20.9758C8.44798 20.9797 8.40105 20.9816 8.36699 20.9827C8.34995 20.9832 8.3361 20.9834 8.32565 20.9836L8.31255 20.9837L8.30796 20.9837H8.30616C5.9949 20.9878 4.72545 20.0092 4.0757 18.9325C3.76415 18.4163 3.61111 17.9052 3.53506 17.5268C3.49678 17.3363 3.47723 17.1757 3.46721 17.0593C3.46218 17.0009 3.45952 16.9534 3.45811 16.9183C3.45741 16.9008 3.45702 16.8863 3.4568 16.8752L3.45659 16.861L3.45655 16.8558L3.45655 16.8537C3.45654 16.8533 3.45654 16.8519 4.14345 16.8519H3.45654V12.2913H4.83035V16.8486L4.83082 16.8631C4.83144 16.8787 4.83284 16.9053 4.83595 16.9414C4.84219 17.0138 4.85516 17.1229 4.88193 17.2561C4.93597 17.5249 5.04311 17.8767 5.25193 18.2227C5.64268 18.8702 6.4548 19.6137 8.30493 19.6099L8.3076 19.6099L8.32623 19.6094C8.34473 19.6089 8.37497 19.6077 8.41534 19.605C8.49628 19.5997 8.61667 19.5885 8.76381 19.5655C9.0609 19.5191 9.45164 19.4265 9.8428 19.2458C10.5918 18.8998 11.3553 18.2351 11.4788 16.8231V6.68639L12.1657 6.70383C11.479 6.6864 11.4788 6.68681 11.4788 6.68639L11.4791 6.68466L11.4791 6.68263L11.4793 6.67766L11.4798 6.6642C11.4803 6.65368 11.481 6.64009 11.4821 6.62363C11.4842 6.59071 11.4877 6.54618 11.4937 6.49155C11.5056 6.38249 11.5272 6.23207 11.5663 6.05282C11.6442 5.69606 11.7942 5.21405 12.0848 4.71472C12.6837 3.68583 13.8391 2.65928 15.9545 2.44089L15.9897 2.43726H16.0251ZM12.8523 6.72537C12.8522 6.72615 12.8522 6.726 12.8523 6.72537V6.72537Z",
          fill: "#FDFDFD",
        }),
      ),
      pe.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M22.8206 3.10254C23.0453 3.36412 23.0155 3.75838 22.7539 3.98314L2.76815 21.1558C2.50657 21.3805 2.11231 21.3507 1.88755 21.0891C1.66279 20.8275 1.69264 20.4333 1.95422 20.2085L21.94 3.03587C22.2016 2.81111 22.5958 2.84096 22.8206 3.10254Z",
        fill: "currentColor",
      }),
      pe.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.908 12.7864C19.0532 12.7864 18.3601 13.4794 18.3601 14.3343C18.3601 15.1892 19.0532 15.8822 19.908 15.8822C20.7629 15.8822 21.4559 15.1892 21.4559 14.3343C21.4559 13.4794 20.7629 12.7864 19.908 12.7864ZM16.9863 14.3343C16.9863 12.7207 18.2944 11.4126 19.908 11.4126C21.5216 11.4126 22.8297 12.7207 22.8297 14.3343C22.8297 15.9479 21.5216 17.256 19.908 17.256C18.2944 17.256 16.9863 15.9479 16.9863 14.3343Z",
        fill: "currentColor",
      }),
      pe.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.14924 8.31766C3.29436 8.31766 2.60135 9.01067 2.60135 9.86555C2.60135 10.7204 3.29436 11.4134 4.14924 11.4134C5.00412 11.4134 5.69713 10.7204 5.69713 9.86555C5.69713 9.01067 5.00412 8.31766 4.14924 8.31766ZM1.22754 9.86555C1.22754 8.25194 2.53563 6.94385 4.14924 6.94385C5.76285 6.94385 7.07094 8.25194 7.07094 9.86555C7.07094 11.4792 5.76285 12.7873 4.14924 12.7873C2.53563 12.7873 1.22754 11.4792 1.22754 9.86555Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(C3, "SvgNoRoute");
var f3 = C3;
import gn, { createElement as y3 } from "react";
function w3(e) {
  return y3(
    i,
    e,
    gn.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      gn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.3231 7.40376L23.4597 11.5403C23.7136 11.7942 23.7136 12.2057 23.4597 12.4596L19.3231 16.5961C19.0693 16.85 18.6577 16.85 18.4039 16.5961C18.1501 16.3423 18.1501 15.9307 18.4039 15.6769L21.4309 12.65H1.0001C0.641113 12.65 0.350098 12.3589 0.350098 12C0.350098 11.641 0.641113 11.35 1.0001 11.35H21.4309L18.4039 8.323C18.1501 8.06916 18.1501 7.6576 18.4039 7.40376C18.6577 7.14992 19.0693 7.14992 19.3231 7.40376Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(w3, "SvgNext");
var Pe = w3;
import N1, { createElement as v3 } from "react";
function b3(e) {
  return v3(
    i,
    e,
    N1.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      N1.createElement(
        "g",
        { id: "Frame 1000007661" },
        N1.createElement(
          "g",
          { id: "Group 1000007530" },
          N1.createElement("path", {
            id: "Subtract",
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M5.08063 7.73123C5.08063 4.14247 7.99067 1.2332 11.5804 1.2332C14.1703 1.2332 16.4065 2.7476 17.4511 4.93898L18.3676 4.02277C17.0543 1.62551 14.5072 0 11.5804 0C7.30941 0 3.8471 3.46139 3.8471 7.73123C3.8471 9.21129 3.06751 10.9332 2.1141 12.2068C1.41485 13.1409 1.00049 14.3016 1.00049 15.5573C1.00049 17.1616 1.67567 18.6083 2.75746 19.6287L3.63017 18.7563C2.7714 17.9594 2.23402 16.8211 2.23402 15.5573C2.23402 14.577 2.55661 13.6739 3.1017 12.9457C4.14201 11.5559 5.08063 9.57778 5.08063 7.73123ZM6.16446 19.8996L5.10978 20.954C5.58391 21.0845 6.08322 21.1542 6.59882 21.1542H8.17177C8.46269 22.7722 9.87812 24 11.5804 24C13.2827 24 14.6981 22.7722 14.989 21.1542H16.562C19.6538 21.1542 22.1603 18.6484 22.1603 15.5573C22.1603 14.3016 21.7459 13.1409 21.0467 12.2068C20.0933 10.9332 19.3137 9.21129 19.3137 7.73123C19.3137 7.41895 19.2952 7.111 19.2592 6.8084L18.0858 7.98147C18.1649 9.75478 19.0656 11.6185 20.0591 12.9457C20.6042 13.6739 20.9268 14.577 20.9268 15.5573C20.9268 17.9673 18.9726 19.9209 16.562 19.9209H6.59882C6.45223 19.9209 6.30733 19.9137 6.16446 19.8996ZM11.5804 22.7668C10.5628 22.7668 9.70449 22.0854 9.43694 21.1542H13.7238C13.4563 22.0854 12.5979 22.7668 11.5804 22.7668Z",
            fill: "currentColor",
          }),
          N1.createElement("path", {
            id: "Rectangle 6608",
            d: "M19.9662 3.42426C20.2006 3.18995 20.5806 3.18995 20.815 3.42426C21.0494 3.65858 21.0494 4.03848 20.815 4.27279L2.27315 22.8096C2.03877 23.0439 1.65877 23.0439 1.42439 22.8096C1.19001 22.5753 1.19001 22.1954 1.42439 21.9611L19.9662 3.42426Z",
            fill: "currentColor",
          }),
        ),
      ),
    ),
  );
}
o(b3, "SvgNoNotification");
var k3 = b3;
import fe, { createElement as S3 } from "react";
function x3(e) {
  return S3(
    i,
    e,
    fe.createElement(
      "svg",
      { viewBox: "0 0 24 25", xmlns: "http://www.w3.org/2000/svg" },
      fe.createElement(
        "g",
        { clipPath: "url(#clip0_3736_40162)" },
        fe.createElement("path", {
          d: "M24 12.571C24 19.1985 18.6274 24.571 12 24.571C5.37258 24.571 0 19.1985 0 12.571C0 5.94363 5.37258 0.571045 12 0.571045C18.6274 0.571045 24 5.94363 24 12.571Z",
          fill: "currentColor",
        }),
        fe.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M12 23.571C18.0751 23.571 23 18.6462 23 12.571C23 6.49591 18.0751 1.57104 12 1.57104C5.92487 1.57104 1 6.49591 1 12.571C1 18.6462 5.92487 23.571 12 23.571ZM12 24.571C18.6274 24.571 24 19.1985 24 12.571C24 5.94363 18.6274 0.571045 12 0.571045C5.37258 0.571045 0 5.94363 0 12.571C0 19.1985 5.37258 24.571 12 24.571Z",
          fill: "currentColor",
        }),
        fe.createElement("path", {
          d: "M10.9863 12.4939H12.1113C12.5488 12.4939 12.9108 12.4184 13.1973 12.2673C13.4889 12.1163 13.7051 11.908 13.8457 11.6423C13.9863 11.3767 14.0566 11.072 14.0566 10.7283C14.0566 10.3689 13.9915 10.0616 13.8613 9.8064C13.7363 9.54598 13.5436 9.34546 13.2832 9.20483C13.028 9.06421 12.7025 8.9939 12.3066 8.9939C11.9733 8.9939 11.6712 9.0616 11.4004 9.19702C11.1348 9.32723 10.9238 9.51473 10.7676 9.75952C10.6113 9.9991 10.5332 10.2856 10.5332 10.6189H8.64258C8.64258 10.0147 8.80143 9.47827 9.11914 9.00952C9.43685 8.54077 9.86914 8.17358 10.416 7.90796C10.9681 7.63713 11.5879 7.50171 12.2754 7.50171C13.0098 7.50171 13.6504 7.6241 14.1973 7.8689C14.7493 8.10848 15.179 8.46785 15.4863 8.94702C15.7936 9.42619 15.9473 10.0199 15.9473 10.7283C15.9473 11.0512 15.8717 11.3793 15.7207 11.7126C15.5697 12.046 15.3457 12.3507 15.0488 12.6267C14.752 12.8975 14.3822 13.1189 13.9395 13.2908C13.4967 13.4574 12.9837 13.5408 12.4004 13.5408H10.9863V12.4939ZM10.9863 13.9626V12.9314H12.4004C13.0671 12.9314 13.6348 13.0095 14.1035 13.1658C14.5775 13.322 14.9629 13.5382 15.2598 13.8142C15.5566 14.085 15.7728 14.3949 15.9082 14.7439C16.0488 15.0929 16.1191 15.4626 16.1191 15.8533C16.1191 16.3845 16.0228 16.8585 15.8301 17.2751C15.6426 17.6866 15.3743 18.0356 15.0254 18.322C14.6764 18.6085 14.2676 18.8246 13.7988 18.9705C13.3353 19.1163 12.8301 19.1892 12.2832 19.1892C11.7936 19.1892 11.3249 19.1215 10.877 18.9861C10.429 18.8507 10.028 18.6501 9.67383 18.3845C9.31966 18.1137 9.03841 17.7778 8.83008 17.3767C8.62695 16.9705 8.52539 16.5017 8.52539 15.9705H10.4082C10.4082 16.309 10.4863 16.6085 10.6426 16.8689C10.804 17.1241 11.028 17.3246 11.3145 17.4705C11.6061 17.6163 11.9395 17.6892 12.3145 17.6892C12.7103 17.6892 13.0514 17.6189 13.3379 17.4783C13.6243 17.3376 13.8431 17.1293 13.9941 16.8533C14.1504 16.5772 14.2285 16.2439 14.2285 15.8533C14.2285 15.4106 14.1426 15.0512 13.9707 14.7751C13.7988 14.4991 13.554 14.296 13.2363 14.1658C12.9186 14.0304 12.5436 13.9626 12.1113 13.9626H10.9863Z",
          fill: "white",
        }),
      ),
      fe.createElement(
        "defs",
        null,
        fe.createElement(
          "clipPath",
          { id: "clip0_3736_40162" },
          fe.createElement("rect", {
            width: 24,
            height: 24,
            fill: "white",
            transform: "translate(0 0.571045)",
          }),
        ),
      ),
    ),
  );
}
o(x3, "SvgNotificationNumber");
var L3 = x3;
import Cn, { createElement as T3 } from "react";
function $3(e) {
  return T3(
    i,
    e,
    Cn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      Cn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.4545 1.2332C8.86576 1.2332 5.95649 4.14247 5.95649 7.73123C5.95649 9.57778 5.01813 11.5559 3.97809 12.9457C3.43315 13.6739 3.11064 14.577 3.11064 15.5573C3.11064 17.9673 5.06431 19.9209 7.47428 19.9209H17.4348C19.8447 19.9209 21.7984 17.9673 21.7984 15.5573C21.7984 14.577 21.4759 13.6739 20.931 12.9457C19.8909 11.556 18.9525 9.57778 18.9525 7.73123C18.9525 4.14247 16.0433 1.2332 12.4545 1.2332ZM15.8622 21.1542H17.4348C20.5258 21.1542 23.0316 18.6484 23.0316 15.5573C23.0316 14.3016 22.6173 13.1409 21.9183 12.2068C20.9651 10.9332 20.1858 9.21129 20.1858 7.73123C20.1858 3.46139 16.7244 0 12.4545 0C8.18468 0 4.72329 3.46139 4.72329 7.73123C4.72329 9.21129 3.94391 10.9332 2.99076 12.2068C2.2917 13.1409 1.87744 14.3016 1.87744 15.5573C1.87744 18.6484 4.38323 21.1542 7.47428 21.1542H9.04681C9.33766 22.7722 10.7527 24 12.4545 24C14.1563 24 15.5714 22.7722 15.8622 21.1542ZM14.5974 21.1542H10.3116C10.5791 22.0854 11.4372 22.7668 12.4545 22.7668C13.4718 22.7668 14.3299 22.0854 14.5974 21.1542Z",
        fill: "currentColor",
      }),
    ),
  );
}
o($3, "SvgNotifications");
var I3 = $3;
import Bo, { createElement as P3 } from "react";
function D3(e) {
  return P3(
    i,
    e,
    Bo.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      Bo.createElement(
        "g",
        { id: "Number" },
        Bo.createElement("path", {
          id: "Vector",
          d: "M12.379 2.00335C12.315 2.01277 12.2532 2.03276 12.1962 2.06255L0.767986 7.73863C0.581526 7.83102 0.464088 8.01691 0.464088 8.21997C0.464088 8.42303 0.581526 8.60912 0.767986 8.70151L12.1962 14.3776C12.3549 14.4556 12.5427 14.4556 12.7013 14.3776L24.1296 8.70151C24.316 8.60912 24.4335 8.42303 24.4335 8.21997C24.4335 8.01692 24.316 7.83102 24.1296 7.73863L12.7013 2.06255C12.6024 2.01202 12.4902 1.99128 12.379 2.00335ZM12.4486 3.15213L22.6574 8.22006L12.4486 13.288L2.23983 8.22006L12.4486 3.15213ZM0.994475 11.7251C0.73627 11.7331 0.517924 11.9118 0.466014 12.1571C0.4141 12.4024 0.542817 12.6499 0.776911 12.7557L12.2051 18.1615C12.3591 18.2341 12.5388 18.2341 12.6928 18.1615L24.121 12.7557C24.2598 12.6965 24.3679 12.585 24.4202 12.447C24.4727 12.309 24.4648 12.1561 24.3983 12.024C24.3318 11.8916 24.2128 11.7913 24.0683 11.746C23.9241 11.7008 23.7668 11.7148 23.6332 11.7843L12.4488 17.0719L1.26451 11.7843C1.1809 11.7428 1.08819 11.7225 0.994475 11.7251ZM0.994475 15.5091C0.73627 15.517 0.517924 15.6957 0.466014 15.941C0.414104 16.1863 0.542817 16.4341 0.776911 16.5396L12.2051 21.9454C12.3591 22.0182 12.5388 22.0182 12.6928 21.9454L24.121 16.5396C24.2598 16.4806 24.3679 16.3692 24.4202 16.231C24.4727 16.093 24.4648 15.9403 24.3983 15.8079C24.3318 15.6756 24.2128 15.5753 24.0683 15.5302C23.9241 15.4849 23.7668 15.4987 23.6332 15.5683L12.4488 20.8558L1.26451 15.5683C1.1809 15.527 1.08819 15.5065 0.994475 15.5091Z",
          fill: "currentColor",
          stroke: "currentColor",
          strokeWidth: 0.15,
        }),
      ),
    ),
  );
}
o(D3, "SvgNumber");
var Wo = D3;
import O, { createElement as z3 } from "react";
function M3(e) {
  return z3(
    i,
    e,
    O.createElement(
      "svg",
      { viewBox: "0 0 28 28", xmlns: "http://www.w3.org/2000/svg" },
      O.createElement("circle", { cx: 14, cy: 8, r: 7, fill: "#469BF5" }),
      O.createElement("path", {
        d: "M17.464 9.86197L16.3084 11.0827C16.2833 11.1092 16.2529 11.1303 16.2191 11.1448C16.1853 11.1592 16.1489 11.1667 16.1121 11.1667H10.6342C10.608 11.1667 10.5824 11.1591 10.5606 11.145C10.5387 11.1309 10.5215 11.1108 10.5111 11.0872C10.5007 11.0636 10.4975 11.0375 10.5019 11.0121C10.5064 10.9867 10.5182 10.9632 10.5361 10.9444L11.6925 9.72366C11.7176 9.69722 11.7478 9.67612 11.7815 9.66167C11.8152 9.64722 11.8515 9.63974 11.8882 9.63968H17.3658C17.392 9.63968 17.4175 9.6472 17.4394 9.66132C17.4613 9.67544 17.4784 9.69554 17.4889 9.71915C17.4993 9.74276 17.5025 9.76885 17.4981 9.79423C17.4936 9.8196 17.4818 9.84315 17.464 9.86197ZM16.3084 7.40382C16.2833 7.3773 16.2529 7.35616 16.2191 7.34171C16.1853 7.32727 16.1489 7.31982 16.1121 7.31984H10.6342C10.608 7.31984 10.5824 7.32736 10.5606 7.34148C10.5387 7.3556 10.5215 7.3757 10.5111 7.39931C10.5007 7.42292 10.4975 7.44902 10.5019 7.47439C10.5064 7.49976 10.5182 7.52331 10.5361 7.54214L11.6925 8.76284C11.7176 8.78929 11.7478 8.81038 11.7815 8.82483C11.8152 8.83927 11.8515 8.84676 11.8882 8.84682H17.3658C17.392 8.84682 17.4175 8.8393 17.4394 8.82518C17.4613 8.81106 17.4784 8.79096 17.4889 8.76735C17.4993 8.74374 17.5025 8.71764 17.4981 8.69227C17.4936 8.6669 17.4818 8.64335 17.464 8.62453L16.3084 7.40382ZM10.6342 6.52698H16.1121C16.1489 6.527 16.1853 6.51956 16.2191 6.50511C16.2529 6.49066 16.2833 6.46952 16.3084 6.443L17.464 5.22229C17.4818 5.20347 17.4936 5.17992 17.4981 5.15455C17.5025 5.12918 17.4993 5.10308 17.4889 5.07947C17.4784 5.05586 17.4613 5.03576 17.4394 5.02164C17.4175 5.00752 17.392 5 17.3658 5H11.8882C11.8515 5.00006 11.8152 5.00755 11.7815 5.02199C11.7478 5.03644 11.7176 5.05754 11.6925 5.08398L10.5364 6.30469C10.5186 6.32349 10.5067 6.34702 10.5023 6.37236C10.4978 6.3977 10.501 6.42378 10.5114 6.44738C10.5217 6.47098 10.5389 6.49108 10.5607 6.50522C10.5825 6.51936 10.608 6.52692 10.6342 6.52698Z",
        fill: "white",
      }),
      O.createElement("circle", { cx: 7, cy: 20, r: 7, fill: "#469BF5" }),
      O.createElement(
        "g",
        { clipPath: "url(#clip0_9706_69204)" },
        O.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M3.76322 18.3239L3.94253 17.7704C3.97931 17.6573 4.06758 17.5699 4.18069 17.5359L4.73701 17.3649C4.81425 17.341 4.81425 17.2324 4.73793 17.2076L4.18345 17.0283C4.07126 16.9915 3.98299 16.9033 3.94896 16.7901L3.77793 16.2338C3.75402 16.1566 3.64551 16.1566 3.62069 16.2329L3.44138 16.7865C3.40459 16.8987 3.31632 16.9869 3.20322 17.021L2.64689 17.192C2.56965 17.2159 2.56873 17.3244 2.64597 17.3492L3.20046 17.5285C3.31264 17.5653 3.40092 17.6545 3.43494 17.7676L3.60597 18.3239C3.62988 18.4012 3.73839 18.4021 3.76322 18.3249V18.3239Z",
          fill: "white",
        }),
        O.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M12.5632 18.0042C12.3342 17.7477 11.9756 17.6033 11.6271 17.5435C11.2758 17.4865 10.908 17.492 10.5613 17.5536C9.86063 17.6723 9.22339 17.9628 8.66799 18.3205C8.37925 18.4962 8.13374 18.6994 7.8781 18.9072C7.75489 19.012 7.64362 19.1233 7.52684 19.2336L7.20776 19.5509C6.86109 19.9132 6.51994 20.2424 6.18983 20.5155C5.85787 20.7877 5.54799 20.9936 5.2427 21.138C4.93741 21.2833 4.61098 21.3679 4.18523 21.3817C3.76316 21.3964 3.26385 21.3201 2.7296 21.195C2.19259 21.07 1.62891 20.8916 0.999023 20.738C1.21879 21.3477 1.54983 21.8865 1.97466 22.3794C2.405 22.8631 2.94201 23.3044 3.63167 23.595C4.31121 23.892 5.16546 23.9978 5.96454 23.8378C6.76546 23.6833 7.46799 23.3127 8.03626 22.8842C8.60546 22.4511 9.06707 21.9582 9.45511 21.4451C9.5627 21.3035 9.61879 21.2244 9.69695 21.1132L9.91121 20.795C10.0602 20.5982 10.1963 20.3748 10.3434 20.1798C10.633 19.7716 10.9181 19.3642 11.2491 18.989C11.4156 18.7987 11.5921 18.6166 11.7999 18.4419C11.9038 18.3564 12.0151 18.2727 12.1393 18.1973C12.2652 18.1164 12.3976 18.0529 12.5613 18.0033L12.5632 18.0042Z",
          fill: "white",
        }),
        O.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M12.5632 18.0028C12.3168 17.3803 11.8579 16.8571 11.2428 16.4708C10.6313 16.0883 9.78161 15.8934 8.94023 16.0598C8.5246 16.1398 8.12184 16.2952 7.76782 16.5012C7.41563 16.7062 7.10023 16.9536 6.82805 17.2194C6.69195 17.3527 6.56782 17.4915 6.44552 17.6304L6.12736 18.0368L5.6354 18.6906C5.00828 19.532 4.33333 20.5177 3.22437 20.8092C2.13655 21.0961 1.66483 20.8423 1 20.7375C1.12138 21.0511 1.27218 21.3554 1.4754 21.623C1.67586 21.8961 1.91218 22.1527 2.20552 22.3725C2.35356 22.4782 2.5108 22.5821 2.6846 22.6713C2.85747 22.7568 3.04506 22.8322 3.2446 22.8883C3.64184 22.9968 4.08874 23.0354 4.52092 22.9766C4.95402 22.9187 5.36782 22.7817 5.7292 22.5996C6.09333 22.4194 6.41057 22.1996 6.69379 21.9679C7.25747 21.4998 7.69517 20.983 8.06483 20.4607C8.25058 20.1996 8.41977 19.9338 8.57609 19.6672L8.76 19.3499C8.81609 19.2571 8.8731 19.1642 8.93103 19.0768C9.16368 18.7283 9.39172 18.4488 9.66851 18.2382C9.94161 18.023 10.3214 17.8639 10.8299 17.8272C11.3356 17.7895 11.9195 17.8584 12.5614 18.0028H12.5632Z",
          fill: "white",
        }),
        O.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M9.82568 23.1713C9.82568 23.6283 10.1963 23.9989 10.6533 23.9989C11.1103 23.9989 11.4809 23.6283 11.4809 23.1713C11.4809 22.7143 11.1103 22.3438 10.6533 22.3438C10.1963 22.3438 9.82568 22.7143 9.82568 23.1713Z",
          fill: "white",
        }),
      ),
      O.createElement("circle", { cx: 21, cy: 20, r: 7, fill: "#469BF5" }),
      O.createElement(
        "g",
        { clipPath: "url(#clip1_9706_69204)" },
        O.createElement("path", {
          d: "M24.5312 18.5094C24.1796 18.1848 23.6933 17.6891 23.2972 17.3376L23.2738 17.3212C23.2348 17.2899 23.1908 17.2653 23.1437 17.2485C22.1886 17.0704 17.7437 16.2396 17.657 16.2501C17.6327 16.2535 17.6095 16.2623 17.5891 16.2759L17.5668 16.2935C17.5394 16.3213 17.5186 16.3549 17.5059 16.3919L17.5 16.4071V16.4903V16.5032C18.0004 17.8966 19.9761 22.461 20.3652 23.532C20.3886 23.6047 20.4332 23.743 20.5164 23.75H20.5351C20.5796 23.75 20.7695 23.4992 20.7695 23.4992C20.7695 23.4992 24.1632 19.3837 24.5065 18.9454C24.551 18.8914 24.5902 18.8333 24.6237 18.7719C24.6323 18.7239 24.6283 18.6745 24.612 18.6285C24.5958 18.5825 24.5679 18.5415 24.5312 18.5094ZM21.6402 18.9887L23.0886 17.7876L23.9382 18.5704L21.6402 18.9887ZM21.0777 18.9102L18.584 16.8665L22.6187 17.6106L21.0777 18.9102ZM21.3027 19.4458L23.855 19.0344L20.9371 22.55L21.3027 19.4458ZM18.2453 17.0704L20.8691 19.2969L20.4894 22.5524L18.2453 17.0704Z",
          fill: "white",
        }),
      ),
      O.createElement(
        "defs",
        null,
        O.createElement(
          "clipPath",
          { id: "clip0_9706_69204" },
          O.createElement("rect", {
            width: 11.5632,
            height: 8,
            fill: "white",
            transform: "translate(1 16)",
          }),
        ),
        O.createElement(
          "clipPath",
          { id: "clip1_9706_69204" },
          O.createElement("rect", {
            width: 8,
            height: 8,
            fill: "white",
            transform: "translate(17 16)",
          }),
        ),
      ),
    ),
  );
}
o(M3, "SvgOtherCategory");
var Zo = M3;
import t1, { createElement as A3 } from "react";
function N3(e) {
  return A3(
    i,
    e,
    t1.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      t1.createElement(
        "g",
        { clipPath: "url(#clip0_3736_40152)" },
        t1.createElement("path", {
          d: "M6.49636 23.6636C6.70432 23.7702 6.95035 23.7839 7.17959 23.7013C7.40926 23.6186 7.60362 23.4466 7.72026 23.2228L10.7963 17.3204L16.2882 20.1373C16.4962 20.244 16.742 20.2574 16.9716 20.1747C17.2013 20.092 17.3957 19.92 17.5121 19.6965L18.3911 18.0099C18.8976 17.038 19.0763 15.9358 18.8968 14.8896C18.7174 13.8431 18.1908 12.9174 17.406 12.2686L20.0866 7.12496L21.6556 7.92969C22.089 8.152 22.6371 7.95458 22.8797 7.48905C23.1225 7.02321 22.9678 6.46571 22.5344 6.2434L11.5507 0.609804C11.1173 0.387496 10.5693 0.584614 10.3265 1.05044C10.0839 1.51599 10.2385 2.07378 10.6719 2.29609L12.2408 3.10082L9.51628 8.32884C8.48642 8.12375 7.39804 8.28256 6.41978 8.78044C5.44136 9.27851 4.62745 10.0877 4.10411 11.0827L3.3899 12.4531C3.27342 12.6766 3.24433 12.9334 3.30908 13.1671C3.37383 13.4009 3.52702 13.592 3.73499 13.6987L9.22697 16.5155L6.15098 22.4179C6.03434 22.6417 6.00525 22.8985 6.07 23.1322C6.13464 23.3655 6.28839 23.5569 6.49636 23.6636ZM18.5178 6.32006L15.8812 11.3793L11.1737 8.96478L13.8103 3.90555L18.5178 6.32006ZM5.67369 11.8877C6.06765 11.1337 6.72388 10.5539 7.49828 10.275C8.27267 9.99607 9.10196 10.0409 9.80432 10.4L15.7867 13.4684C16.4108 13.7885 16.8706 14.362 17.0648 15.0628C17.259 15.7635 17.1715 16.5342 16.8219 17.205L16.3825 18.0481L5.39882 12.4145L5.67369 11.8877Z",
          fill: "currentColor",
        }),
      ),
      t1.createElement(
        "defs",
        null,
        t1.createElement(
          "clipPath",
          { id: "clip0_3736_40152" },
          t1.createElement("rect", {
            width: 24,
            height: 24,
            fill: "white",
            transform: "translate(0.227539)",
          }),
        ),
      ),
    ),
  );
}
o(N3, "SvgPin");
var H3 = N3;
import no, { createElement as V3 } from "react";
function E3(e) {
  return V3(
    i,
    e,
    no.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      no.createElement("path", {
        d: "M6.29926 18.2997C2.82191 15.1563 2.5569 9.7767 5.6942 6.30604C8.8315 2.83538 14.2165 2.55094 17.6939 5.69429C18.4094 6.34109 19.0142 7.07007 19.4955 7.88186C19.6905 8.2039 19.5837 8.61775 19.2617 8.8127C18.9396 9.00765 18.5258 8.90088 18.3308 8.57884C17.9196 7.89116 17.4024 7.2535 16.7871 6.69737C13.8648 4.05575 9.34494 4.28377 6.70333 7.20608C4.06171 10.1284 4.28973 14.6483 7.21204 17.2899C10.1343 19.9315 14.6542 19.7035 17.2959 16.7812C18.251 15.7246 18.8622 14.4301 19.0662 13.0348C19.1179 12.6684 19.4622 12.4086 19.8353 12.4663C20.2017 12.518 20.4616 12.8623 20.4038 13.2354C20.1624 14.9006 19.436 16.4435 18.2996 17.7007C15.1556 21.1653 9.77661 21.443 6.29926 18.2997Z",
        fill: "currentColor",
      }),
      no.createElement("path", {
        d: "M19.2696 9.6089C19.1207 9.49207 19.0218 9.31141 19.01 9.10738L18.807 5.14476C18.788 4.77467 19.0763 4.45089 19.4464 4.43183C19.8165 4.41278 20.1402 4.70108 20.1593 5.07117L20.3622 9.0338C20.3813 9.40389 20.093 9.72767 19.7229 9.74672C19.5584 9.76661 19.3973 9.70903 19.2696 9.6089Z",
        fill: "currentColor",
      }),
      no.createElement("path", {
        d: "M15.5108 9.47903C15.3476 9.35108 15.2457 9.14511 15.2505 8.9198C15.2639 8.55221 15.575 8.25778 15.9482 8.26404L19.707 8.3939C20.0802 8.40016 20.3691 8.71837 20.3628 9.09152C20.3565 9.46466 20.0383 9.75353 19.6652 9.74728L15.9007 9.62451C15.7529 9.62312 15.6243 9.56804 15.5108 9.47903Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(E3, "SvgRefresh");
var F3 = E3;
import fn, { createElement as B3 } from "react";
function W3(e) {
  return B3(
    i,
    e,
    fn.createElement(
      "svg",
      { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
      fn.createElement("path", {
        fillRule: "evenodd",
        d: "M13.5783 0H4.98897C4.9378 0 4.8884 0.0211734 4.85135 0.0564623L2.05646 2.85311C2.01941 2.89016 2 2.93957 2 2.99074V13.5192V15.1548C2 15.6206 2.37936 16 2.84517 16H13.5783C14.0441 16 14.4235 15.6206 14.4235 15.1548V0.84517C14.4235 0.379356 14.0441 0 13.5783 0ZM4.79488 0.665196V2.5408C4.79488 2.68196 4.68019 2.79488 4.5408 2.79488H2.6652L4.79488 0.665196ZM14.0335 15.1548C14.0335 15.4054 13.8288 15.6101 13.5783 15.6101H2.84341C2.59285 15.6101 2.38818 15.4054 2.38818 15.1548V13.5192V3.18483H4.53904C4.89369 3.18483 5.18306 2.89546 5.18306 2.5408V0.389943H13.5765C13.8271 0.389943 14.0318 0.594618 14.0318 0.84517V15.1548H14.0335ZM12.9025 9.00044C12.9025 9.10807 12.8143 9.19629 12.7067 9.19629H3.71504C3.60741 9.19629 3.51919 9.10807 3.51919 9.00044C3.51919 8.89281 3.60741 8.80459 3.71504 8.80459H12.7084C12.8143 8.80459 12.9025 8.89281 12.9025 9.00044ZM12.9025 10.3944C12.9025 10.502 12.8143 10.5902 12.7067 10.5902H3.71504C3.60741 10.5902 3.51919 10.502 3.51919 10.3944C3.51919 10.2867 3.60741 10.1985 3.71504 10.1985H12.7084C12.8143 10.1985 12.9025 10.2867 12.9025 10.3944ZM12.9025 11.7865C12.9025 11.8941 12.8143 11.9824 12.7067 11.9824H3.71504C3.60741 11.9824 3.51919 11.8941 3.51919 11.7865C3.51919 11.6789 3.60741 11.5906 3.71504 11.5906H12.7084C12.8143 11.5924 12.9025 11.6789 12.9025 11.7865ZM9.83591 13.1804C9.83591 13.288 9.74768 13.3763 9.64005 13.3763H3.71504C3.60741 13.3763 3.51919 13.288 3.51919 13.1804C3.51919 13.0728 3.60741 12.9846 3.71504 12.9846H9.64182C9.74945 12.9846 9.83591 13.0728 9.83591 13.1804ZM4.3079 7.28011H12.112C12.2197 7.28011 12.3079 7.19188 12.3079 7.08425C12.3079 6.97662 12.2197 6.8884 12.112 6.8884H11.7539V3.03485C11.7539 2.809 11.5704 2.6255 11.3445 2.6255H10.1006C9.87473 2.6255 9.69122 2.809 9.69122 3.03485V3.63652H8.42612C8.20027 3.63652 8.01676 3.82003 8.01676 4.04588V4.64755H6.75166C6.52581 4.64755 6.3423 4.83105 6.3423 5.0569V5.65858H5.0772C4.85135 5.65858 4.66784 5.84208 4.66784 6.06793V6.88487H4.30966C4.20203 6.88487 4.11381 6.97309 4.11381 7.08072C4.11381 7.18836 4.20026 7.28011 4.3079 7.28011ZM10.1006 3.01544H11.3445C11.3551 3.01544 11.3639 3.02426 11.3639 3.03485V6.89016H10.0812V3.03485C10.0812 3.02426 10.09 3.01544 10.1006 3.01544ZM8.42612 4.02647H9.69122V6.8884H8.40671V4.04764C8.40671 4.03705 8.41553 4.02647 8.42612 4.02647ZM6.75166 5.03926H8.01676V6.8884H6.73225V5.06043C6.73048 5.04985 6.74107 5.03926 6.75166 5.03926ZM5.05602 6.07323C5.05602 6.06264 5.06484 6.05382 5.07543 6.05382H6.34054V6.89193H5.05602V6.07323Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(W3, "SvgReport");
var Z3 = W3;
import te, { createElement as q3 } from "react";
function j3(e) {
  return q3(
    i,
    e,
    te.createElement(
      "svg",
      { viewBox: "0 0 17 16", xmlns: "http://www.w3.org/2000/svg" },
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M15.8844 12.8493H15.3478V4.32162C15.3478 3.66683 14.8162 3.13529 14.1615 3.13529H13.4681C13.3654 3.13529 13.2833 3.21746 13.2833 3.32017C13.2833 3.42289 13.3654 3.50505 13.4681 3.50505H14.1615C14.6134 3.50505 14.978 3.87225 14.978 4.32162V12.8493H1.09132V4.32162C1.09132 3.86968 1.45595 3.50505 1.90531 3.50505H2.82202C2.92473 3.50505 3.0069 3.42289 3.0069 3.32017C3.0069 3.21746 2.92473 3.13529 2.82202 3.13529H1.90531C1.25309 3.13529 0.721554 3.66683 0.721554 4.32162V12.8493H0.184882C0.0821698 12.8493 0 12.9315 0 13.0342V14.9806C0 15.5429 0.45707 16 1.01685 16H15.0473C15.6097 16 16.0668 15.5429 16.0668 14.9806V13.0342C16.0668 12.934 15.9846 12.8493 15.8844 12.8493ZM6.73536 13.2191H9.33398V13.7147C9.33398 13.8328 9.2364 13.9303 9.11828 13.9303H6.95105C6.83293 13.9303 6.73536 13.8328 6.73536 13.7147V13.2191ZM15.6996 14.9806C15.6996 15.3401 15.4068 15.6302 15.0499 15.6302H1.01942C0.659926 15.6302 0.369764 15.3375 0.369764 14.9806V13.2191H6.36559V13.7147C6.36559 14.0356 6.62751 14.3001 6.94848 14.3001H9.11571C9.43669 14.3001 9.6986 14.0382 9.6986 13.7147V13.2191H15.6944V14.9806H15.6996Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M4.10079 11.2419H11.966C12.3409 11.2419 12.6464 10.9363 12.6464 10.5614V0.680469C12.6464 0.305569 12.3409 0 11.966 0H6.08313C5.94447 0 5.81095 0.0308137 5.69026 0.0847376H5.68769C5.59011 0.125822 5.50281 0.184882 5.42321 0.259348L3.69764 1.97978C3.61547 2.06195 3.55128 2.15696 3.51019 2.25197C3.51019 2.25453 3.51019 2.25453 3.50762 2.2571C3.50762 2.25967 3.50762 2.26224 3.50506 2.26224C3.44856 2.38549 3.42032 2.51645 3.42032 2.65254V10.5614C3.42032 10.9389 3.72589 11.2419 4.10079 11.2419ZM11.966 0.367196C12.138 0.367196 12.2767 0.508426 12.2767 0.677901V10.5614C12.2767 10.7334 12.138 10.8721 11.966 10.8721H4.10079C3.92874 10.8721 3.79008 10.7334 3.79008 10.5614V2.65254C3.79008 2.60632 3.79779 2.5601 3.80806 2.51388H5.41037C5.70567 2.51388 5.94447 2.27508 5.94447 1.97978V0.385171C5.99069 0.3749 6.03434 0.367196 6.08313 0.367196H11.966ZM5.57728 0.629113V1.98235C5.57728 2.07479 5.50281 2.14925 5.41037 2.14925H4.05457L5.57728 0.629113Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M7.27716 3.18408H10.8105C10.9953 3.18408 11.1443 3.03515 11.1443 2.85026V1.65623C11.1443 1.47135 10.9953 1.32242 10.8105 1.32242H7.27716C7.09228 1.32242 6.94335 1.47135 6.94335 1.65623V2.85026C6.94335 3.03258 7.09485 3.18408 7.27716 3.18408ZM7.31311 1.69218H10.7771V2.81688H7.31311V1.69218Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M5.17413 3.94158C5.07142 3.94158 4.98925 4.02375 4.98925 4.12646C4.98925 4.22918 5.07142 4.31135 5.17413 4.31135H11.0647C11.1674 4.31135 11.2496 4.22918 11.2496 4.12646C11.2496 4.02375 11.1674 3.94158 11.0647 3.94158H5.17413Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M5.17413 5.4797H11.0647C11.1674 5.4797 11.2496 5.39753 11.2496 5.29482C11.2496 5.1921 11.1674 5.10993 11.0647 5.10993H5.17413C5.07142 5.10993 4.98925 5.1921 4.98925 5.29482C4.98925 5.39753 5.07399 5.4797 5.17413 5.4797Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M5.17413 6.65062H11.0647C11.1674 6.65062 11.2496 6.56845 11.2496 6.46574C11.2496 6.36302 11.1674 6.28085 11.0647 6.28085H5.17413C5.07142 6.28085 4.98925 6.36302 4.98925 6.46574C4.99182 6.56845 5.07399 6.65062 5.17413 6.65062Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M6.07543 7.25662C5.264 7.25662 4.60151 7.91655 4.60151 8.72797C4.60151 9.5394 5.26144 10.1993 6.07543 10.1993C6.88686 10.1993 7.54678 9.5394 7.54678 8.72797C7.54678 7.91655 6.88686 7.25662 6.07543 7.25662ZM6.07543 9.82956C5.46686 9.82956 4.97127 9.33397 4.97127 8.72797C4.97127 8.1194 5.46686 7.62638 6.07543 7.62638C6.684 7.62638 7.17702 8.12197 7.17702 8.72797C7.17702 9.33397 6.684 9.82956 6.07543 9.82956Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M9.99647 7.25662C9.18504 7.25662 8.52255 7.91655 8.52255 8.72797C8.52255 9.5394 9.18248 10.1993 9.99647 10.1993C10.8079 10.1993 11.4678 9.5394 11.4678 8.72797C11.4653 7.91655 10.8053 7.25662 9.99647 7.25662ZM9.99647 9.82956C9.3879 9.82956 8.89231 9.33397 8.89231 8.72797C8.89231 8.1194 9.3879 7.62638 9.99647 7.62638C10.605 7.62638 11.0981 8.12197 11.0981 8.72797C11.0981 9.33397 10.6025 9.82956 9.99647 9.82956Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M6.28599 8.41984L5.97785 8.61756L5.92393 8.51998C5.87514 8.43267 5.76216 8.39929 5.67228 8.44808C5.58241 8.49687 5.5516 8.60985 5.60039 8.69973L5.74932 8.96678C5.775 9.01043 5.81608 9.04381 5.86487 9.05665C5.88028 9.05922 5.89568 9.06179 5.90852 9.06179C5.94447 9.06179 5.97785 9.05152 6.00867 9.03354L6.48114 8.73054C6.56588 8.67662 6.59156 8.56107 6.53763 8.47633C6.48628 8.38902 6.37329 8.36591 6.28599 8.41984Z",
        fill: "currentColor",
      }),
      te.createElement("path", {
        fillRule: "evenodd",
        d: "M10.415 8.30685C10.3431 8.23495 10.2276 8.23495 10.1557 8.30685L9.99647 8.46606L9.83727 8.30685C9.76537 8.23495 9.64982 8.23495 9.57792 8.30685C9.50602 8.37875 9.50602 8.4943 9.57792 8.5662L9.73712 8.72541L9.57792 8.88461C9.50602 8.95651 9.50602 9.07206 9.57792 9.14396C9.61387 9.17991 9.66009 9.19788 9.70888 9.19788C9.7551 9.19788 9.80388 9.17991 9.83983 9.14396L9.99904 8.98475L10.1582 9.14396C10.1942 9.17991 10.2404 9.19788 10.2892 9.19788C10.3354 9.19788 10.3842 9.17991 10.4202 9.14396C10.4921 9.07206 10.4921 8.95651 10.4202 8.88461L10.261 8.72541L10.4202 8.5662C10.4869 8.4943 10.4869 8.37875 10.415 8.30685Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(j3, "SvgRequest");
var O3 = j3;
import H1, { createElement as Y3 } from "react";
function U3(e) {
  return Y3(
    i,
    e,
    H1.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      H1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9.50787 23.5806C9.21497 23.8735 8.7401 23.8735 8.44721 23.5806L1.92428 17.0576C1.63139 16.7647 1.63139 16.2899 1.92429 15.997C2.21718 15.7041 2.69206 15.7041 2.98495 15.997L9.50787 22.52C9.80076 22.8129 9.80076 23.2877 9.50787 23.5806Z",
        fill: "currentColor",
      }),
      H1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.97754 23.8003C8.56333 23.8003 8.22754 23.4645 8.22754 23.0503L8.22754 0.949467C8.22754 0.535254 8.56333 0.199467 8.97754 0.199467C9.39175 0.199467 9.72754 0.535254 9.72754 0.949467L9.72754 23.0503C9.72754 23.4645 9.39175 23.8003 8.97754 23.8003Z",
        fill: "currentColor",
      }),
      H1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M22.9849 8.00567C22.692 8.29857 22.2171 8.29856 21.9243 8.00567L15.4013 1.48268C15.1084 1.18979 15.1084 0.714912 15.4013 0.422021C15.6942 0.129129 16.1691 0.129131 16.462 0.422026L22.9849 6.94501C23.2778 7.23791 23.2778 7.71278 22.9849 8.00567Z",
        fill: "currentColor",
      }),
      H1.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M15.9297 23.8003C15.5155 23.8003 15.1797 23.4645 15.1797 23.0503L15.1797 0.949467C15.1797 0.535254 15.5155 0.199467 15.9297 0.199467C16.3439 0.199467 16.6797 0.535254 16.6797 0.949467L16.6797 23.0503C16.6797 23.4645 16.3439 23.8003 15.9297 23.8003Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(U3, "SvgReverse");
var _3 = U3;
import ro, { createElement as R3 } from "react";
function G3(e) {
  return R3(
    i,
    e,
    ro.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      ro.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M16.3027 2.55688V3.25637C16.3027 2.55688 16.3023 2.55688 16.3027 2.55688L16.3042 2.55689L16.306 2.55689L16.3107 2.55692L16.324 2.55708C16.3346 2.55724 16.3488 2.55754 16.3662 2.5581C16.401 2.5592 16.4489 2.56132 16.5082 2.56536C16.6266 2.57341 16.7916 2.58921 16.9887 2.62027C17.38 2.68194 17.9132 2.80617 18.4638 3.06C19.5932 3.58064 20.783 4.65118 20.9505 6.71055L20.9528 6.73886V12.5915H19.5539V6.79672C19.4282 5.36387 18.6478 4.68531 17.8781 4.33047C17.4767 4.14544 17.0757 4.05024 16.7709 4.00219C16.6199 3.9784 16.4964 3.96676 16.4132 3.96111C16.3785 3.95874 16.351 3.95744 16.3318 3.95672C14.6677 4.14012 13.8892 4.90998 13.4993 5.57985C13.2937 5.93303 13.1854 6.27902 13.129 6.53714C13.101 6.66531 13.0865 6.76899 13.079 6.8371C13.0753 6.87107 13.0734 6.89588 13.0725 6.91014L13.0721 6.91739V17.264L13.0698 17.2923C12.9025 19.3524 11.72 20.4232 10.5939 20.9434C10.0454 21.1968 9.51429 21.3202 9.12455 21.3811C8.92825 21.4118 8.76389 21.4273 8.64589 21.4351C8.58678 21.439 8.539 21.441 8.50431 21.442C8.48696 21.4426 8.47285 21.4428 8.46222 21.443L8.44888 21.4431L8.4442 21.4431L8.44237 21.4431C6.08877 21.4473 4.79606 20.4508 4.1344 19.3543C3.81715 18.8286 3.6613 18.3082 3.58386 17.9228C3.54488 17.7289 3.52497 17.5653 3.51477 17.4468C3.50965 17.3874 3.50694 17.3389 3.50551 17.3032C3.50479 17.2854 3.50439 17.2707 3.50417 17.2593L3.50395 17.2449L3.50392 17.2396L3.50391 17.2375C3.50391 17.237 3.50391 17.2357 4.2034 17.2357H3.50391V12.5915H4.90289V17.2322L4.90336 17.2471C4.90399 17.2629 4.90542 17.29 4.90859 17.3267C4.91494 17.4005 4.92815 17.5115 4.95541 17.6472C5.01043 17.921 5.11954 18.2791 5.33218 18.6315C5.73009 19.2909 6.55709 20.048 8.44111 20.0441L8.44383 20.0441L8.46281 20.0437C8.48164 20.0431 8.51244 20.0419 8.55355 20.0392C8.63597 20.0337 8.75857 20.0224 8.90841 19.9989C9.21093 19.9516 9.60883 19.8574 10.0072 19.6734C10.7699 19.3211 11.5474 18.6441 11.6731 17.2063V6.88387L12.3726 6.90162C11.6734 6.88387 11.6731 6.8843 11.6731 6.88387L11.6734 6.88211L11.6735 6.88003L11.6736 6.87497L11.6742 6.86126C11.6746 6.85055 11.6754 6.83672 11.6765 6.81995C11.6786 6.78643 11.6822 6.74108 11.6883 6.68546C11.7004 6.57439 11.7224 6.42122 11.7622 6.23869C11.8416 5.87539 11.9943 5.38455 12.2903 4.87607C12.9001 3.82834 14.0767 2.78298 16.2308 2.56058L16.2667 2.55688H16.3027ZM13.0718 6.92355C13.0717 6.92435 13.0717 6.9242 13.0718 6.92355V6.92355Z",
        fill: "currentColor",
      }),
      ro.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M20.2521 13.0936C19.3815 13.0936 18.6758 13.7993 18.6758 14.6698C18.6758 15.5403 19.3815 16.2461 20.2521 16.2461C21.1226 16.2461 21.8283 15.5403 21.8283 14.6698C21.8283 13.7993 21.1226 13.0936 20.2521 13.0936ZM17.2769 14.6698C17.2769 13.0266 18.6089 11.6946 20.2521 11.6946C21.8953 11.6946 23.2273 13.0266 23.2273 14.6698C23.2273 16.313 21.8953 17.645 20.2521 17.645C18.6089 17.645 17.2769 16.313 17.2769 14.6698Z",
        fill: "currentColor",
      }),
      ro.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.20277 8.54253C3.33223 8.54253 2.62652 9.24824 2.62652 10.1188C2.62652 10.9893 3.33223 11.695 4.20277 11.695C5.07331 11.695 5.77902 10.9893 5.77902 10.1188C5.77902 9.24824 5.07331 8.54253 4.20277 8.54253ZM1.22754 10.1188C1.22754 8.47561 2.55959 7.14355 4.20277 7.14355C5.84594 7.14355 7.178 8.47561 7.178 10.1188C7.178 11.762 5.84594 13.094 4.20277 13.094C2.55959 13.094 1.22754 11.762 1.22754 10.1188Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(G3, "SvgRoute");
var K3 = G3;
import qo, { createElement as X3 } from "react";
function J3(e) {
  return X3(
    i,
    e,
    qo.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      qo.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M18.058 4.04189C14.3131 0.296976 8.2414 0.296976 4.49648 4.04189C0.751566 7.78681 0.751566 13.8585 4.49648 17.6034C8.2414 21.3483 14.3131 21.3483 18.058 17.6034C21.8029 13.8585 21.8029 7.78681 18.058 4.04189ZM18.93 3.16988C14.7035 -1.05663 7.85098 -1.05663 3.62447 3.16988C-0.602038 7.39639 -0.602038 14.2489 3.62447 18.4754C7.85098 22.7019 14.7035 22.7019 18.93 18.4754C23.1565 14.2489 23.1565 7.39639 18.93 3.16988Z",
        fill: "currentColor",
      }),
      qo.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M18.0517 17.5971C18.2925 17.3563 18.6829 17.3563 18.9237 17.5971L24.2739 22.9473C24.5147 23.1881 24.5147 23.5785 24.2739 23.8193C24.0331 24.0601 23.6427 24.0601 23.4019 23.8193L18.0517 18.4691C17.8109 18.2283 17.8109 17.8379 18.0517 17.5971Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(J3, "SvgSearch");
var jo = J3;
import n1, { createElement as Q3 } from "react";
function e0(e) {
  return Q3(
    i,
    e,
    n1.createElement(
      "svg",
      { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
      n1.createElement("path", {
        fillRule: "evenodd",
        d: "M7.77732 12.5006C7.82378 12.5797 7.90809 12.6296 8.001 12.6296C8.09392 12.6296 8.17823 12.5797 8.22468 12.5006L8.9353 11.2686C10.7368 10.8402 12.0324 9.20905 12.0324 7.34562C12.0324 5.12259 10.224 3.3125 7.99928 3.3125C5.77453 3.3125 3.96788 5.12259 3.96788 7.34562C3.96788 9.20905 5.2635 10.8419 7.06499 11.2686L7.77732 12.5006ZM4.48407 7.34562C4.48407 5.40649 6.06187 3.82868 8.001 3.82868C9.94014 3.82868 11.5179 5.40649 11.5179 7.34562C11.5179 9.00601 10.3393 10.4531 8.71678 10.7886C8.64451 10.8041 8.58257 10.8488 8.54472 10.9125L8.001 11.8554L7.45729 10.9125C7.42116 10.8488 7.35749 10.8041 7.28523 10.7886C5.66269 10.4548 4.48407 9.00601 4.48407 7.34562Z",
        fill: "currentColor",
      }),
      n1.createElement("path", {
        fillRule: "evenodd",
        d: "M9.81797 8.87615C9.81797 8.73334 9.70268 8.61806 9.55987 8.61806H6.44212C6.29931 8.61806 6.18403 8.73334 6.18403 8.87615C6.18403 9.01896 6.29931 9.13424 6.44212 9.13424H9.55815C9.70096 9.13424 9.81797 9.01896 9.81797 8.87615Z",
        fill: "currentColor",
      }),
      n1.createElement("path", {
        fillRule: "evenodd",
        d: "M6.44212 5.91896H9.55815C9.70096 5.91896 9.81625 5.80368 9.81625 5.66087C9.81625 5.51806 9.70096 5.40278 9.55815 5.40278H6.44212C6.29931 5.40278 6.18403 5.51806 6.18403 5.66087C6.18403 5.80368 6.30103 5.91896 6.44212 5.91896Z",
        fill: "currentColor",
      }),
      n1.createElement("path", {
        fillRule: "evenodd",
        d: "M10.1706 7.26504C10.1706 7.12223 10.0553 7.00694 9.91246 7.00694H6.08926C5.94644 7.00694 5.83116 7.12223 5.83116 7.26504C5.83116 7.40785 5.94644 7.52313 6.08926 7.52313H9.91074C10.0553 7.52313 10.1706 7.40785 10.1706 7.26504Z",
        fill: "currentColor",
      }),
      n1.createElement("path", {
        fillRule: "evenodd",
        d: "M15.1001 5.72137H15.0278C14.7956 5.72137 14.5856 5.81256 14.4256 5.95709C13.6772 3.10947 11.0808 1 8.00086 1C4.92096 1 2.32455 3.10947 1.5778 5.95709C1.41779 5.81256 1.20787 5.72137 0.975589 5.72137H0.901602C0.404344 5.72137 0 6.12571 0 6.62297V8.65674C0 9.15399 0.404344 9.55834 0.901602 9.55834H0.973868C1.47113 9.55834 1.87547 9.15399 1.87547 8.65674V7.63985C1.87547 4.26229 4.62329 1.51618 7.99914 1.51618C11.375 1.51618 14.1228 4.26401 14.1228 7.63985C14.1228 10.3946 12.3041 12.7862 9.67502 13.5312C9.52704 13.3093 9.27411 13.1647 8.98849 13.1647H7.88041C7.42445 13.1647 7.05452 13.5347 7.05452 13.9906V14.0543C7.05452 14.5103 7.42445 14.8802 7.88041 14.8802H8.99021C9.44617 14.8802 9.81611 14.5103 9.81611 14.0543V14.0285C12.1148 13.3781 13.8423 11.568 14.4256 9.32433C14.5856 9.46886 14.7956 9.55834 15.0261 9.55834H15.0984C15.5956 9.55834 16 9.15399 16 8.65674V6.62469C16.0017 6.12743 15.5974 5.72137 15.1001 5.72137ZM1.36101 8.65674C1.36101 8.87009 1.18722 9.04215 0.975589 9.04215H0.901602C0.688246 9.04215 0.516184 8.86837 0.516184 8.65674V6.62469C0.516184 6.41133 0.689966 6.23927 0.901602 6.23927H0.973868C1.18722 6.23927 1.35929 6.41305 1.35929 6.62469V8.65674H1.36101ZM9.30164 14.0543C9.30164 14.2246 9.16227 14.364 8.99193 14.364H7.88041C7.71007 14.364 7.5707 14.2246 7.5707 14.0543V13.9906C7.5707 13.8203 7.71007 13.6809 7.88041 13.6809H8.99021C9.11582 13.6809 9.22594 13.7566 9.27411 13.8668C9.27583 13.8788 9.27583 13.8891 9.27927 13.9012C9.28272 13.9149 9.29132 13.927 9.29648 13.939C9.29992 13.9562 9.30164 13.9734 9.30164 13.9906V14.0543ZM15.4855 8.65674C15.4855 8.87009 15.3117 9.04215 15.1001 9.04215H15.0278C14.8145 9.04215 14.6424 8.86837 14.6424 8.65674V6.62469C14.6424 6.41133 14.8162 6.23927 15.0278 6.23927H15.1001C15.3135 6.23927 15.4855 6.41305 15.4855 6.62469V8.65674Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(e0, "SvgSupport");
var o0 = e0;
import yn, { createElement as t0 } from "react";
function n0(e) {
  return t0(
    i,
    e,
    yn.createElement(
      "svg",
      { viewBox: "0 0 24 24" },
      yn.createElement("path", {
        fillRule: "evenodd",
        d: "M6.99 11 3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z",
        fill: "currentColor",
      }),
    ),
  );
}
o(n0, "SvgSwap");
var r0 = n0;
import io, { createElement as i0 } from "react";
function a0(e) {
  return i0(
    i,
    e,
    io.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      io.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.4551 22.6998C18.3645 22.6998 23.1551 17.9092 23.1551 11.9998C23.1551 6.09031 18.3645 1.29976 12.4551 1.29976C6.54563 1.29976 1.75508 6.09031 1.75508 11.9998C1.75508 17.9092 6.54563 22.6998 12.4551 22.6998ZM12.4551 23.9998C19.0825 23.9998 24.4551 18.6272 24.4551 11.9998C24.4551 5.37234 19.0825 -0.000244141 12.4551 -0.000244141C5.82766 -0.000244141 0.455078 5.37234 0.455078 11.9998C0.455078 18.6272 5.82766 23.9998 12.4551 23.9998Z",
        fill: "currentColor",
      }),
      io.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.1564 6.64951C12.1564 6.29053 11.8654 5.99951 11.5064 5.99951C11.1475 5.99951 10.8564 6.29053 10.8564 6.64951V13.5539C10.8564 13.7039 10.9073 13.8421 10.9927 13.9522C11.0305 14.019 11.0778 14.0798 11.1342 14.1315L15.3897 18.0282C15.6545 18.2706 16.0194 18.2179 16.2049 17.9106C16.3903 17.6032 16.326 17.1574 16.0612 16.915L12.1564 13.3395V6.64951Z",
        fill: "currentColor",
      }),
      io.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.1564 13.3395L16.0612 16.915C16.077 16.9294 16.092 16.9446 16.1063 16.9603C16.1506 17.0092 16.188 17.0642 16.2182 17.1233C16.3425 17.3663 16.3451 17.678 16.2049 17.9106C16.0194 18.2179 15.6545 18.2706 15.3897 18.0282L11.1342 14.1315C11.0778 14.0798 11.0305 14.019 10.9927 13.9522C10.9073 13.8421 10.8564 13.7039 10.8564 13.5539V6.64951C10.8564 6.29053 11.1475 5.99951 11.5064 5.99951C11.8654 5.99951 12.1564 6.29053 12.1564 6.64951V13.3395Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(a0, "SvgTime");
var Oo = a0;
import wn, { createElement as s0 } from "react";
function l0(e) {
  return s0(
    i,
    e,
    wn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      wn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.72071 5.68769C1.71769 2.54635 4.26488 -0.00214142 7.40636 1.35055e-06C10.77 0.00229565 14.1336 0.0022956 17.4972 1.35055e-06C20.6387 -0.00214148 23.1856 2.5459 23.1849 5.68684C23.1845 7.86988 23.1856 9.9259 23.1869 12.0692C23.188 14.0266 23.1892 16.0568 23.1892 18.323C23.1892 18.4865 23.1242 18.6433 23.0086 18.7589L17.9483 23.8194C17.8327 23.935 17.6758 24 17.5123 24C15.9522 24 14.295 23.9993 12.6072 23.9986C10.8818 23.9979 9.1243 23.9971 7.40581 23.9971C4.26467 23.9971 1.71769 21.4485 1.72071 18.3071C1.7249 13.9398 1.7249 10.055 1.72071 5.68769ZM7.40552 1.2332C4.94605 1.23152 2.95155 3.22689 2.95391 5.68651C2.9581 10.0546 2.9581 13.9402 2.95391 18.3083C2.95155 20.7679 4.94602 22.7639 7.40583 22.7639C9.13703 22.7639 10.8892 22.7647 12.6094 22.7654C14.0722 22.766 15.5119 22.7666 16.8957 22.7668V19.5881C16.8957 18.5488 17.7382 17.7064 18.7774 17.7064H21.956C21.9558 15.6878 21.9547 13.8496 21.9537 12.0711C21.9524 9.92644 21.9513 7.8687 21.9517 5.68659C21.9522 3.22658 19.9575 1.23152 17.498 1.2332C14.1339 1.2355 10.7697 1.2355 7.40552 1.2332ZM21.084 18.9396H18.7774C18.4192 18.9396 18.1289 19.2299 18.1289 19.5881V21.8948L21.084 18.9396ZM6.7748 5.67184C6.7748 5.3313 7.05087 5.05524 7.3914 5.05524H17.5122C17.8527 5.05524 18.1288 5.3313 18.1288 5.67184C18.1288 6.01238 17.8527 6.28844 17.5122 6.28844H7.3914C7.05087 6.28844 6.7748 6.01238 6.7748 5.67184ZM6.7748 9.46718C6.7748 9.12664 7.05087 8.85058 7.3914 8.85058H17.5122C17.8527 8.85058 18.1288 9.12664 18.1288 9.46718C18.1288 9.80772 17.8527 10.0838 17.5122 10.0838H7.3914C7.05087 10.0838 6.7748 9.80772 6.7748 9.46718ZM6.7748 13.2625C6.7748 12.922 7.05087 12.6459 7.3914 12.6459H12.4518C12.7924 12.6459 13.0684 12.922 13.0684 13.2625C13.0684 13.603 12.7924 13.8791 12.4518 13.8791H7.3914C7.05087 13.8791 6.7748 13.603 6.7748 13.2625Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(l0, "SvgTransaction");
var p0 = l0;
import De, { createElement as c0 } from "react";
function d0(e) {
  return c0(
    i,
    e,
    De.createElement(
      "svg",
      { viewBox: "0 0 24 25", xmlns: "http://www.w3.org/2000/svg" },
      De.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.3143 10.9429C11.7029 10.9429 12.8286 9.81717 12.8286 8.42857C12.8286 7.03997 11.7029 5.91429 10.3143 5.91429C8.92568 5.91429 7.8 7.03997 7.8 8.42857C7.8 9.81717 8.92568 10.9429 10.3143 10.9429ZM10.3143 11.8571C12.2078 11.8571 13.7429 10.3221 13.7429 8.42857C13.7429 6.53502 12.2078 5 10.3143 5C8.42074 5 6.88571 6.53502 6.88571 8.42857C6.88571 10.3221 8.42074 11.8571 10.3143 11.8571Z",
        fill: "currentColor",
      }),
      De.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M13.7429 20.0857C15.1315 20.0857 16.2571 18.96 16.2571 17.5714C16.2571 16.1828 15.1315 15.0571 13.7429 15.0571C12.3543 15.0571 11.2286 16.1828 11.2286 17.5714C11.2286 18.96 12.3543 20.0857 13.7429 20.0857ZM13.7429 21C15.6364 21 17.1714 19.465 17.1714 17.5714C17.1714 15.6779 15.6364 14.1429 13.7429 14.1429C11.8493 14.1429 10.3143 15.6779 10.3143 17.5714C10.3143 19.465 11.8493 21 13.7429 21Z",
        fill: "currentColor",
      }),
      De.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3 8.42857C3 8.1761 3.20467 7.97143 3.45714 7.97143H6.88571C7.13819 7.97143 7.34286 8.1761 7.34286 8.42857C7.34286 8.68104 7.13819 8.88571 6.88571 8.88571H3.45714C3.20467 8.88571 3 8.68104 3 8.42857Z",
        fill: "currentColor",
      }),
      De.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M16.7143 17.5714C16.7143 17.319 16.919 17.1143 17.1714 17.1143H20.6C20.8525 17.1143 21.0571 17.319 21.0571 17.5714C21.0571 17.8239 20.8525 18.0286 20.6 18.0286H17.1714C16.919 18.0286 16.7143 17.8239 16.7143 17.5714Z",
        fill: "currentColor",
      }),
      De.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14.4286 8.42857C14.4286 8.1761 14.6332 7.97143 14.8857 7.97143H20.6C20.8525 7.97143 21.0571 8.1761 21.0571 8.42857C21.0571 8.68104 20.8525 8.88571 20.6 8.88571H14.8857C14.6332 8.88571 14.4286 8.68104 14.4286 8.42857Z",
        fill: "currentColor",
      }),
      De.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M3 17.5714C3 17.319 3.20467 17.1143 3.45714 17.1143H9.17143C9.4239 17.1143 9.62857 17.319 9.62857 17.5714C9.62857 17.8239 9.4239 18.0286 9.17143 18.0286H3.45714C3.20467 18.0286 3 17.8239 3 17.5714Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(d0, "SvgTune");
var u0 = d0;
import ne, { createElement as m0 } from "react";
function h0(e) {
  return m0(
    i,
    e,
    ne.createElement(
      "svg",
      { viewBox: "0 0 29 28", xmlns: "http://www.w3.org/2000/svg" },
      ne.createElement("circle", { cx: 14.75, cy: 8, r: 7, fill: "#469BF5" }),
      ne.createElement("path", {
        d: "M17.6511 7.26507C17.7689 6.47699 17.1689 6.05337 16.3485 5.77078L16.6147 4.70326L15.9648 4.54134L15.7057 5.58075C15.5349 5.53814 15.3595 5.49799 15.1851 5.45819L15.4461 4.41192L14.7966 4.25L14.5303 5.31717C14.389 5.28498 14.2501 5.25317 14.1154 5.21965L14.1162 5.21629L13.22 4.99251L13.0472 5.68657C13.0472 5.68657 13.5293 5.79709 13.5191 5.80389C13.7823 5.86957 13.8299 6.04376 13.822 6.18183L13.5188 7.39799C13.5369 7.40259 13.5604 7.40925 13.5863 7.41967C13.5647 7.41428 13.5416 7.40841 13.5177 7.40268L13.0927 9.10633C13.0605 9.18628 12.9789 9.30626 12.7949 9.2607C12.8014 9.27014 12.3226 9.14283 12.3226 9.14283L12 9.88668L12.8456 10.0975C13.003 10.1369 13.1571 10.1782 13.309 10.217L13.04 11.2968L13.6891 11.4587L13.9554 10.3904C14.1327 10.4386 14.3048 10.483 14.4733 10.5248L14.2079 11.5881L14.8577 11.75L15.1266 10.6723C16.2347 10.882 17.0679 10.7974 17.4186 9.79515C17.7012 8.98821 17.4046 8.52276 16.8216 8.21923C17.2462 8.12131 17.5658 7.84196 17.6511 7.26507ZM16.1664 9.34702C15.9655 10.154 14.6069 9.71775 14.1664 9.60837L14.5232 8.17787C14.9637 8.28784 16.3762 8.50545 16.1664 9.34702ZM16.3673 7.25338C16.1841 7.98738 15.0533 7.61447 14.6865 7.52303L15.01 6.22566C15.3768 6.3171 16.5581 6.48776 16.3673 7.25338Z",
        fill: "white",
      }),
      ne.createElement("circle", { cx: 7.75, cy: 20, r: 7, fill: "#469BF5" }),
      ne.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.2203 22.2684L7.77769 20.3888L8.64617 20.1426L8.82765 19.5204L7.97212 19.7796L8.8795 16.6945V16.6453C8.87883 16.6255 8.87427 16.6061 8.86609 16.5881C8.85791 16.5701 8.84626 16.5539 8.83182 16.5404C8.81737 16.527 8.80041 16.5165 8.7819 16.5095C8.76339 16.5026 8.7437 16.4994 8.72395 16.5001H7.57029C7.52661 16.4987 7.48374 16.5121 7.4485 16.5379C7.41327 16.5637 7.38769 16.6006 7.37585 16.6427L6.29996 20.2981L5.44444 20.5574L5.25 21.1536L6.10552 20.8944L5.34074 23.4998H9.90353C9.94731 23.5016 9.9904 23.4885 10.0257 23.4626C10.0611 23.4367 10.0865 23.3995 10.098 23.3572L10.3572 22.4628V22.4136C10.3566 22.3938 10.352 22.3744 10.3438 22.3564C10.3356 22.3384 10.324 22.3222 10.3095 22.3087C10.2951 22.2953 10.2781 22.2848 10.2596 22.2778C10.2411 22.2709 10.2214 22.2677 10.2017 22.2684H7.2203Z",
        fill: "white",
      }),
      ne.createElement("circle", { cx: 21.75, cy: 20, r: 7, fill: "#469BF5" }),
      ne.createElement(
        "g",
        { clipPath: "url(#clip0_9706_95224)" },
        ne.createElement("path", {
          d: "M24.0422 18.076C23.8054 17.3151 23.0809 17.1948 22.2192 17.2974L21.9943 16.2204L21.3388 16.3574L21.5578 17.406C21.3854 17.4419 21.21 17.4821 21.0357 17.5222L20.8154 16.4666L20.1602 16.6034L20.3848 17.6801C20.2435 17.7126 20.1047 17.7444 19.9688 17.7729L19.968 17.7695L19.0638 17.958L19.2102 18.6581C19.2102 18.6581 19.6923 18.5478 19.6861 18.5583C19.9516 18.503 20.0703 18.6391 20.1233 18.7669L20.3795 19.9938C20.3978 19.99 20.4219 19.9858 20.4497 19.9839C20.4279 19.9885 20.4046 19.9932 20.3805 19.9985L20.7392 21.7173C20.7451 21.8033 20.7238 21.9468 20.5383 21.9859C20.5483 21.9915 20.0618 22.0853 20.0618 22.0853L20.095 22.8954L20.9481 22.7172C21.1069 22.6843 21.2637 22.6543 21.4172 22.6232L21.645 23.7124L22.2998 23.5758L22.0747 22.498C22.2553 22.4642 22.4296 22.4293 22.5995 22.3937L22.8232 23.4665L23.4788 23.3295L23.2519 22.2422C24.3408 21.9488 25.0542 21.5101 24.9339 20.4551C24.8372 19.6056 24.3675 19.3156 23.7106 19.296C24.0503 19.0231 24.2164 18.6325 24.0422 18.076ZM23.6114 20.5965C23.7817 21.4105 22.3686 21.6089 21.9244 21.7021L21.6232 20.2589C22.0676 20.1662 23.4341 19.7475 23.6114 20.5965ZM22.8813 18.624C23.0357 19.3646 21.8553 19.5209 21.4852 19.5982L21.212 18.2894C21.5821 18.2121 22.7199 17.8517 22.8813 18.624Z",
          fill: "white",
        }),
      ),
      ne.createElement(
        "defs",
        null,
        ne.createElement(
          "clipPath",
          { id: "clip0_9706_95224" },
          ne.createElement("rect", {
            width: 8,
            height: 8,
            fill: "white",
            transform: "translate(16.408 18.1406) rotate(-25.7942)",
          }),
        ),
      ),
    ),
  );
}
o(h0, "SvgUtxoCategory");
var Yo = h0;
import r1, { createElement as g0 } from "react";
function C0(e) {
  return g0(
    i,
    e,
    r1.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      r1.createElement(
        "g",
        { clipPath: "url(#clip0_3736_40081)" },
        r1.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M12.8584 0.862959L15.3058 1.41525C16.9489 1.78602 18.2271 2.07447 19.2188 2.40426C20.2261 2.73925 21.004 3.13692 21.6096 3.76475C21.7414 3.9014 21.8498 4.01602 21.9385 4.11203C21.9394 4.11303 21.9403 4.11403 21.9413 4.11504C22.5067 4.5409 22.9972 5.05945 23.3914 5.64946C23.95 6.48545 24.2066 7.45716 24.3315 8.68458C24.4546 9.89445 24.4546 11.419 24.4546 13.3875V13.4584C24.4546 15.4268 24.4546 16.9514 24.3315 18.1613C24.2066 19.3887 23.95 20.3604 23.3914 21.1964C22.9312 21.8852 22.3398 22.4766 21.651 22.9369C20.815 23.4954 19.8433 23.7521 18.6159 23.8769C17.406 24 15.8814 24 13.9129 24H10.9962C9.02776 24 7.50318 24 6.29331 23.8769C5.06589 23.7521 4.09417 23.4954 3.25818 22.9369C2.56938 22.4766 1.97797 21.8852 1.51773 21.1964C0.959139 20.3604 0.702521 19.3887 0.577659 18.1613C0.504912 17.4462 0.475165 16.6211 0.463001 15.6594C0.457469 15.6262 0.45459 15.5921 0.45459 15.5573V13.5198C0.45459 13.4993 0.45459 13.4789 0.45459 13.4584V13.3875C0.45459 13.367 0.45459 13.3465 0.45459 13.3261V11.2885C0.45459 11.2538 0.457469 11.2197 0.463001 11.1865C0.475164 10.2248 0.504912 9.3997 0.577659 8.68458C0.702521 7.45716 0.959139 6.48545 1.51773 5.64946C1.85461 5.14527 2.26177 4.69328 2.72596 4.3067C3.11565 3.02447 3.55365 2.07925 4.32097 1.37775C4.84839 0.895558 5.46731 0.520025 6.14202 0.271815C6.96557 -0.0311507 7.84132 -0.0555731 8.89761 0.0751007C9.93706 0.203692 11.2152 0.492136 12.8584 0.862959ZM4.39684 3.35079C4.95892 3.15746 5.58334 3.04115 6.29331 2.96893C7.50318 2.84585 9.02777 2.84586 10.9962 2.84586H13.9129C14.7013 2.84586 15.4185 2.84586 16.0727 2.85376C15.7378 2.77698 15.3811 2.69646 15.0007 2.61061L12.6204 2.07346C10.9367 1.6935 9.7179 1.41918 8.7462 1.29897C7.7843 1.17997 7.13094 1.22202 6.56779 1.42918C6.04187 1.62266 5.56127 1.91472 5.15307 2.28791C4.85984 2.55599 4.61826 2.89086 4.39684 3.35079ZM1.68779 13.4229C1.68779 12.8782 1.68785 12.3738 1.69023 11.9051H4.6285C5.46675 11.9051 6.14629 12.5847 6.14629 13.4229C6.14629 14.2612 5.46675 14.9407 4.6285 14.9407H1.69023C1.68785 14.4721 1.68779 13.9676 1.68779 13.4229ZM1.70507 16.1739H4.6285C6.14783 16.1739 7.37949 14.9423 7.37949 13.4229C7.37949 11.9036 6.14783 10.6719 4.6285 10.6719H1.70507C1.72046 9.96264 1.74955 9.34986 1.80453 8.80939C1.91947 7.67947 2.14247 6.93418 2.5431 6.33459C2.91337 5.78044 3.38916 5.30464 3.94331 4.93437C4.5429 4.53374 5.2882 4.31074 6.41812 4.1958C7.55834 4.07981 9.02038 4.07906 11.0317 4.07906H13.8775C15.8888 4.07906 17.3508 4.07981 18.491 4.1958C19.621 4.31074 20.3663 4.53374 20.9658 4.93437C21.52 5.30464 21.9958 5.78044 22.3661 6.33459C22.7667 6.93418 22.9897 7.67947 23.1046 8.80939C23.2206 9.94961 23.2214 11.4117 23.2214 13.4229C23.2214 15.4342 23.2206 16.8963 23.1046 18.0365C22.9897 19.1664 22.7667 19.9117 22.3661 20.5113C21.9958 21.0654 21.52 21.5412 20.9658 21.9115C20.3663 22.3121 19.621 22.5351 18.491 22.6501C17.3508 22.7661 15.8888 22.7668 13.8775 22.7668H11.0317C9.02038 22.7668 7.55834 22.7661 6.41812 22.6501C5.2882 22.5351 4.5429 22.3121 3.94331 21.9115C3.38916 21.5412 2.91337 21.0654 2.5431 20.5113C2.14247 19.9117 1.91947 19.1664 1.80453 18.0365C1.74955 17.496 1.72046 16.8832 1.70507 16.1739ZM17.5297 19.1146C17.5297 18.7741 17.8058 18.498 18.1463 18.498H19.5693C19.9098 18.498 20.1859 18.7741 20.1859 19.1146C20.1859 19.4552 19.9098 19.7312 19.5693 19.7312H18.1463C17.8058 19.7312 17.5297 19.4552 17.5297 19.1146Z",
          fill: "currentColor",
        }),
      ),
      r1.createElement(
        "defs",
        null,
        r1.createElement(
          "clipPath",
          { id: "clip0_3736_40081" },
          r1.createElement("rect", {
            width: 24,
            height: 24,
            fill: "white",
            transform: "translate(0.45459)",
          }),
        ),
      ),
    ),
  );
}
o(C0, "SvgWallet");
var f0 = C0;
import vn, { createElement as y0 } from "react";
function w0(e) {
  return y0(
    i,
    e,
    vn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      vn.createElement("path", {
        d: "M22.7245 22.4863H1.73091C1.38524 22.4863 1.05369 22.3491 0.809081 22.1049C0.56447 21.8606 0.426788 21.5293 0.42627 21.1836C0.426608 20.9568 0.485203 20.7339 0.59644 20.5362L11.0923 2.15775C11.1771 2.00885 11.2905 1.87815 11.4259 1.77315C11.5614 1.66815 11.7162 1.5909 11.8816 1.54584C12.0469 1.50078 12.2195 1.48878 12.3895 1.51055C12.5595 1.53231 12.7235 1.5874 12.8722 1.67267C13.075 1.78726 13.2427 1.95497 13.3573 2.15775L23.8531 20.544C23.9681 20.7424 24.0287 20.9677 24.0288 21.197C24.0288 21.4263 23.9683 21.6516 23.8534 21.85C23.7385 22.0485 23.5733 22.2131 23.3743 22.3272C23.1754 22.4414 22.9499 22.501 22.7206 22.5L22.7245 22.4863ZM11.0394 17.7724V20.1196H13.4121V17.7724H11.0394ZM10.9201 8.14893L11.5754 16.5166H12.8644L13.5314 8.16067L10.9201 8.14893Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(w0, "SvgWarning");
var ze = w0;
import Uo, { createElement as v0 } from "react";
function b0(e) {
  return v0(
    i,
    e,
    Uo.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Uo.createElement(
        "g",
        { id: "Icons" },
        Uo.createElement("path", {
          id: "Widget",
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M3 7.76471C3 5.13323 5.13323 3 7.76471 3L16.2353 3C18.8668 3 21 5.13323 21 7.76471V16.2353C21 18.8668 18.8668 21 16.2353 21H7.76471C5.13323 21 3 18.8668 3 16.2353L3 7.76471ZM19.9412 11.4706V7.76471C19.9412 5.718 18.282 4.05882 16.2353 4.05882L10.4118 4.05882V11.4706L19.9412 11.4706ZM19.9412 12.5294V16.2353C19.9412 18.282 18.282 19.9412 16.2353 19.9412H7.76471C5.718 19.9412 4.05882 18.282 4.05882 16.2353L4.05882 12.5294L9.88235 12.5294H19.9412ZM9.35294 11.4706V4.05882L7.76471 4.05882C5.718 4.05882 4.05882 5.718 4.05882 7.76471L4.05882 11.4706L9.35294 11.4706Z",
          fill: "#727272",
        }),
      ),
    ),
  );
}
o(b0, "SvgWidget");
var k0 = b0;
import i1, { createElement as S0 } from "react";
function x0(e) {
  return S0(
    i,
    e,
    i1.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      i1.createElement(
        "g",
        { id: "Width", clipPath: "url(#clip0_5933_20072)" },
        i1.createElement("path", {
          id: "Width_2",
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M0.206748 12.0355C-0.0689161 11.8403 -0.0689161 11.5237 0.206748 11.3284L4.69896 8.14645C4.97462 7.95118 5.42156 7.95118 5.69722 8.14645C5.97289 8.34171 5.97289 8.65829 5.69722 8.85355L2.41003 11.182H21.59L18.3028 8.85355C18.0271 8.65829 18.0271 8.34171 18.3028 8.14645C18.5784 7.95118 19.0254 7.95118 19.301 8.14645L23.7933 11.3284C24.0689 11.5237 24.0689 11.8403 23.7933 12.0355L19.301 15.2175C19.0254 15.4128 18.5784 15.4128 18.3028 15.2175C18.0271 15.0223 18.0271 14.7057 18.3028 14.5104L21.59 12.182H2.41003L5.69722 14.5104C5.97289 14.7057 5.97289 15.0223 5.69722 15.2175C5.42156 15.4128 4.97462 15.4128 4.69896 15.2175L0.206748 12.0355Z",
          fill: "currentColor",
        }),
      ),
      i1.createElement(
        "defs",
        null,
        i1.createElement(
          "clipPath",
          { id: "clip0_5933_20072" },
          i1.createElement("rect", { width: 24, height: 24, fill: "white" }),
        ),
      ),
    ),
  );
}
o(x0, "SvgWidth");
var L0 = x0;
import bn, { createElement as T0 } from "react";
function $0(e) {
  return T0(
    i,
    e,
    bn.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      bn.createElement("path", {
        fill: "currentColor",
        d: "M22.113,8.042l-1.092-6.365C20.9,0.972,20.232,0.501,19.53,0.622c-2.204,2.671-6.05,6.28-11.222,7.169 L1.943,8.882C0.888,9.064,0.18,10.066,0.36,11.121l0.656,3.817c0.182,1.056,1.184,1.764,2.239,1.582l0.669-0.115 c0.188,2.37,1.326,4.157,2.186,5.834c0.093,0.19,0.234,0.349,0.407,0.471c0.807,0.57,1.822,0.801,2.785,0.636 c1.264-0.218,2.308-1.09,2.677-2.412c0.178-0.634-0.144-1.298-0.753-1.546c-1.23-0.504-1.427-0.677-1.28-1.073 c0.19-0.524,0.02-1.117-0.426-1.464c-0.251-0.195-0.237-1.084,0.204-1.441c5.133-0.844,9.918,1.266,12.87,3.035 c0.705-0.12,1.177-0.787,1.055-1.492l-1.094-6.364c0.704-0.121,1.176-0.787,1.054-1.492C23.487,8.392,22.817,7.92,22.113,8.042z  M10.74,20.581c-0.442,1.578-2.273,1.921-3.479,1.071c-0.854-1.675-1.918-3.321-2.057-5.465l2.935-0.503 c-0.201,0.82-0.016,1.727,0.593,2.192C8.174,19.391,9.43,20.049,10.74,20.581z M2.291,14.721l-0.655-3.817 c-0.061-0.35,0.178-0.686,0.526-0.747l7.002-1.203l0.875,5.092L3.036,15.25C2.687,15.309,2.35,15.071,2.291,14.721z M22.304,16.789 c-1.655-0.908-3.338-1.616-5.017-2.098c-2.038-0.587-4.033-0.835-5.956-0.743l-0.916-5.333c1.841-0.558,3.641-1.457,5.366-2.691 c1.418-1.018,2.772-2.241,4.03-3.649L22.304,16.789z",
      }),
    ),
  );
}
o($0, "SvgBullhorn");
var I0 = $0;
import kn, { createElement as P0 } from "react";
function D0(e) {
  return P0(
    i,
    e,
    kn.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      kn.createElement("path", {
        d: "M18.7249 10.2885V6.69047C18.7249 6.5286 18.6347 6.38026 18.4908 6.30582L12.199 3.0485C12.0742 2.98383 11.9256 2.98383 11.8008 3.0485L5.50897 6.30582C5.36514 6.38026 5.2749 6.5286 5.2749 6.69047V10.2885C5.2749 10.4504 5.36514 10.5988 5.50897 10.6733L8.07348 12.0002L5.50897 13.3267C5.36514 13.4012 5.2749 13.5496 5.2749 13.7115L5.27528 17.3102C5.27528 17.4721 5.36552 17.6205 5.50934 17.6948L11.8008 20.9515C11.8632 20.9838 11.9315 21 11.9999 21C12.0683 21 12.1366 20.9838 12.199 20.9515L18.4905 17.6948C18.6343 17.6205 18.7245 17.4721 18.7245 17.3102L18.7249 13.7115C18.7249 13.5496 18.6347 13.4012 18.4908 13.3267L15.9263 12.0002L18.4908 10.6733C18.6347 10.5988 18.7249 10.4504 18.7249 10.2885ZM11.9999 3.92092L17.3489 6.69011L11.9999 9.46104L6.65085 6.69011L11.9999 3.92092ZM17.8582 17.0466L11.9999 20.0791L6.14158 17.0466L6.14127 14.4237L11.8006 17.3553C11.8632 17.3876 11.9315 17.4038 11.9999 17.4038C12.0683 17.4038 12.1366 17.3876 12.1992 17.3553L17.8585 14.4237L17.8582 17.0466ZM17.3495 13.7117L11.9999 16.4828L6.65034 13.7117L9.01624 12.488L11.8008 13.9287C11.8632 13.9609 11.9317 13.9771 11.9999 13.9771C12.0681 13.9771 12.1366 13.9609 12.199 13.9287L14.9836 12.488L17.3495 13.7117ZM17.8586 10.0249L11.9999 13.0563L6.14121 10.0249V7.40188L11.8006 10.3336C11.8632 10.3659 11.9315 10.3821 11.9999 10.3821C12.0683 10.3821 12.1366 10.3659 12.1992 10.3336L17.8586 7.40188V10.0249Z",
        fill: "#727272",
      }),
    ),
  );
}
o(D0, "SvgChains");
var z0 = D0;
import ao, { createElement as M0 } from "react";
function A0(e) {
  return M0(
    i,
    e,
    ao.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      ao.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.49068 9.35508C5.80086 9.27081 6.12485 9.43296 6.24334 9.73176C6.95508 11.5267 8.48265 12.9097 10.3699 13.4254L10.3738 13.4264C10.8831 13.569 11.428 13.6418 11.9996 13.6418C12.5713 13.6418 13.1162 13.569 13.6255 13.4264C13.9367 13.3393 14.2635 13.5012 14.3828 13.8015C14.7188 14.6478 14.9048 15.5795 14.9048 16.5471C14.9048 18.7443 13.949 20.7327 12.421 22.0881C11.1043 23.2795 9.36406 24 7.45241 24C3.34076 24 0 20.659 0 16.5471C0 13.1174 2.33477 10.2125 5.49068 9.35508ZM5.30898 10.7382C2.95349 11.6086 1.26312 13.8904 1.26312 16.5471C1.26312 19.9614 4.03839 22.7368 7.45241 22.7368C9.04089 22.7368 10.4827 22.1394 11.5757 21.1495L11.5807 21.1449C12.8479 20.0219 13.6417 18.3733 13.6417 16.5471C13.6417 15.9326 13.5516 15.3369 13.3856 14.7783C12.9358 14.8631 12.4723 14.9049 11.9996 14.9049C11.3215 14.9049 10.6621 14.8187 10.0351 14.6433C7.95605 14.0747 6.24187 12.6339 5.30898 10.7382Z",
        fill: "currentColor",
      }),
      ao.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.9991 1.26318C8.58512 1.26318 5.80986 4.0386 5.80986 7.45288C5.80986 8.25876 5.96545 9.03186 6.24334 9.73176C6.95508 11.5267 8.48265 12.9097 10.3699 13.4254L10.3738 13.4264C10.8831 13.569 11.428 13.6418 11.9996 13.6418C12.5713 13.6418 13.1162 13.569 13.6255 13.4264L13.6288 13.4261C15.5161 12.9105 17.0437 11.5275 17.7555 9.73257C18.0333 9.03266 18.1884 8.25876 18.1884 7.45288C18.1884 4.0386 15.4132 1.26318 11.9991 1.26318ZM4.54674 7.45288C4.54674 3.34099 7.8875 0 11.9991 0C16.1108 0 19.4516 3.34099 19.4516 7.45288C19.4516 8.42052 19.2655 9.3522 18.9295 10.1985C18.0727 12.3591 16.2361 14.0226 13.9637 14.6441C13.3367 14.8195 12.6778 14.9049 11.9996 14.9049C11.3215 14.9049 10.6621 14.8187 10.0351 14.6433C7.76264 14.0218 5.92563 12.3591 5.06877 10.1985M4.54674 7.45288C4.54674 8.42043 4.73285 9.35227 5.06877 10.1985L4.54674 7.45288Z",
        fill: "currentColor",
      }),
      ao.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M17.7567 9.73176C17.8751 9.43296 18.1991 9.27081 18.5093 9.35508C21.6652 10.2125 24 13.1174 24 16.5471C24 20.659 20.6592 24 16.5476 24C14.6347 24 12.8934 23.2786 11.5764 22.0857C11.4433 21.9652 11.3678 21.7937 11.3688 21.6142C11.3698 21.4347 11.4464 21.264 11.5807 21.1449C12.8479 20.0219 13.6417 18.3733 13.6417 16.5471C13.6417 15.7412 13.4874 14.9676 13.2095 14.2677C13.1432 14.1007 13.1512 13.9133 13.2315 13.7525C13.3117 13.5917 13.4567 13.4727 13.6301 13.4254C15.5173 12.9097 17.0449 11.5267 17.7567 9.73176ZM18.691 10.7382C17.8554 12.4363 16.3929 13.7693 14.6027 14.4375C14.7994 15.106 14.9048 15.8163 14.9048 16.5471C14.9048 18.4806 14.1654 20.2523 12.9466 21.5733C13.9594 22.3074 15.2008 22.7368 16.5476 22.7368C19.9616 22.7368 22.7369 19.9614 22.7369 16.5471C22.7369 13.8904 21.0465 11.6086 18.691 10.7382Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(A0, "SvgColors");
var N0 = A0;
import Sn, { createElement as H0 } from "react";
function V0(e) {
  return H0(
    i,
    e,
    Sn.createElement(
      "svg",
      { viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" },
      Sn.createElement("path", {
        fillRule: "evenodd",
        d: "M24.6739 9.46265C22.5971 7.87997 19.3118 7.61169 19.1712 7.60204C18.9531 7.58467 18.7452 7.70047 18.6556 7.89155C18.6474 7.90313 18.5761 8.05947 18.4966 8.30266C19.8702 8.52269 21.5577 8.96468 23.0842 9.86217C23.3288 10.005 23.4042 10.31 23.2534 10.5416C23.1535 10.694 22.9844 10.777 22.8091 10.777C22.7154 10.777 22.6196 10.7519 22.534 10.7018C19.909 9.15962 16.6318 9.08242 16 9.08242C15.3682 9.08242 12.089 9.15962 9.46603 10.7018C9.22147 10.8465 8.89946 10.7751 8.74864 10.5435C8.59579 10.31 8.6712 10.0069 8.91576 9.86217C10.4423 8.96661 12.1298 8.52269 13.5034 8.30459C13.4239 8.05947 13.3526 7.90506 13.3465 7.89155C13.2548 7.70047 13.0489 7.58081 12.8288 7.60204C12.6882 7.61169 9.40285 7.87997 7.29755 9.48388C6.19905 10.447 4 16.0751 4 20.9409C4 21.0277 4.02446 21.1107 4.06929 21.186C5.5856 23.7106 9.72486 24.3707 10.6685 24.3996C10.6726 24.3996 10.6787 24.3996 10.6848 24.3996C10.8519 24.3996 11.0088 24.3243 11.1067 24.1969L12.0605 22.954C9.48641 22.3248 8.17188 21.2555 8.09647 21.1918C7.88043 21.0123 7.86005 20.6996 8.05163 20.495C8.24117 20.2904 8.57133 20.2711 8.78736 20.4506C8.81793 20.4777 11.2391 22.4232 16 22.4232C20.769 22.4232 23.1902 20.4699 23.2147 20.4506C23.4307 20.2731 23.7588 20.2904 23.9504 20.497C24.1399 20.7016 24.1196 21.0123 23.9035 21.1918C23.8281 21.2555 22.5136 22.3248 19.9395 22.954L20.8933 24.1969C20.9912 24.3243 21.1481 24.3996 21.3152 24.3996C21.3213 24.3996 21.3274 24.3996 21.3315 24.3996C22.2751 24.3707 26.4144 23.7106 27.9307 21.186C27.9755 21.1107 28 21.0277 28 20.9409C28 16.0751 25.801 10.447 24.6739 9.46265ZM12.6087 18.9645C11.5999 18.9645 10.7826 18.0805 10.7826 16.9881C10.7826 15.8956 11.5999 15.0117 12.6087 15.0117C13.6175 15.0117 14.4348 15.8956 14.4348 16.9881C14.4348 18.0805 13.6175 18.9645 12.6087 18.9645ZM19.3913 18.9645C18.3825 18.9645 17.5652 18.0805 17.5652 16.9881C17.5652 15.8956 18.3825 15.0117 19.3913 15.0117C20.4001 15.0117 21.2174 15.8956 21.2174 16.9881C21.2174 18.0805 20.4001 18.9645 19.3913 18.9645Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(V0, "SvgDiscord");
var E0 = V0;
import xn, { createElement as F0 } from "react";
function B0(e) {
  return F0(
    i,
    e,
    xn.createElement(
      "svg",
      { viewBox: "0 0 16 17", xmlns: "http://www.w3.org/2000/svg" },
      xn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.20889 5.83725C4.57975 5.83725 3.97637 6.08718 3.53149 6.53205C3.08662 6.97692 2.83669 7.5803 2.83669 8.20945C2.83669 8.8386 3.08662 9.44198 3.53149 9.88685C3.97637 10.3317 4.57975 10.5817 5.20889 10.5817C5.54212 10.5817 5.79218 10.5219 5.99423 10.4231C6.19629 10.3249 6.37323 10.1764 6.54458 9.96767C6.84599 9.59928 7.09326 9.09805 7.41923 8.43774C7.48453 8.30546 7.55319 8.16703 7.62575 8.02247L7.81553 7.63733C8.13982 6.97814 8.439 6.3703 8.80739 5.92097C9.03623 5.64133 9.30415 5.40579 9.63905 5.2428C9.97395 5.07982 10.3535 5 10.7905 5C11.2991 5 11.8004 5.12085 12.253 5.35258C12.7057 5.58431 13.0968 5.9203 13.3942 6.33285C13.6915 6.7454 13.8866 7.22271 13.9633 7.72544C14.04 8.22817 13.9961 8.74192 13.8353 9.22437C13.6745 9.70682 13.4013 10.1441 13.0383 10.5003C12.6753 10.8565 12.2329 11.1213 11.7475 11.2729C11.2621 11.4245 10.7476 11.4587 10.2464 11.3724C9.74523 11.2862 9.27171 11.0821 8.86488 10.777C8.77606 10.7104 8.71734 10.6112 8.70164 10.5013C8.68593 10.3914 8.71454 10.2798 8.78115 10.1909C8.84777 10.1021 8.94694 10.0434 9.05685 10.0277C9.16676 10.012 9.27841 10.0406 9.36723 10.1072C9.66793 10.3327 10.0179 10.4836 10.3884 10.5473C10.7588 10.611 11.1391 10.5858 11.4979 10.4738C11.8566 10.3617 12.1837 10.1659 12.452 9.90269C12.7203 9.63944 12.9222 9.3162 13.041 8.95961C13.1599 8.60302 13.1923 8.22328 13.1356 7.8517C13.0789 7.48012 12.9348 7.12733 12.715 6.8224C12.4952 6.51747 12.2061 6.26913 11.8715 6.09785C11.5369 5.92657 11.1664 5.83725 10.7905 5.83725C10.4573 5.83725 10.2073 5.89697 10.0052 5.99577C9.80315 6.094 9.62621 6.24248 9.45486 6.45123C9.15345 6.81962 8.90618 7.32085 8.58021 7.98116C8.51491 8.11345 8.44625 8.25187 8.37369 8.39644L8.18392 8.78157C7.85962 9.44076 7.56044 10.0486 7.19206 10.4985C6.96321 10.7776 6.69529 11.0131 6.36039 11.1761C6.02549 11.3391 5.64594 11.4189 5.20889 11.4189C4.70037 11.4188 4.19915 11.2979 3.74653 11.0661C3.29391 10.8343 2.90285 10.4983 2.60556 10.0857C2.30828 9.67314 2.11329 9.19583 2.03665 8.69312C1.96002 8.19041 2.00394 7.67668 2.16479 7.19427C2.32564 6.71186 2.59882 6.27457 2.96181 5.91845C3.32481 5.56232 3.76723 5.29755 4.25263 5.14595C4.73803 4.99434 5.2525 4.96025 5.75366 5.04648C6.25481 5.1327 6.72831 5.33678 7.13512 5.64189C7.1791 5.67491 7.21615 5.71627 7.24414 5.76361C7.27214 5.81095 7.29053 5.86334 7.29828 5.91778C7.30603 5.97223 7.30298 6.02767 7.2893 6.08094C7.27562 6.13421 7.25159 6.18426 7.21857 6.22824C7.18555 6.27222 7.14419 6.30927 7.09685 6.33726C7.04951 6.36526 6.99712 6.38366 6.94267 6.3914C6.88823 6.39915 6.83279 6.3961 6.77952 6.38242C6.72625 6.36875 6.6762 6.34471 6.63222 6.31169C6.22202 6.00293 5.72231 5.83636 5.20889 5.83725Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(B0, "SvgInfinity");
var W0 = B0;
import V1, { createElement as Z0 } from "react";
function q0(e) {
  return Z0(
    i,
    e,
    V1.createElement(
      "svg",
      { viewBox: "0 0 12 13", xmlns: "http://www.w3.org/2000/svg" },
      V1.createElement(
        "g",
        { id: "key" },
        V1.createElement("path", {
          id: "Vector",
          d: "M3.26028 12.4995C3.20753 12.4995 3.1495 12.4942 3.10203 12.489L1.95736 12.3307C1.40876 12.2569 0.912912 11.7663 0.828513 11.2072L0.670263 10.052C0.617513 9.68278 0.775763 9.20278 1.03951 8.93377L3.35523 6.61815C2.98071 5.12011 3.41325 3.53768 4.51573 2.44581C6.22482 0.742057 9.00473 0.736782 10.7191 2.44581C11.5473 3.27394 12.0009 4.37637 12.0009 5.54737C12.0009 6.71837 11.5473 7.82079 10.7191 8.64893C9.61136 9.74608 8.03414 10.1786 6.54659 9.79883L4.2256 12.1144C4.00405 12.3465 3.60843 12.4995 3.26028 12.4995ZM7.61214 1.95525C6.68902 1.95525 5.77117 2.30339 5.0696 3.00493C4.1201 3.94911 3.77723 5.3311 4.17285 6.61815C4.21505 6.76056 4.17813 6.90826 4.07263 7.01375L1.59338 9.49289C1.50371 9.58256 1.42986 9.81465 1.44569 9.93597L1.60393 11.0911C1.63558 11.2916 1.85186 11.5184 2.05231 11.5448L3.20225 11.703C3.32885 11.7241 3.56095 11.6503 3.65063 11.5606L6.14042 9.07619C6.24592 8.97069 6.39889 8.93904 6.53604 8.98124C7.80731 9.38212 9.19463 9.03926 10.1441 8.0898C10.8193 7.41463 11.1939 6.50737 11.1939 5.54737C11.1939 4.58209 10.8193 3.6801 10.1441 3.00493C9.45838 2.30866 8.53526 1.95525 7.61214 1.95525Z",
          fill: "#727272",
        }),
        V1.createElement("path", {
          id: "Vector_2",
          d: "M4.84974 11.3351C4.74951 11.3351 4.64929 11.2982 4.57016 11.2191L3.35692 10.0059C3.20394 9.85291 3.20394 9.59973 3.35692 9.44676C3.50989 9.29379 3.76309 9.29379 3.91607 9.44676L5.12931 10.66C5.28229 10.8129 5.28229 11.0661 5.12931 11.2191C5.05019 11.2982 4.94996 11.3351 4.84974 11.3351Z",
          fill: "#727272",
        }),
        V1.createElement("path", {
          id: "Vector_3",
          d: "M7.64781 6.69786C6.99371 6.69786 6.46094 6.16511 6.46094 5.51104C6.46094 4.85697 6.99371 4.32422 7.64781 4.32422C8.30191 4.32422 8.83468 4.85697 8.83468 5.51104C8.83468 6.16511 8.30191 6.69786 7.64781 6.69786ZM7.64781 5.11543C7.43153 5.11543 7.25218 5.29478 7.25218 5.51104C7.25218 5.72731 7.43153 5.90665 7.64781 5.90665C7.86408 5.90665 8.04343 5.72731 8.04343 5.51104C8.04343 5.29478 7.86408 5.11543 7.64781 5.11543Z",
          fill: "#727272",
        }),
      ),
    ),
  );
}
o(q0, "SvgKey");
var j0 = q0;
import Ln, { createElement as O0 } from "react";
function Y0(e) {
  return O0(
    i,
    e,
    Ln.createElement(
      "svg",
      { viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" },
      Ln.createElement("path", {
        fillRule: "evenodd",
        d: "M10.7826 9.2168C8.98375 9.2168 7.25857 9.93139 5.98658 11.2034C4.71459 12.4754 4 14.2005 4 15.9994C4 17.7983 4.71459 19.5234 5.98658 20.7954C7.25857 22.0674 8.98375 22.782 10.7826 22.782C12.5815 22.782 14.3067 22.0674 15.5786 20.7954C16.8506 19.5234 17.5652 17.7983 17.5652 15.9994C17.5652 14.2005 16.8506 12.4754 15.5786 11.2034C14.3067 9.93139 12.5815 9.2168 10.7826 9.2168ZM21.4783 9.73854C19.6052 9.73854 18.087 12.5418 18.087 15.9994C18.087 16.6479 18.1402 17.273 18.2393 17.861C18.3713 18.6451 18.5847 19.3631 18.8612 19.9818C18.9995 20.2912 19.1534 20.5756 19.3209 20.8307C19.6558 21.341 20.045 21.7349 20.4697 21.9791C20.7885 22.1617 21.1271 22.2603 21.4783 22.2603C21.8294 22.2603 22.168 22.1617 22.4868 21.9791C22.9115 21.7349 23.3007 21.341 23.6357 20.8307C23.8031 20.5756 23.957 20.2912 24.0953 19.9818C24.3718 19.3636 24.5852 18.6451 24.7172 17.861C24.8163 17.273 24.8696 16.6479 24.8696 15.9994C24.8696 12.5418 23.3513 9.73854 21.4783 9.73854ZM26.6957 10.2603C26.5605 10.2603 26.4301 10.3505 26.308 10.5185C26.2261 10.6302 26.1478 10.7763 26.0743 10.9531C26.0372 11.0413 26.0012 11.1373 25.9668 11.2406C25.8974 11.4467 25.8327 11.682 25.7737 11.9413C25.6558 12.4604 25.5603 13.0792 25.4941 13.7658C25.4612 14.1091 25.4357 14.4697 25.4179 14.8432C25.4002 15.2163 25.3913 15.6034 25.3913 15.9994C25.3913 16.3954 25.4002 16.7825 25.4179 17.1561C25.4351 17.5297 25.4607 17.8902 25.4941 18.2335C25.5603 18.9201 25.6558 19.5384 25.7737 20.058C25.8327 20.3178 25.8974 20.5526 25.9668 20.7587C26.0012 20.862 26.0372 20.958 26.0743 21.0462C26.1483 21.2231 26.2266 21.3691 26.308 21.4808C26.4301 21.6483 26.5605 21.7385 26.6957 21.7385C27.4162 21.7385 28 19.169 28 15.9994C28 12.8298 27.4162 10.2603 26.6957 10.2603Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(Y0, "SvgMedium");
var U0 = Y0;
import Tn, { createElement as _0 } from "react";
function R0(e) {
  return _0(
    i,
    e,
    Tn.createElement(
      "svg",
      { viewBox: "0 0 25 24", xmlns: "http://www.w3.org/2000/svg" },
      Tn.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.50467 2.93423C8.50467 1.50705 9.66162 0.350098 11.0888 0.350098H13.8205C15.2477 0.350098 16.4047 1.50706 16.4047 2.93424C16.4047 3.92275 17.4748 4.5406 18.3309 4.04632C19.5669 3.33272 21.1474 3.75618 21.861 4.99218L23.2268 7.35787C23.9404 8.59386 23.5169 10.1743 22.2809 10.8879C21.4248 11.3822 21.4248 12.6179 22.2809 13.1121C23.5169 13.8257 23.9404 15.4062 23.2268 16.6422L21.861 19.0079C21.1474 20.2439 19.5669 20.6673 18.3309 19.9537C17.4748 19.4595 16.4047 20.0773 16.4047 21.0659C16.4047 22.4931 15.2477 23.6501 13.8205 23.6501H11.0889C9.66164 23.6501 8.50467 22.4931 8.50467 21.0659C8.50467 20.0773 7.43452 19.4595 6.57844 19.9537C5.34246 20.6673 3.76202 20.2439 3.04842 19.0079L1.68258 16.6422C0.968984 15.4062 1.39246 13.8257 2.62845 13.1121C3.48456 12.6179 3.48456 11.3822 2.62845 10.8879C1.39247 10.1743 0.968985 8.59386 1.68258 7.35787L3.04842 4.99216C3.76202 3.75618 5.34248 3.33271 6.57845 4.0463C7.43455 4.54057 8.50467 3.92274 8.50467 2.93423ZM11.0888 1.6501C10.3796 1.6501 9.80467 2.22502 9.80467 2.93423C9.80467 4.92351 7.65119 6.16676 5.92845 5.17214C5.31425 4.81752 4.52886 5.02797 4.17426 5.64216L2.80842 8.00787C2.4538 8.62208 2.66425 9.40746 3.27845 9.76207C5.00123 10.7567 5.00123 13.2433 3.27845 14.238C2.66424 14.5926 2.4538 15.378 2.80841 15.9922L4.17426 18.3579C4.52886 18.9721 5.31424 19.1825 5.92844 18.8279C7.65123 17.8333 9.80467 19.0766 9.80467 21.0659C9.80467 21.7751 10.3796 22.3501 11.0889 22.3501H13.8205C14.5297 22.3501 15.1047 21.7751 15.1047 21.0659C15.1047 19.0766 17.2581 17.8332 18.9809 18.8279C19.5951 19.1825 20.3805 18.9721 20.7351 18.3579L22.101 15.9922C22.4556 15.378 22.2451 14.5926 21.6309 14.238C19.9082 13.2433 19.9082 10.7567 21.6309 9.76207C22.2451 9.40746 22.4556 8.62208 22.101 8.00787L20.7351 5.64218C20.3805 5.02798 19.5951 4.81753 18.9809 5.17215C17.2582 6.16678 15.1047 4.92353 15.1047 2.93424C15.1047 2.22503 14.5297 1.6501 13.8205 1.6501H11.0888ZM12.4547 8.2501C10.3836 8.2501 8.70467 9.92903 8.70467 12.0001C8.70467 14.0712 10.3836 15.7501 12.4547 15.7501C14.5257 15.7501 16.2047 14.0712 16.2047 12.0001C16.2047 9.92903 14.5257 8.2501 12.4547 8.2501ZM7.40467 12.0001C7.40467 9.21106 9.66563 6.9501 12.4547 6.9501C15.2437 6.9501 17.5047 9.21106 17.5047 12.0001C17.5047 14.7891 15.2437 17.0501 12.4547 17.0501C9.66563 17.0501 7.40467 14.7891 7.40467 12.0001Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(R0, "SvgSettings");
var G0 = R0;
import Me, { createElement as K0 } from "react";
function X0(e) {
  return K0(
    i,
    e,
    Me.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      Me.createElement(
        "g",
        { id: "Style" },
        Me.createElement(
          "g",
          { id: "Vector" },
          Me.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3.12348 3.15363C4.43468 1.84244 6.40414 1.33337 8.96989 1.33337H10.9699C11.3381 1.33337 11.6366 1.63185 11.6366 2.00004C11.6366 2.36823 11.3381 2.6667 10.9699 2.6667H8.96989C6.53564 2.6667 5.0051 3.15763 4.06629 4.09644C3.12749 5.03525 2.63656 6.56579 2.63656 9.00004V15C2.63656 17.4343 3.12749 18.9648 4.06629 19.9036C5.0051 20.8424 6.53564 21.3334 8.96989 21.3334H14.9699C17.4041 21.3334 18.9347 20.8424 19.8735 19.9036C20.8123 18.9648 21.3032 17.4343 21.3032 15V13C21.3032 12.6318 21.6017 12.3334 21.9699 12.3334C22.3381 12.3334 22.6366 12.6318 22.6366 13V15C22.6366 17.5658 22.1275 19.5352 20.8163 20.8464C19.5051 22.1576 17.5356 22.6667 14.9699 22.6667H8.96989C6.40414 22.6667 4.43468 22.1576 3.12348 20.8464C1.81229 19.5352 1.30322 17.5658 1.30322 15V9.00004C1.30322 6.43428 1.81229 4.46483 3.12348 3.15363Z",
            fill: "currentColor",
          }),
          Me.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M20.6533 2.70122C19.1946 3.28847 17.4352 4.33801 15.7767 5.56928C14.1164 6.80192 12.599 8.18569 11.6112 9.41666C11.611 9.41693 11.6108 9.41719 11.6106 9.41746L10.5735 10.7179C11.1923 10.8971 11.7777 11.2353 12.2798 11.7366C12.7724 12.2208 13.1029 12.7819 13.2804 13.3834L14.5634 12.3603C14.5631 12.3605 14.5636 12.3601 14.5634 12.3603C15.794 11.3727 17.1734 9.85753 18.4009 8.19869C19.6287 6.53961 20.6747 4.77756 21.2617 3.31231L21.2625 3.3104C21.342 3.11383 21.2901 2.93258 21.1592 2.80166C21.0422 2.68463 20.858 2.62459 20.6533 2.70122ZM12.0795 14.126C12.0087 13.6037 11.7766 13.111 11.3436 12.686L11.3392 12.6817C10.8986 12.2411 10.3815 11.9985 9.85474 11.9241C9.70039 11.9146 9.58818 11.909 9.48218 11.9156C9.25816 11.9296 9.04212 11.83 8.90739 11.6504C8.77266 11.4709 8.73731 11.2356 8.81333 11.0244C8.92575 10.7122 9.09202 10.4104 9.3202 10.151L10.5694 8.5846L10.5706 8.58306C11.6528 7.23423 13.2651 5.77332 14.9819 4.49873C16.6987 3.22417 18.5618 2.1049 20.162 1.46169L20.1721 1.4576C20.9057 1.17667 21.6398 1.39669 22.102 1.85885C22.5709 2.32773 22.799 3.06605 22.4991 3.80916C21.856 5.4137 20.7423 7.27624 19.4727 8.99182C18.203 10.7076 16.7469 12.3178 15.3978 13.4002L15.3963 13.4015L13.8162 14.6615L13.8006 14.6736C13.5646 14.8505 13.3122 15.0042 13.0135 15.1211C12.8083 15.2014 12.5767 15.1751 12.3948 15.0509C12.2128 14.9267 12.1039 14.7206 12.1039 14.5003C12.1039 14.3817 12.0961 14.2604 12.0795 14.126Z",
            fill: "currentColor",
          }),
          Me.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9.8644 11.9144C9.71005 11.9048 9.59784 11.8992 9.49184 11.9059C9.48226 11.9065 9.47267 11.9069 9.46307 11.9071C8.20229 11.9313 7.05337 12.8306 6.9031 14.2118C6.90307 14.2121 6.90312 14.2116 6.9031 14.2118L6.69317 16.1812L6.69292 16.1835C6.61951 16.8502 7.18196 17.4002 7.82596 17.328L7.82959 17.3276L9.79274 17.1183C10.4333 17.0359 10.9538 16.7633 11.337 16.3809C11.8429 15.866 12.1136 15.1948 12.1136 14.4905C12.1136 14.381 12.1057 14.2498 12.0891 14.1163C12.0188 13.5976 11.7885 13.1116 11.3489 12.6719C10.9082 12.2313 10.3912 11.9887 9.8644 11.9144ZM9.95752 10.5842C9.96234 10.5845 9.96712 10.5848 9.97184 10.5851C9.98719 10.5861 10.0025 10.5876 10.0177 10.5896C10.8435 10.6989 11.6383 11.0757 12.2917 11.7291C12.9311 12.3686 13.3008 13.1215 13.411 13.9418L13.4118 13.9478C13.435 14.1332 13.4469 14.3209 13.4469 14.4905C13.4469 15.5453 13.0383 16.5533 12.2854 17.3182L12.2817 17.3219C11.6862 17.9174 10.8895 18.3235 9.95398 18.4419L9.94094 18.4435L7.97251 18.6532C6.4778 18.8196 5.20177 17.5508 5.36746 16.0388C5.36741 16.0392 5.3675 16.0384 5.36746 16.0388L5.57735 14.0698C5.80677 11.9567 7.56956 10.6164 9.42348 10.5743C9.62029 10.5631 9.81008 10.575 9.95752 10.5842Z",
            fill: "currentColor",
          }),
          Me.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M11.3638 8.19047C11.3638 7.82228 11.6622 7.5238 12.0304 7.5238C14.4998 7.5238 16.4871 9.52342 16.4871 11.9805C16.4871 12.3487 16.1886 12.6471 15.8204 12.6471C15.4522 12.6471 15.1538 12.3487 15.1538 11.9805C15.1538 10.2575 13.7611 8.85713 12.0304 8.85713C11.6622 8.85713 11.3638 8.55866 11.3638 8.19047Z",
            fill: "currentColor",
          }),
        ),
      ),
    ),
  );
}
o(X0, "SvgStyle");
var J0 = X0;
import $n, { createElement as Q0 } from "react";
function e6(e) {
  return Q0(
    i,
    e,
    $n.createElement(
      "svg",
      { viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" },
      $n.createElement("path", {
        fillRule: "evenodd",
        d: "M27.5468 4.97762C27.1374 4.61721 26.4944 4.56565 25.8295 4.84275H25.8285C25.1292 5.13402 6.03537 13.6363 5.25808 13.9837C5.11671 14.0347 3.88199 14.5129 4.00918 15.5783C4.12271 16.5388 5.11507 16.9366 5.23625 16.9825L10.0905 18.708C10.4125 19.8209 11.5998 23.927 11.8623 24.8042C12.0261 25.351 12.293 26.0696 12.7608 26.2175C13.1713 26.3818 13.5796 26.2316 13.8438 26.0163L16.8116 23.1586L21.6025 27.0375L21.7166 27.1083C22.0419 27.2579 22.3536 27.3327 22.6511 27.3327C22.8809 27.3327 23.1014 27.2879 23.3121 27.1984C24.0299 26.8924 24.317 26.1823 24.347 26.1019L27.9256 6.79152C28.144 5.76019 27.8405 5.23545 27.5468 4.97762ZM14.3716 19.3982L12.734 23.9315L11.0965 18.2649L23.6511 8.63149L14.3716 19.3982Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(e6, "SvgTelegram");
var o6 = e6;
import In, { createElement as t6 } from "react";
function n6(e) {
  return t6(
    i,
    e,
    In.createElement(
      "svg",
      { viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" },
      In.createElement("path", {
        fillRule: "evenodd",
        d: "M18.0955 14.3165L26.2864 5H24.3456L17.2303 13.0877L11.5514 5H5L13.5895 17.2311L5 27H6.94072L14.4501 18.4571L20.4486 27H27L18.0955 14.3165ZM15.4365 17.3385L14.5649 16.1198L7.64059 6.43161H10.6219L16.2117 14.2532L17.0797 15.4719L24.3447 25.6381H21.3634L15.4365 17.3385Z",
        fill: "currentColor",
      }),
    ),
  );
}
o(n6, "SvgX");
var r6 = n6;
import Dn from "react";
var i6 = oe({ "100%": { transform: "rotate(360deg)" } }),
  Pn = n("div", {
    position: "relative",
    animation: `${i6} 1.5s linear infinite`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
function Ae(e) {
  let { size: t, color: r, css: l = {} } = e;
  return Dn.createElement(
    Pn,
    { css: l },
    Dn.createElement(Fo, { size: t, color: r }),
  );
}
o(Ae, "Spinner");
function a6(e) {
  switch (e.type) {
    case "success":
      return E1.createElement(D1, { color: e.type, size: 12 });
    case "warning":
      return E1.createElement(ze, { color: e.type, size: 12 });
    case "error":
      return E1.createElement($e, { color: e.type, size: 12 });
    case "loading":
      return E1.createElement(Ae, { color: "info", size: 12 });
    default:
      return E1.createElement(A1, { color: e.type, size: 12 });
  }
}
o(a6, "AlertIcon");
var so = a6;
var zn = n("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: "$xs",
  ".title_typography": { width: "100%" },
  ".title_typography:first-letter": { textTransform: "uppercase" },
  ".footer": { paddingTop: "$5", paddingLeft: "$24" },
  ".description": {
    color: "$neutral700",
    fontSize: "$10",
    lineHeight: "$12",
  },
  variants: {
    type: { success: {}, warning: {}, error: {}, info: {}, loading: {} },
    variant: {
      regular: {
        padding: "$5",
        alignItems: "flex-start",
        backgroundColor: "$neutral400",
      },
      alarm: {
        padding: "$5 $10",
        ".title_typography": { fontWeight: "$medium" },
      },
    },
  },
  compoundVariants: [
    {
      type: "warning",
      variant: "alarm",
      css: {
        $$color: "$colors$warning100",
        [`.${s} &`]: { $$color: "$colors$warning700" },
        backgroundColor: "$$color",
      },
    },
    {
      type: "error",
      variant: "alarm",
      css: {
        $$color: "$colors$error100",
        [`.${s} &`]: { $$color: "$colors$error700" },
        backgroundColor: "$$color",
      },
    },
    {
      type: "info",
      variant: "alarm",
      css: {
        $$color: "$colors$info100",
        [`.${s} &`]: { $$color: "$colors$info700" },
        backgroundColor: "$$color",
      },
    },
    {
      type: "success",
      variant: "alarm",
      css: {
        $$color: "$colors$success100",
        [`.${s} &`]: { $$color: "$colors$success700" },
        backgroundColor: "$$color",
      },
    },
  ],
}),
  Mn = n("div", {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    variants: {
      variant: {
        regular: { justifyContent: "space-between" },
        alarm: { justifyContent: "flex-start" },
      },
    },
  }),
  An = n("div", { display: "flex", alignItems: "center", flex: "1 0 0" }),
  lo = n("div", {
    borderRadius: "$lg",
    width: "$20",
    height: "$20",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    flexShrink: 0,
    variants: {
      type: {
        success: {
          $$color: "$colors$success300",
          [`.${s} &`]: { $$color: "$colors$success600" },
          backgroundColor: "$$color",
        },
        warning: {
          $$color: "$colors$warning300",
          [`.${s} &`]: { $$color: "$colors$warning600" },
          backgroundColor: "$$color",
        },
        error: {
          $$color: "$colors$error300",
          [`.${s} &`]: { $$color: "$colors$error600" },
          backgroundColor: "$$color",
        },
        info: {
          $$color: "$colors$info300",
          [`.${s} &`]: { $$color: "$colors$info600" },
          backgroundColor: "$$color",
        },
        loading: {
          $$color: "$colors$info300",
          [`.${s} &`]: { $$color: "$colors$info600" },
          backgroundColor: "$$color",
        },
      },
      align: { center: { alignSelf: "center" } },
    },
  });
function po(e) {
  let {
    type: t,
    title: r,
    footer: l,
    action: a,
    containerStyles: p,
    variant: c = "regular",
    titleAlign: m,
  } = e,
    C = typeof l == "string";
  return J.createElement(
    zn,
    { className: "_alert", css: p, type: t, variant: c },
    J.createElement(
      Mn,
      { variant: c },
      J.createElement(
        An,
        null,
        J.createElement(lo, { type: t }, J.createElement(so, { type: t })),
        J.createElement(g, { direction: "horizontal", size: 4 }),
        r &&
        J.createElement(
          d,
          {
            color: Rt(t, c),
            align: m,
            variant: "body",
            className: "title_typography",
            size: Gt(c),
          },
          r,
        ),
      ),
      a
        ? J.createElement(
          J.Fragment,
          null,
          J.createElement(g, { direction: "horizontal", size: "20" }),
          J.createElement("div", null, a),
        )
        : null,
    ),
    l
      ? J.createElement(
        "div",
        { className: `footer ${C ? "description" : ""}` },
        l,
      )
      : null,
  );
}
o(po, "Alert");
po.toString = () => "._alert";
import s6 from "react";
import Nn from "react";
var co = n("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ".image": { width: "100%", height: "100%", objectFit: "contain" },
  ".circular": { borderRadius: "$lg" },
});
function W(e) {
  let {
    size: t,
    useAsPlaceholder: r,
    backgroundColor: l = "$secondary100",
    type: a,
    ...p
  } = e,
    c = a === "circular" ? "$lg" : "$xs";
  return Nn.createElement(
    co,
    {
      css: {
        width: t + "px",
        height: t + "px",
        ...(r && { backgroundColor: l, borderRadius: c }),
      },
    },
    !r &&
    Nn.createElement("img", {
      className: `image ${a === "circular" ? "circular" : ""}`,
      ...p,
    }),
  );
}
o(W, "Image");
var Hn = n("button", {
  padding: "$10",
  borderRadius: "$sm",
  width: "100%",
  $$color: "$colors$neutral100",
  [`.${s} &`]: { $$color: "$colors$neutral300" },
  backgroundColor: "$$color",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: 0,
  fontFamily: "inherit",
  [`& ${co}`]: { borderRadius: "$xm", overflow: "hidden" },
  "&:hover": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$neutral100" },
    backgroundColor: "$$color",
  },
  "&:focus-visible": {
    outline: 0,
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$info700" },
    backgroundColor: "$$color",
  },
  variants: {
    selected: {
      true: { outline: "1px solid $secondary500" },
      false: { outline: 0 },
    },
  },
});
function _o(e) {
  let { children: t, selected: r, onClick: l } = e;
  return s6.createElement(Hn, { selected: r, onClick: l }, t);
}
o(_o, "BlockchainsChip");
import { i18n as l6 } from "@lingui/core";
import Ne from "react";
import F1 from "react";
function Ro(e) {
  let { size: t = "1em", color: r } = e;
  return F1.createElement(
    J1,
    {
      ...{ width: t, height: t, color: r, className: "_icon" },
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 18 18",
      className: "c-lekKBq",
    },
    F1.createElement(
      "g",
      { fill: "currentColor" },
      F1.createElement("path", {
        d: "m7.641 6.333.89.492 6.982-2.896a8.471 8.471 0 0 0-.825-.939c-.05.028-.09.044-.09.044L7.315 6.097c.083.084.19.164.33.236H7.64ZM3.134 14.967l7.067-2.947-1.315-.743-5.393 2.291-1.366.578c.251.325.526.63.82.914l.187-.095v.002Z",
      }),
      F1.createElement("path", {
        d: "m16.253 5.1-1.287.498c-1.03.377-5.082 1.975-5.082 1.975.662.365 1.378.759 2.008 1.102 1.612.88.592 2.812.379 3.18l-.01.014a5.873 5.873 0 0 0-.027.046s.151-1.443-.866-1.977a648.55 648.55 0 0 1-4.365-2.313c-.466-.248-.804-.7-.868-1.223-.048-.392.051-.843.521-1.238.274-.254.569-.39.569-.39l5.253-2.156s.033-.013.081-.038l1.093-.454A8.421 8.421 0 0 0 1.447 13.12l2.032-.886 4.046-1.697c-.698-.383-1.342-.739-1.648-.903-.152-.081-.344-.21-.496-.292-.82-.433-1.357-1.656-.113-3.107 0 0-.13 1.377.641 1.845.734.446 3.582 1.905 4.428 2.358.216.116.416.264.576.453.329.39.454.87.316 1.38-.006.025-.015.049-.023.073l-.016.048a1.018 1.018 0 0 1-.037.095c-.29.7-1.062.91-1.062.91L10 13.43l-4.917 2.018-1.084.476A8.42 8.42 0 0 0 16.253 5.099v.002Z",
      }),
    ),
    F1.createElement("path", {
      fill: "currentColor",
      d: "m7.53 10.53 1.36.74-.68.29-1.426-.717.745-.314ZM10.09 13.392s1.13-.8.108-1.378l-.643.268s1.072.287.535 1.11ZM9.889 7.567l-1.361-.74.695-.29 1.437.731-.771.3ZM7.41 4.705s-1.131.801-.108 1.378l.642-.268s-1.072-.287-.535-1.11Z",
      opacity: 0.4,
      style: { mixBlendMode: "multiply" },
    }),
  );
}
o(Ro, "Logo");
var Vn = n("div", {
  display: "flex",
  width: "100%",
  justifyContent: "end",
  alignItems: "center",
}),
  En = n("a", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  });
function Go() {
  return Ne.createElement(
    Vn,
    null,
    Ne.createElement(
      d,
      { variant: "body", size: "xsmall", color: "$neutral700" },
      l6.t("Powered By"),
    ),
    Ne.createElement(g, { direction: "horizontal", size: 8 }),
    Ne.createElement(
      En,
      { href: "https://rango.exchange", target: "_blank" },
      Ne.createElement(Ro, { size: 16, color: "gray" }),
      Ne.createElement(g, { direction: "horizontal", size: 4 }),
      Ne.createElement(
        d,
        { variant: "body", size: "xsmall", color: "neutral700" },
        "RANGO",
      ),
    ),
  );
}
o(Go, "BottomLogo");
import He from "react";
var Fn = n("button", {
  position: "relative",
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$16",
  fontWeight: "$400",
  border: "0",
  borderRadius: "$secondary",
  cursor: "pointer",
  transition: "all 0.35s",
  fontFamily: "inherit",
  variants: {
    size: {
      xxsmall: { fontSize: "$10", lineHeight: "12px", padding: "$4" },
      xsmall: { fontSize: "$12", lineHeight: "12px", padding: "$0 $4" },
      small: {
        fontSize: "$14",
        fontWeight: "$medium",
        lineHeight: "20px",
        padding: "$4 $4",
      },
      medium: {
        fontSize: "$16",
        lineHeight: "24px",
        fontWeight: "$medium",
        padding: "$8 $8",
      },
      large: {
        fontSize: "$18",
        lineHeight: "26px",
        padding: "$12 $24",
        fontWeight: "$medium",
      },
    },
    variant: {
      contained: {
        backgroundColor: "$background",
        color: "$foreground",
        border: 0,
        "&:hover": { backgroundColor: "$neutral300" },
        "&:focus-visible": { backgroundColor: "$neutral500", outline: 0 },
        "&:disabled": {
          $$color: "$colors$background",
          [`.${s} &`]: { $$color: "$colors$foreground" },
          backgroundColor: "$neutral600",
          color: "$$color",
          pointerEvents: "none",
        },
      },
      outlined: {
        backgroundColor: "$background",
        border: 1,
        borderStyle: "solid",
        color: "$foreground",
        borderColor: "$neutral200",
        "&:hover": { borderColor: "$neutral300" },
        "&:focus-visible": { borderColor: "$neutral500", outline: 0 },
        "&:disabled": {
          borderColor: "$neutral600",
          color: "$neutral600",
          pointerEvents: "none",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "$neutral700",
        "&:disabled": { color: "$neutral600", pointerEvents: "none" },
        "&:focus-visible": { backgroundColor: "$neutral500", outline: 0 },
        "&:hover": { color: "$secondary500" },
      },
      default: {},
    },
    fullWidth: { true: { width: "100%" } },
    type: { primary: {}, error: {}, warning: {}, success: {}, secondary: {} },
  },
  compoundVariants: [
    {
      type: "primary",
      variant: "contained",
      css: {
        background: "$primary500",
        $$color: "$colors$background",
        [`.${s} &`]: { $$color: "$colors$foreground" },
        color: "$$color",
        "&:hover": {
          background: "$primary600",
          $$color: "$colors$background",
          [`.${s} &`]: { $$color: "$colors$foreground" },
          color: "$$color",
        },
        "&:disabled": {
          $$color: "$colors$background",
          [`.${s} &`]: { $$color: "$colors$foreground" },
          background: "$neutral600",
          color: "$$color",
          pointerEvents: "none",
        },
        "&:visited": { background: "$primary500" },
        "&:active": {
          backgroundColor: "$primary500",
          backgroundSize: "100%",
          transition: "background 0s",
        },
        "&:focus-visible": { background: "$primary600", outline: 0 },
      },
    },
    {
      type: "primary",
      variant: "outlined",
      css: {
        color: "$primary500",
        borderColor: "$primary500",
        "&:hover": { color: "$primary600", borderColor: "$primary600" },
        "&:focus-visible": {
          color: "$primary600",
          borderColor: "$primary600",
          outline: 0,
        },
      },
    },
    {
      type: "primary",
      variant: "ghost",
      css: {
        color: "$primary500",
        "&:hover": { color: "$primary600" },
        "&:focus-visible": { color: "$primary600", outline: 0 },
      },
    },
    {
      type: "secondary",
      variant: "contained",
      css: {
        background: "$secondary500",
        $$color: "$colors$background",
        [`.${s} &`]: { $$color: "$colors$foreground" },
        color: "$$color",
        "&:hover": {
          background: "$secondary600",
          $$color: "$colors$background",
          [`.${s} &`]: { $$color: "$colors$foreground" },
          color: "$$color",
        },
        "&:visited": { background: "$secondary500" },
        "&:focus": { background: "$secondary600", outline: 0 },
        "&:focus-visible": { background: "$secondary600", outline: 0 },
      },
    },
    {
      type: "secondary",
      variant: "outlined",
      css: {
        color: "$secondary500",
        borderColor: "$secondary500",
        "&:hover": { color: "$secondary600", borderColor: "$secondary600" },
        "&:visited": { color: "$secondary500", borderColor: "$secondary500" },
        "&:focus": {
          color: "$secondary600",
          borderColor: "$secondary500",
          outline: 0,
        },
        "&:focus-visible": {
          color: "$secondary600",
          borderColor: "$secondary500",
          outline: 0,
        },
      },
    },
    {
      type: "secondary",
      variant: "ghost",
      css: {
        color: "$secondary500",
        "&:hover": { color: "$secondary600" },
        "&:visited": { color: "$secondary500" },
        "&:focus": { color: "$secondary600", outline: 0 },
        "&:focus-visible": { color: "$secondary600", outline: 0 },
      },
    },
    {
      type: "error",
      variant: "contained",
      css: {
        background: "$error500",
        $$color: "$colors$background",
        [`.${s} &`]: { $$color: "$colors$foreground" },
        color: "$$color",
        "&:hover": { background: "$error500" },
        "&:visited": { background: "$error500" },
        "&:focus": { background: "$error500" },
        "&:focus-visible": {
          $$outline: "$colors$error600",
          [`.${s} &`]: { $$outline: "$colors$error300" },
          outlineColor: "$$outline",
        },
      },
    },
    {
      type: "error",
      variant: "outlined",
      css: {
        color: "$error500",
        borderColor: "$error500",
        "&:hover": { color: "$error500", borderColor: "$error500" },
        "&:visited": { color: "$error500", borderColor: "$error500" },
        "&:focus": { color: "$error500", borderColor: "$error500" },
        "&:focus-visible": {
          $$outline: "$colors$error600",
          [`.${s} &`]: { $$outline: "$colors$error300" },
          color: "$$outline",
          outlineColor: "$$outline",
        },
      },
    },
    {
      type: "error",
      variant: "ghost",
      css: {
        color: "$error500",
        "&:hover": { color: "$error500" },
        "&:visited": { color: "$error500" },
        "&:focus": { color: "$error500" },
        "&:focus-visible": {
          $$outline: "$colors$error600",
          [`.${s} &`]: { $$outline: "$colors$error300" },
          color: "$$outline",
          outline: 0,
        },
      },
    },
    {
      type: "warning",
      variant: "contained",
      css: {
        background: "$warning500",
        $$color: "$colors$background",
        [`.${s} &`]: { $$color: "$colors$foreground" },
        color: "$$color",
        "&:hover": {
          background: "$warning500",
          $$color: "$colors$background",
          [`.${s} &`]: { $$color: "$colors$foreground" },
          color: "$$color",
        },
        "&:visited": { background: "$warning500" },
        "&:focus": { background: "$warning500" },
        "&:focus-visible": {
          $$outline: "$colors$warning600",
          [`.${s} &`]: { $$outline: "$colors$warning300" },
          outlineColor: "$$outline",
        },
      },
    },
    {
      type: "warning",
      variant: "outlined",
      css: {
        color: "$warning500",
        borderColor: "$warning500",
        "&:hover": { color: "$warning500", borderColor: "$warning500" },
        "&:visited": { color: "$warning500", borderColor: "$warning500" },
        "&:focus": { color: "$warning500", borderColor: "$warning500" },
        "&:focus-visible": {
          $$outline: "$colors$warning600",
          [`.${s} &`]: { $$outline: "$colors$warning300" },
          outlineColor: "$$outline",
          color: "$$outline",
        },
      },
    },
    {
      type: "warning",
      variant: "ghost",
      css: {
        color: "$warning500",
        "&:hover": { color: "$warning500" },
        "&:visited": { color: "$warning500" },
        "&:focus": { color: "$warning500" },
        "&:focus-visible": {
          $$outline: "$colors$warning600",
          [`.${s} &`]: { $$outline: "$colors$warning300" },
          color: "$$outline",
        },
      },
    },
    {
      type: "success",
      variant: "contained",
      css: {
        background: "$success500",
        $$color: "$colors$background",
        [`.${s} &`]: { $$color: "$colors$foreground" },
        color: "$$color",
        "&:hover": {
          background: "$success500",
          $$color: "$colors$background",
          [`.${s} &`]: { $$color: "$colors$foreground" },
          color: "$$color",
        },
        "&:visited": { background: "$success500" },
        "&:focus": { background: "$success500" },
        "&:focus-visible": {
          $$outline: "$colors$success600",
          [`.${s} &`]: { $$outline: "$colors$success300" },
          outlineColor: "$$outline",
        },
      },
    },
    {
      type: "success",
      variant: "outlined",
      css: {
        color: "$success500",
        borderColor: "$success500",
        "&:hover": { color: "$success500", borderColor: "$success500" },
        "&:visited": { color: "$success500", borderColor: "$success500" },
        "&:focus": { color: "$success500", borderColor: "$success500" },
        "&:focus-visible": {
          $$outline: "$colors$success600",
          [`.${s} &`]: { $$outline: "$colors$success300" },
          outlineColor: "$$outline",
          color: "$$outline",
        },
      },
    },
    {
      type: "success",
      variant: "ghost",
      css: {
        color: "$success500",
        "&:hover": { color: "$success500" },
        "&:visited": { color: "$success500" },
        "&:focus": { color: "$success500" },
        "&:focus-visible": {
          $$outline: "$colors$success600",
          [`.${s} &`]: { $$outline: "$colors$success300" },
          outline: 0,
          color: "$$outline",
        },
      },
    },
  ],
  defaultVariants: { size: "medium", variant: "contained" },
}),
  Bn = n("span", {
    flexGrow: 1,
    display: "inline-block",
    variants: {
      pl: { true: { paddingLeft: "$8" } },
      pr: { true: { paddingRight: "$8" } },
    },
  }),
  p6 = oe({ to: { transform: "scale(2)", opacity: 0.1 } }),
  Wn = n("div", {
    position: "absolute",
    inset: "0",
    overflow: "hidden",
    borderRadius: "$sm",
    "& span": {
      transform: "scale(0)",
      borderRadius: "100%",
      position: "absolute",
      opacity: "0.75",
      backgroundColor: "$neutral500",
      animation: `${p6} 0.8s linear`,
    },
  });
import Zn, { useEffect as c6, useState as d6 } from "react";
var u6 = 850,
  m6 = o((e, t, r) => {
    c6(() => {
      let l = null;
      return (
        e > 0 &&
        (l && clearTimeout(l),
          (l = setTimeout(() => {
            r(), l && clearTimeout(l);
          }, t))),
        () => {
          l && clearTimeout(l);
        }
      );
    }, [e, t, r]);
  }, "useDebouncedRippleCleanUp"),
  h6 = o(({ duration: e = u6 }) => {
    let [t, r] = d6([]);
    return (
      m6(t.length, e, () => {
        r([]);
      }),
      Zn.createElement(
        Wn,
        {
          onMouseDown: o((a) => {
            let p = a.currentTarget.getBoundingClientRect(),
              c = p.width > p.height ? p.width : p.height,
              m = a.pageX - p.x - c / 2,
              C = a.pageY - p.y - c / 2,
              k = { x: m, y: C, size: c };
            r([...t, k]);
          }, "addRipple"),
        },
        t.length > 0 &&
        t.map((a, p) => {
          let c = "span" + p;
          return Zn.createElement("span", {
            key: c,
            style: { top: a.y, left: a.x, width: a.size, height: a.size },
          });
        }),
      )
    );
  }, "Ripple"),
  qn = h6;
function g6(e, t) {
  let {
    children: r,
    loading: l,
    disabled: a,
    prefix: p,
    suffix: c,
    onClick: m,
    disableRipple: C,
    ...k
  } = e,
    S = !a && !l && !C;
  return He.createElement(
    Fn,
    { disabled: !l && a, onClick: l || a ? void 0 : m, ...k, ref: t },
    l
      ? He.createElement(Ae, { css: { width: "$24", height: "$24" } })
      : He.createElement(
        He.Fragment,
        null,
        p,
        r &&
        He.createElement(Bn, { pl: !!p, pr: !!c, className: "_text" }, r),
        c,
      ),
    S && He.createElement(qn, null),
  );
}
o(g6, "ButtonComponent");
var ie = He.forwardRef(g6);
ie.displayName = "Button";
import jn from "react";
function C6(e, t) {
  let { style: r, ...l } = e;
  return jn.createElement(
    ie,
    {
      className: "_icon-button",
      ref: t,
      ...l,
      style: { borderRadius: "100%", lineHeight: 0, ...r },
    },
    e.children,
  );
}
o(C6, "IconButtonComponent");
var ce = jn.forwardRef(C6);
ce.displayName = "IconButton";
ce.toString = () => "._icon-button";
import * as _n from "@radix-ui/react-collapsible";
import Ko from "react";
import * as On from "@radix-ui/react-collapsible";
var f6 = oe({
  from: { height: 0 },
  to: { height: "var(--radix-collapsible-content-height)" },
}),
  y6 = oe({
    from: { height: "var(--radix-collapsible-content-height)" },
    to: { height: 0 },
  }),
  uo = n(On.Content, {
    overflow: "hidden",
    variants: {
      open: {
        true: { animation: `${f6} 300ms ease-out` },
        false: { animation: `${y6} 300ms ease-out` },
      },
    },
  });
import * as Yn from "@radix-ui/react-collapsible";
var Un = n(Yn.Trigger, {
  border: "none",
  background: "transparent",
  width: "100%",
});
function w6(e) {
  let { open: t, onOpenChange: r, trigger: l, children: a, ...p } = e;
  return Ko.createElement(
    _n.Root,
    { open: t, onOpenChange: r, ...p },
    Ko.createElement(Un, { asChild: !0 }, l),
    Ko.createElement(uo, { open: t }, a),
  );
}
o(w6, "CollapsibleComponent");
import ye from "react";
import * as mo from "@radix-ui/react-checkbox";
var Rn = n("div", { display: "flex", alignItems: "center" }),
  Gn = n(mo.Root, {
    borderRadius: "$xs",
    position: "relative",
    width: "1rem",
    height: "1rem",
    padding: 0,
    $$borderColor: "$colors$neutral600",
    [`.${s} &`]: { $$borderColor: "$colors$neutral700" },
    border: "1px solid $$borderColor",
    backgroundColor: "transparent",
    cursor: "pointer",
    '&[data-state="checked"]': {
      $$color: "$colors$secondary500",
      [`.${s} &`]: { $$color: "$colors$secondary400" },
      backgroundColor: "$$color",
      borderColor: "$$color",
    },
    "&[data-disabled]": {
      backgroundColor: "$neutral600",
      borderColor: "$neutral700",
    },
  }),
  Kn = n(mo.CheckboxIndicator, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  Xn = n("label", { color: "$foreground", fontSize: "$m", cursor: "pointer" });
function v6(e) {
  let { id: t, label: r, ...l } = e,
    a = t && r;
  return ye.createElement(
    Rn,
    null,
    ye.createElement(
      Gn,
      { id: t, ...l },
      ye.createElement(
        Kn,
        null,
        ye.createElement(z1, { color: "white", size: 12 }),
      ),
    ),
    a
      ? ye.createElement(
        ye.Fragment,
        null,
        ye.createElement(g, { direction: "horizontal", size: 8 }),
        ye.createElement(Xn, { className: "_text", htmlFor: t }, r),
      )
      : null,
  );
}
o(v6, "Checkbox");
import Qn from "react";
var Jn = n("button", {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "$xs",
  padding: "$5 $15",
  cursor: "pointer",
  transition: "all 0.35s",
  border: "1px solid transparent",
  fontFamily: "inherit",
  $$color: "$colors$neutral100",
  [`.${s} &`]: { $$color: "$colors$neutral300" },
  backgroundColor: "$$color",
  "&:hover": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$neutral100" },
    backgroundColor: "$$color",
  },
  "&:focus-visible": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$info700" },
    backgroundColor: "$$color",
    outline: 0,
  },
  variants: { selected: { true: { border: "1px solid $secondary500" } } },
});
function b6(e) {
  let { label: t, selected: r, prefix: l, suffix: a, ...p } = e;
  return Qn.createElement(
    Jn,
    { selected: r, ...p },
    l || null,
    Qn.createElement(
      d,
      { color: r ? void 0 : "neutral700", variant: "body", size: "medium" },
      t,
    ),
    a || null,
  );
}
o(b6, "Chip");
import v, { useState as I6 } from "react";
import Ve from "react";
import S6 from "react";
var k6 = oe({
  "0%": { backgroundPosition: "-468px 0" },
  "100%": { backgroundPosition: "468px 0" },
}),
  er = n("div", {
    $$background:
      "linear-gradient(90deg, $colors$info300 20%, rgba(200, 226, 255, 0.20) 70%, $colors$info300 100%)",
    [`.${s} &`]: {
      $$background:
        "linear-gradient(90deg, $colors$secondary600 0%,rgba(43, 52, 98, 0.20) 70%, $colors$secondary600 100%)",
    },
    background: "$$background",
    backgroundSize: "800px 100px",
    animation: `${k6} 2s infinite ease-out`,
    variants: {
      variant: {
        text: { borderRadius: "$sm" },
        circular: { borderRadius: "$lg" },
        rectangular: {},
        rounded: { borderRadius: "$sm" },
      },
      size: { small: {}, medium: {}, large: {} },
    },
    compoundVariants: [
      { size: "small", variant: "text", css: { height: "$8" } },
      { size: "medium", variant: "text", css: { height: "$12" } },
      { size: "large", variant: "text", css: { height: "$16" } },
    ],
  });
function T(e) {
  let { width: t = "100%" } = e,
    r = e.variant !== "text" ? { width: t, height: e.height } : { width: t };
  return S6.createElement(er, { css: r, ...e });
}
o(T, "Skeleton");
var de = {
  small: { token: 17, chain: 10 },
  xmedium: { token: 22, chain: 10 },
  medium: { token: 27, chain: 10 },
  large: { token: 30, chain: 15 },
};
var or = n("div", {
  position: "relative",
  display: "flex",
  [`& ${W}`]: { borderRadius: "100%" },
}),
  ho = n("div", {
    position: "absolute",
    borderRadius: "100%",
    $$color: "$colors$neutral100",
    [`.${s} &`]: { $$color: "$colors$neutral300" },
    backgroundColor: "$$color",
    variants: {
      size: {
        small: { right: "-3px", bottom: "-3px" },
        xmedium: { right: "-3px", bottom: "-3px" },
        medium: { right: "0", bottom: "0" },
        large: { right: "-5px", bottom: "-5px" },
      },
      hasBorder: {
        true: {
          $$borderColor: "$colors$secondary400",
          [`.${s} &`]: { $$borderColor: "$colors$secondary600" },
          border: "1px solid $$borderColor",
        },
        false: {},
      },
    },
  }),
  tr = n("div", {
    borderRadius: "100%",
    width: "$30",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    variants: {
      hasBorder: {
        true: {
          $$borderColor: "$colors$secondary600",
          [`.${s} &`]: { $$borderColor: "$colors$secondary500" },
          border: "1px solid $$borderColor",
        },
        false: {},
      },
    },
  });
var E = o((e) => {
  let {
    tokenImage: t,
    chainImage: r,
    chianImageId: l,
    size: a,
    useAsPlaceholder: p,
    loading: c,
  } = e;
  return Ve.createElement(
    or,
    { css: c ? {} : { width: de[a].token, height: de[a].token } },
    c
      ? Ve.createElement(T, {
        variant: "circular",
        height: de[a].token,
        width: de[a].token,
      })
      : Ve.createElement(
        tr,
        { hasBorder: !t },
        Ve.createElement(W, {
          size: de[a].token,
          src: t,
          type: "circular",
          ...((p || !t) && {
            useAsPlaceholder: !0,
            backgroundColor: "transparent",
          }),
        }),
      ),
    Ve.createElement(
      ho,
      { size: a, hasBorder: !r },
      c
        ? Ve.createElement(T, {
          variant: "circular",
          height: de[a].chain,
          width: de[a].chain,
        })
        : Ve.createElement(W, {
          id: l,
          size: de[a].chain,
          src: r,
          type: "circular",
          ...((p || !r) && {
            useAsPlaceholder: !0,
            backgroundColor: "transparent",
          }),
        }),
    ),
  );
}, "ChainToken");
import H from "react";
import * as we from "@radix-ui/react-tooltip";
import Ee from "react";
import * as nr from "@radix-ui/react-tooltip";
var rr = n(nr.Content, { zIndex: "999999" }),
  ir = n(d, {
    borderRadius: "$md",
    padding: "$5 $10",
    boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.10)",
    backgroundColor: "$neutral200",
    [`.${s} &`]: { backgroundColor: "$neutral500" },
  }),
  ar = n("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
function P(e) {
  let {
    children: t,
    content: r,
    color: l,
    sideOffset: a,
    container: p,
    open: c,
    side: m = "top",
    styles: C,
    align: k,
  } = e;
  return Ee.createElement(
    we.Provider,
    { delayDuration: 0 },
    Ee.createElement(
      we.Root,
      { open: c },
      Ee.createElement(
        we.Trigger,
        { asChild: !0, style: C?.root },
        Ee.createElement(ar, null, t),
      ),
      Ee.createElement(
        we.Portal,
        { container: p },
        Ee.createElement(
          rr,
          { align: k, side: m, sideOffset: a, collisionBoundary: p },
          Ee.createElement(
            ir,
            { css: C?.content, variant: "label", size: "medium", color: l },
            r,
          ),
        ),
      ),
    ),
  );
}
o(P, "Tooltip");
var sr = n("div", {
  borderRadius: "$xs",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
}),
  Xo = n("div", {
    height: "$12",
    marginLeft: "$10",
    marginRight: "$10",
    borderLeft: "1px solid $foreground",
  }),
  go = z({
    width: "$16",
    height: "$16",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  x6 = oe({ "50%": { opacity: 0.2 } }),
  Co = z({
    display: "flex",
    alignItems: "center",
    cursor: "default",
    "&.feeSection": {
      cursor: "pointer",
      "&:hover": {
        svg: { color: "$secondary" },
        "._typography": { color: "$secondary" },
      },
    },
    "&.warning": {
      animation: `${x6} 2s linear infinite`,
      svg: { color: "$warning500" },
      "._typography": { color: "$warning500" },
    },
  });
function B1(e) {
  let {
    fee: t,
    time: r,
    steps: l,
    onClickFee: a,
    tooltipGas: p,
    feeWarning: c,
    tooltipContainer: m,
  } = e;
  return H.createElement(
    sr,
    null,
    H.createElement(
      P,
      {
        container: m,
        content: p,
        open: !a && !p ? !1 : void 0,
        side: "bottom",
      },
      H.createElement(
        "div",
        {
          className: `${Co()} ${a ? "feeSection" : ""} ${c ? "warning" : ""}`,
          onClick: a,
        },
        H.createElement(
          "div",
          { className: go() },
          H.createElement(Vo, { size: 12, color: "gray" }),
        ),
        H.createElement(g, { direction: "horizontal", size: 2 }),
        H.createElement(
          d,
          { align: "center", variant: "body", size: "small" },
          "$",
          t,
        ),
      ),
    ),
    H.createElement(Xo, null),
    H.createElement(
      "div",
      { className: Co() },
      H.createElement(
        "div",
        { className: go() },
        H.createElement(Oo, { size: 12, color: "gray" }),
      ),
      H.createElement(g, { direction: "horizontal", size: 2 }),
      H.createElement(
        d,
        { align: "center", variant: "body", size: "small" },
        r,
      ),
    ),
    !!l &&
    H.createElement(
      H.Fragment,
      null,
      H.createElement(Xo, null),
      H.createElement(
        "div",
        { className: Co() },
        H.createElement(
          "div",
          { className: go() },
          H.createElement(Wo, { size: 16, color: "gray" }),
        ),
        H.createElement(g, { direction: "horizontal", size: 2 }),
        H.createElement(
          d,
          { align: "center", variant: "body", size: "small" },
          l,
        ),
      ),
    ),
  );
}
o(B1, "QuoteCost");
import pr from "react";
var Fe = z({}),
  lr = n("div", {
    backgroundColor: "$neutral400",
    borderRadius: "$xs",
    padding: "$2 $5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    variants: {
      type: {
        RECOMMENDED: {
          [`& .${Fe}`]: {
            color: "$secondary500",
            [`.${s} &`]: { color: "$secondary400" },
          },
        },
        FASTEST: { [`& .${Fe}`]: { color: "$success500" } },
        HIGH_IMPACT: { [`& .${Fe}`]: { color: "$error500" } },
        LOWEST_FEE: { [`& .${Fe}`]: { color: "#FF4DAD" } },
        CENTRALIZED: { [`& .${Fe}`]: { color: "$warning500" } },
      },
    },
  });
var Jo = o((e) => {
  let { value: t, label: r } = e;
  return pr.createElement(
    lr,
    { type: t },
    pr.createElement(d, { variant: "body", size: "small", className: Fe() }, r),
  );
}, "QuoteTag");
function Qo(e) {
  return !e || e.length <= 4 ? e : e.slice(0, 4) + "...";
}
o(Qo, "shortenAmount");
function et(e) {
  return !e || e.length <= 6 ? e : e.slice(0, 6) + "...";
}
o(et, "shortenDisplayName");
import Z from "react";
import Be from "react";
var cr = n("div", {
  width: "100%",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
}),
  dr = n(d, {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  });
function We(e) {
  let {
    size: t = "medium",
    outputUsdValue: r,
    outputColor: l,
    realOutputUsdValue: a,
    percentageChange: p,
    warningLevel: c,
    error: m,
    tooltipProps: C,
    ...k
  } = e,
    S = "$neutral600";
  return (
    !r || c === "low" ? (S = "$warning500") : c === "high" && (S = "$error500"),
    Be.createElement(
      cr,
      { ...k },
      r &&
      Be.createElement(
        P,
        {
          content: a,
          container: C?.container,
          open: !a || a === "0" ? !1 : void 0,
          side: C?.side,
        },
        Be.createElement(
          dr,
          { size: t, variant: "body", color: l || "$neutral600" },
          r === "0" ? "0.00" : `~$${r}`,
        ),
      ),
      ((r && p) || !r) &&
      Be.createElement(
        Be.Fragment,
        null,
        Be.createElement(g, { direction: "horizontal", size: 4 }),
        Be.createElement(
          d,
          { size: t, variant: "body", color: S },
          r && p && `(${p.includes("-") ? p : `-${p}`}${p ? "%" : "-"})`,
          !r && m,
        ),
      ),
    )
  );
}
o(We, "PriceImpact");
var fo = z({}),
  Y = n("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  ur = n("div", {
    border: "1px solid",
    padding: "$20 $15",
    backgroundColor: "$neutral200",
    borderRadius: "$xm",
    cursor: "pointer",
    gap: "$20",
    display: "flex",
    flexDirection: "column",
    [`.${s} &`]: { backgroundColor: "$neutral500" },
    "&:hover": {
      backgroundColor: "$neutral300",
      [`.${s} &`]: { backgroundColor: "$neutral400" },
    },
    variants: {
      selected: {
        true: {
          $$color: "$colors$secondary500",
          [`.${s} &`]: { $$color: "$colors$secondary400" },
          borderColor: "$$color",
        },
        false: { borderColor: "transparent" },
      },
      hovered: {
        true: {
          "&:hover": {
            backgroundColor: "$neutral200",
            [`.${s} &`]: { backgroundColor: "$neutral500" },
          },
        },
      },
    },
  }),
  mr = n("div", {
    display: "flex",
    justifyContent: "space-between",
    variants: { loading: { true: { padding: "$2" } } },
  }),
  hr = n("div", { display: "flex", gap: "$5" }),
  gr = n("div", { display: "flex", height: "85px" }),
  Cr = n("div", {
    padding: "$10 $5 $5 0",
    height: "100px",
    display: "flex",
    width: "100%",
    variants: {
      isHovered: {
        true: {
          backgroundColor: "$neutral400",
          boxShadow: "4px 4px 10px 0 #0000001A",
          borderRadius: "$xs",
          zIndex: 10,
        },
      },
    },
  }),
  fr = n("div", { width: "100%", display: "flex", height: "100%" }),
  yr = n(Y, {
    minWidth: "42px",
    position: "relative",
    variants: {
      isInternalSwap: {
        true: {
          flexDirection: "column",
          gap: "$5",
          "& .token-info": {
            position: "static",
            flexDirection: "column-reverse",
          },
        },
      },
    },
  }),
  wr = n("div", {
    width: "100%",
    height: "50%",
    borderBottom: "1px dashed",
    borderColor: "$info300",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: "2px",
    [`.${s} &`]: { borderColor: "$secondary600" },
  }),
  vr = n(Y, {
    position: "absolute",
    flexDirection: "column",
    bottom: 0,
    left: 0,
    right: 0,
    [`& .${fo}`]: {
      color: "$neutral700",
      [`.${s} &`]: { color: "$neutral900" },
    },
  }),
  yo = n(Y, {
    flexDirection: "column",
    "& ._typography": {
      color: "$neutral700",
      [`.${s} &`]: { color: "$neutral900" },
    },
  }),
  br = n(Y, { flexDirection: "column", width: "fit-content" }),
  kr = n(Y, { position: "relative" }),
  W1 = n(Y, {
    borderRadius: "$lg",
    position: "relative",
    width: "$24",
    height: "$24",
    border: "1px solid transparent",
    variants: {
      state: {
        warning: { borderColor: "$warning500" },
        error: { borderColor: "$error500" },
      },
    },
  }),
  Sr = n(Y, {
    borderRadius: "$lg",
    position: "absolute",
    width: "$10",
    height: "$10",
    bottom: -3,
    right: -3,
    variants: {
      type: {
        warning: {
          $$color: "$colors$warning300",
          [`.${s} &`]: { $$color: "$colors$warning600" },
          backgroundColor: "$$color",
        },
        error: {
          $$color: "$colors$error300",
          [`.${s} &`]: { $$color: "$colors$error600" },
          backgroundColor: "$$color",
        },
      },
    },
  }),
  xr = n(Y, { flexDirection: "column", paddingLeft: "$8" }),
  wo = n("div", {
    display: "flex",
    width: "calc(50% + 1px)",
    borderRight: "1px dashed",
    height: "$10",
    borderColor: "$info300",
    [`.${s} &`]: { borderColor: "$secondary600" },
  }),
  Lr = n(We, { justifyContent: "center", gap: "$4" }),
  Tr = z({
    position: "relative",
    "&::after": {
      content: "",
      position: "absolute",
      bottom: "-6px",
      right: "-3px",
      transform: "translate(-50%, -50%) rotate(45deg)",
      width: "$6",
      height: "$6",
      borderTop: "2px solid",
      borderRight: "2px solid",
      borderColor: "$info300",
      [`.${s} &`]: { borderColor: "$secondary600" },
    },
  }),
  ot = n("div", {
    height: "$12",
    marginLeft: "$10",
    marginRight: "$10",
    borderLeft: "1px solid $neutral700",
  }),
  $r = n(Y, {
    padding: "$10 $2 0",
    height: "85px",
    gap: "$10",
    flexDirection: "column",
  }),
  Ir = n("div", { display: "flex", alignItems: "center", paddingTop: "$25" }),
  Pr = n("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "$10",
  }),
  Dr = n("div", {
    width: "100%",
    variants: {
      hasFooter: {
        true: {
          paddingBottom: "$5",
          borderBottom: "1px solid",
          borderColor: "$neutral500",
          [`.${s} &`]: { borderColor: "$neutral800" },
        },
      },
    },
  }),
  zr = n(Y, {
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "$10",
  }),
  tt = n("div", { paddingBottom: "$20" });
function Mr() {
  return Z.createElement(
    Z.Fragment,
    null,
    Z.createElement(
      Y,
      null,
      Z.createElement(T, { width: 57.5, variant: "text", size: "large" }),
      Z.createElement(ot, null),
      Z.createElement(T, { width: 57.5, variant: "text", size: "large" }),
      Z.createElement(ot, null),
      Z.createElement(T, { width: 25.5, variant: "text", size: "large" }),
    ),
    Z.createElement(
      Y,
      { css: { gap: "$5" } },
      Z.createElement(T, { width: 153, variant: "text", size: "large" }),
    ),
  );
}
o(Mr, "SkeletonHeader");
function Ar() {
  return Z.createElement(
    $r,
    null,
    Z.createElement(E, {
      useAsPlaceholder: !0,
      size: "large",
      chainImage: "",
      tokenImage: "",
      loading: !0,
    }),
    Z.createElement(T, { variant: "rounded", width: 122, height: 29 }),
  );
}
o(Ar, "SkeletonOutput");
function Nr() {
  return Z.createElement(
    Ir,
    null,
    Z.createElement(T, { variant: "rounded", width: 42, height: 49 }),
  );
}
o(Nr, "SkeletonItemLeft");
function Hr() {
  return Z.createElement(
    Y,
    { css: { flexDirection: "column", gap: "$2" } },
    Z.createElement(T, { variant: "circular", width: 30, height: 30 }),
    Z.createElement(wo, { css: { width: "unset" } }),
  );
}
o(Hr, "SkeletonItemRight");
import a1 from "react";
function s1(e) {
  let {
    style: t = {},
    chainImage: r,
    tokenImage: l,
    tooltipProps: a,
    amount: p,
    name: c,
    isInternalSwap: m,
    size: C = "xmedium",
  } = e;
  return a1.createElement(
    yr,
    { style: t, isInternalSwap: m },
    a1.createElement(E, { size: C, chainImage: r, tokenImage: l }),
    a1.createElement(
      vr,
      { className: "token-info" },
      a1.createElement(
        P,
        {
          content: a?.content,
          container: a?.container,
          side: "bottom",
          open: a?.open,
        },
        a1.createElement(
          d,
          { size: "xsmall", variant: "body", className: m ? fo() : "" },
          p,
        ),
      ),
      a1.createElement(
        d,
        { size: "xsmall", variant: "body", className: fo() },
        c,
      ),
    ),
  );
}
o(s1, "TokenSection");
import { i18n as L6 } from "@lingui/core";
import A from "react";
function Vr(e) {
  let { internalSwaps: t, time: r, fee: l, alerts: a } = e,
    p = !!t.length,
    c = p || !!a;
  return A.createElement(
    Pr,
    null,
    A.createElement(
      Dr,
      { hasFooter: c },
      A.createElement(B1, { fee: l, time: r }),
    ),
    c &&
    A.createElement(
      zr,
      null,
      p &&
      A.createElement(
        A.Fragment,
        null,
        A.createElement(
          d,
          { size: "xsmall", variant: "body" },
          L6.t("Aggregated Transaction"),
        ),
        A.createElement(
          Y,
          { style: { padding: "2px" } },
          t.map((m, C, k) => {
            let S = `internal-item-${C}`,
              D = C === k.length - 1;
            return A.createElement(
              Y,
              { key: S },
              A.createElement(s1, {
                isInternalSwap: !0,
                size: "small",
                chainImage: m.from.chain.image,
                tokenImage: m.from.token?.image || "",
                name: m.from.token?.displayName,
                amount: m.from.price?.value,
              }),
              A.createElement(
                tt,
                null,
                A.createElement(Q1, { color: "black" }),
              ),
              A.createElement(
                yo,
                { style: { paddingBottom: "10px" } },
                A.createElement(
                  W1,
                  null,
                  A.createElement(W, {
                    size: 16,
                    type: "circular",
                    src: m.swapper.image,
                  }),
                ),
                A.createElement(g, { size: 2 }),
                A.createElement(
                  d,
                  { size: "xsmall", variant: "body", align: "center" },
                  m.swapper.displayName,
                ),
              ),
              A.createElement(
                tt,
                null,
                A.createElement(Q1, { color: "black" }),
              ),
              D &&
              A.createElement(
                A.Fragment,
                null,
                A.createElement(s1, {
                  isInternalSwap: !0,
                  size: "small",
                  chainImage: m.to.chain.image,
                  tokenImage: m.to.token?.image || "",
                  name: m.to.token?.displayName,
                  amount: m.to.price?.value,
                }),
              ),
            );
          }),
        ),
      ),
      a,
    ),
  );
}
o(Vr, "TooltipContent");
function P6(e) {
  let {
    loading: t,
    percentageChange: r,
    warningLevel: l,
    tooltipContainer: a,
    onClick: p,
    feeWarning: c,
    selected: m = !1,
  } = e,
    [C, k] = I6(null),
    S = t ? Array(3).fill(void 0) : e.steps,
    D = S.length;
  return v.createElement(
    ur,
    { selected: m, onClick: p, hovered: C !== null },
    v.createElement(
      mr,
      { loading: t },
      t
        ? v.createElement(Mr, null)
        : v.createElement(
          v.Fragment,
          null,
          v.createElement(B1, {
            fee: e.fee,
            time: e.time,
            steps: D,
            feeWarning: c,
          }),
          v.createElement(
            hr,
            null,
            e.tags.map((h) =>
              v.createElement(Jo, {
                key: h.label,
                label: h.label,
                value: h.value,
              }),
            ),
          ),
        ),
    ),
    v.createElement(
      gr,
      null,
      S.map((h, B) => {
        let X = `item-${B}`,
          f = C === B,
          M = B === D - 1,
          ee = B === 0;
        return v.createElement(
          Cr,
          {
            key: X,
            isHovered: f,
            style: { marginLeft: !ee && !t ? "-47px" : "0px" },
          },
          v.createElement(
            P,
            {
              container: a,
              side: "bottom",
              align: M && !ee ? "end" : "start",
              sideOffset: 10,
              open: !t && f,
              styles: {
                root: { width: "100%" },
                content: {
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "$neutral400 !important",
                },
              },
              content: t
                ? null
                : v.createElement(Vr, {
                  internalSwaps: h.internalSwaps || [],
                  time: h.time || "",
                  fee: h.fee || "",
                  alerts: h.alerts,
                }),
            },
            v.createElement(
              fr,
              null,
              t
                ? v.createElement(Nr, null)
                : v.createElement(s1, {
                  style: { opacity: C === B - 1 ? 0 : 1 },
                  chainImage: h.from.chain.image,
                  tokenImage: h.from.token.image,
                  amount: f ? Qo(h.from.price.value) : h.from.price.value,
                  name: f
                    ? et(h.from.token.displayName)
                    : h.from.token.displayName,
                  tooltipProps: {
                    content: h.from.price.realValue,
                    open: h.from.price.realValue ? void 0 : !1,
                    container: a,
                  },
                }),
              v.createElement(
                wr,
                { className: M ? Tr() : "" },
                t
                  ? v.createElement(Hr, null)
                  : v.createElement(
                    v.Fragment,
                    null,
                    v.createElement(
                      yo,
                      null,
                      v.createElement(
                        br,
                        {
                          onMouseEnter: () => k(B),
                          onMouseLeave: () => k(null),
                        },
                        v.createElement(
                          kr,
                          null,
                          h.internalSwaps
                            ? h.internalSwaps.map((T1, Te) => {
                              let N = `${Te}-swapper-image`;
                              return v.createElement(
                                W1,
                                {
                                  state: h.state,
                                  key: N,
                                  style: {
                                    marginLeft: Te !== 0 ? "-10px" : "0px",
                                  },
                                },
                                v.createElement(W, {
                                  size: 22,
                                  type: "circular",
                                  src: T1.swapper.image,
                                }),
                              );
                            })
                            : v.createElement(
                              W1,
                              { state: h.state },
                              v.createElement(W, {
                                size: 22,
                                type: "circular",
                                src: h.swapper.image,
                              }),
                            ),
                          h.state &&
                          v.createElement(
                            Sr,
                            { type: h.state },
                            h.state === "error"
                              ? v.createElement($e, {
                                size: 8,
                                color: "error",
                              })
                              : v.createElement(ze, {
                                size: 8,
                                color: "warning",
                              }),
                          ),
                        ),
                        v.createElement(g, { size: 2 }),
                        v.createElement(
                          d,
                          {
                            size: "xsmall",
                            variant: "body",
                            align: "center",
                          },
                          h.swapper.displayName,
                        ),
                      ),
                    ),
                    v.createElement(wo, null),
                  ),
              ),
              !t &&
              !M &&
              v.createElement(s1, {
                style: { opacity: f ? 1 : 0 },
                chainImage: h.to.chain.image,
                tokenImage: h.to.token.image,
                amount: Qo(h.to.price.value),
                name: et(h.to.token.displayName),
              }),
              !t &&
              M &&
              v.createElement(
                xr,
                null,
                v.createElement(E, {
                  chainImage: h.to.chain.image,
                  tokenImage: h.to.token.image,
                  size: "medium",
                }),
                v.createElement(g, { size: 4 }),
                v.createElement(
                  "div",
                  null,
                  v.createElement(
                    P,
                    {
                      content: e.outputPrice.realValue,
                      container: a,
                      open: e.outputPrice.realValue ? void 0 : !1,
                    },
                    v.createElement(
                      d,
                      { size: "xmedium", variant: "title" },
                      e.outputPrice.value,
                    ),
                    v.createElement(g, { size: 4, direction: "horizontal" }),
                    v.createElement(
                      d,
                      { size: "xmedium", variant: "title" },
                      h.to.token.displayName,
                    ),
                  ),
                ),
                v.createElement(Lr, {
                  size: "small",
                  outputColor: "$neutral700",
                  warningLevel: l,
                  outputUsdValue: e.outputPrice.usdValue,
                  realOutputUsdValue: e.outputPrice.realUsdValue,
                  percentageChange: r,
                  tooltipProps: { container: a },
                }),
              ),
            ),
          ),
        );
      }),
      t && v.createElement(Ar, null),
    ),
  );
}
o(P6, "FullExpandedQuote");
import Z1 from "react";
import { globalCss as D6 } from "@stitches/react";
var ae = 20;
var Er = D6({
  ".rng-scrolled": {
    ".rng-curve-left::before, rng-curve-right::before": {
      borderRadius: "0 !important",
    },
  },
}),
  Fr = n("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "$20 $20 $15 $20",
    $$color: "$colors$neutral100",
    [`.${s} &`]: { $$color: "$colors$neutral300" },
    backgroundColor: "$$color",
    position: "relative",
    ".rng-curve-left,.rng-curve-right": {
      width: 20 * 2,
      height: 20 * 2,
      position: "absolute",
      bottom: 0,
      overflow: "hidden",
      transform: "translateY(100%)",
      "&:before": {
        width: 20 * 2,
        height: 20 * 2,
        display: "block",
        content: "",
        position: "absolute",
        bottom: 0,
        borderRadius: "50%",
        transition: "border-radius 0.5s",
      },
    },
    ".rng-curve-left": {
      left: 0,
      "&:before": { left: 0, boxShadow: `-${20}px -${20}px 0 0 $$color` },
    },
    ".rng-curve-right": {
      right: 0,
      "&:before": { right: 0, boxShadow: `${20}px -${20}px 0 0 $$color` },
    },
  }),
  Br = n("div", { display: "flex", alignItems: "center", gap: "$5" });
function z6({ prefix: e, suffix: t, title: r }) {
  return (
    Er(),
    Z1.createElement(
      Fr,
      null,
      e,
      Z1.createElement(d, { variant: "headline", size: "small" }, r),
      Z1.createElement(Br, null, t),
      Z1.createElement("div", { className: "rng-curve-left" }),
      Z1.createElement("div", { className: "rng-curve-right" }),
    )
  );
}
o(z6, "Header");
import U, { useEffect as M6, useRef as A6, useState as Yr } from "react";
import { createPortal as N6 } from "react-dom";
var Wr = n("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  zIndex: 10,
  borderRadius: "$primary",
  display: "flex",
  overflow: "hidden",
  transition: "background .35s",
  variants: {
    anchor: {
      bottom: { justifyContent: "end", alignItems: "end", bottom: "0" },
      center: { justifyContent: "center", alignItems: "center" },
      right: {
        right: "0",
        left: "unset",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        justifyContent: "end",
      },
    },
    active: {
      true: {
        backgroundColor: "color-mix(in srgb, $neutral500 70%, transparent)",
      },
    },
  },
}),
  Zr = n("div", {
    backgroundColor: "$background",
    width: "100%",
    borderRadius: "$primary",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999999,
    transform: "translateY(100%)",
    transition: "transform .45s ease-in-out",
    variants: {
      anchor: {
        bottom: { width: "100%", maxHeight: "95%" },
        center: { height: "100%" },
        right: {
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          transform: "translateX(100%)",
        },
      },
      active: { true: { transform: "translateY(0)" } },
    },
    compoundVariants: [
      { active: !0, anchor: "right", css: { transform: "translateX(0)" } },
    ],
  }),
  qr = n("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    [`& ${ce}`]: { padding: "$5" },
  }),
  nt = n("div", {
    padding: "$20 $20 $0 $20",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    variants: { noTitle: { true: { justifyContent: "flex-end" } } },
  }),
  jr = n("div", {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "$0 $20 $10 $20",
    backgroundColor: "$background",
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
  }),
  Or = n("div", {
    padding: "0 $20 $10",
    "& .footer__logo": {
      "&.logo__show": { opacity: 1 },
      "&.logo__hidden": { visibility: "hidden" },
    },
  });
var H6 = 600,
  V6 = 100;
function rt(e) {
  let {
    title: t,
    open: r,
    onClose: l,
    styles: a,
    anchor: p = "bottom",
    container: c = document.body,
    prefix: m,
    header: C,
    dismissible: k = !0,
    children: S,
    suffix: D,
    footer: h,
    hasWatermark: B = !0,
    hasCloseIcon: X = !0,
    transitionDuration: f,
  } = e,
    [M, ee] = Yr(!1),
    [T1, Te] = Yr(!1),
    N = A6(null),
    Xe = o((he) => {
      he.stopPropagation(), he.target === he.currentTarget && k && l();
    }, "handleBackDropClick");
  return (
    M6(
      () => (
        c &&
        (N.current && clearTimeout(N.current),
          r
            ? (Te(!0),
              (c.style.overflow = "hidden"),
              (N.current = setTimeout(
                () => {
                  ee(!0);
                },
                typeof f?.enter < "u" ? f?.enter : V6,
              )))
            : (ee(!1),
              (N.current = setTimeout(
                () => {
                  Te(!1), c.style.removeProperty("overflow");
                },
                typeof f?.exit < "u" ? f?.exit : H6,
              )))),
        () => {
          N.current && clearTimeout(N.current);
        }
      ),
      [r, c],
    ),
    U.createElement(
      U.Fragment,
      null,
      T1 &&
      c &&
      N6(
        U.createElement(
          Wr,
          { active: M, onClick: Xe, anchor: p, css: a?.root },
          U.createElement(
            Zr,
            { active: M, css: a?.container, anchor: p },
            C ??
            U.createElement(
              nt,
              { noTitle: !t && k && !m },
              m,
              t &&
              U.createElement(d, { variant: "title", size: "small" }, t),
              U.createElement(
                qr,
                null,
                D,
                k &&
                X &&
                U.createElement(
                  ce,
                  { onClick: l, variant: "ghost" },
                  U.createElement(P1, { color: "gray", size: 14 }),
                ),
              ),
            ),
            U.createElement(jr, { css: a?.content }, S),
            U.createElement(
              Or,
              { css: a?.footer },
              h &&
              U.createElement("div", { className: "footer__content" }, h),
              U.createElement(
                "div",
                {
                  className: `footer__logo ${B ? "logo__show" : "logo__hidden"}`,
                },
                U.createElement(g, { size: 12 }),
                U.createElement(Go, null),
              ),
            ),
          ),
        ),
        c,
      ),
    )
  );
}
o(rt, "Modal");
import ve from "react";
var Ur = n("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}),
  _r = n("div", { width: "100%", textAlign: "center" }),
  Rr = n("div", {
    borderRadius: "50%",
    width: "$45",
    height: "$45",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    variants: {
      type: {
        success: {
          $$color: "$colors$success300",
          [`.${s} &`]: { $$color: "$colors$success600" },
          backgroundColor: "$$color",
        },
        warning: {
          $$color: "$colors$warning300",
          [`.${s} &`]: { $$color: "$colors$warning600" },
          backgroundColor: "$$color",
        },
        error: {
          $$color: "$colors$error300",
          [`.${s} &`]: { $$color: "$colors$error600" },
          backgroundColor: "$$color",
        },
        info: {
          $$color: "$colors$info300",
          [`.${s} &`]: { $$color: "$colors$info600" },
          backgroundColor: "$$color",
        },
        loading: {
          $$color: "$colors$info300",
          [`.${s} &`]: { $$color: "$colors$info600" },
          backgroundColor: "$$color",
        },
      },
    },
  });
import q1 from "react";
function E6(e) {
  switch (e.type) {
    case "success":
      return q1.createElement(D1, { color: e.type, size: 30 });
    case "warning":
      return q1.createElement(ze, { color: e.type, size: 30 });
    case "error":
      return q1.createElement($e, { color: e.type, size: 30 });
    case "loading":
      return q1.createElement(Ae, { color: "info", size: 30 });
    default:
      return q1.createElement(A1, { color: e.type, size: 30 });
  }
}
o(E6, "StatusIcon");
var Gr = E6;
function it(e) {
  let { type: t, title: r, description: l, children: a, icon: p } = e;
  return ve.createElement(
    Ur,
    null,
    ve.createElement(Rr, { type: t }, p || ve.createElement(Gr, { type: t })),
    ve.createElement(g, { size: 4 }),
    ve.createElement(
      d,
      {
        color: t === "loading" ? "info500" : `${t}500`,
        variant: "title",
        size: "medium",
      },
      r,
    ),
    ve.createElement(g, { size: 16 }),
    ve.createElement(
      _r,
      null,
      typeof l == "string"
        ? ve.createElement(
          d,
          { color: "neutral700", variant: "body", size: "medium" },
          l,
        )
        : l,
    ),
    a,
  );
}
o(it, "MessageBox");
import * as Jr from "@radix-ui/react-collapsible";
import be, { useState as F6 } from "react";
import * as Kr from "@radix-ui/react-collapsible";
var Xr = n(Kr.Trigger, {
  padding: "$15",
  paddingBottom: "$5",
  borderRadius: "$xm",
  cursor: "pointer",
  $$backgroundColor: "$colors$neutral200",
  [`.${s} &`]: { $$backgroundColor: "$colors$neutral500" },
  backgroundColor: "$$backgroundColor",
  textAlign: "center",
  border: 0,
  width: "100%",
  "&:hover": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$neutral100" },
    backgroundColor: "$$color",
  },
  "&:focus-visible": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$info700" },
    backgroundColor: "$$color",
    outline: 0,
  },
});
function B6(e) {
  let { description: t, status: r, title: l, children: a } = e,
    [p, c] = F6(!1);
  return be.createElement(
    Jr.Root,
    { open: p, onOpenChange: c },
    be.createElement(
      Xr,
      null,
      be.createElement(it, { title: l, description: t, type: r }),
      be.createElement(uo, { open: p }, be.createElement(g, { size: 12 }), a),
      be.createElement(g, { size: 12 }),
      p
        ? be.createElement(I1, { color: "black", size: 16 })
        : be.createElement(Je, { color: "black", size: 16 }),
    ),
  );
}
o(B6, "CollapsibleMessageBox");
import l1 from "react";
import oi from "react";
import * as vo from "@radix-ui/react-radio-group";
var Qr = n(vo.Item, {
  padding: "0",
  width: "16px",
  height: "16px",
  borderRadius: "100%",
  cursor: "pointer",
  backgroundColor: "transparent",
  $$borderColor: "$colors$neutral600",
  [`.${s} &`]: { $$borderColor: "$colors$neutral700" },
  border: "1px solid $$borderColor",
  '&[data-state="checked"]': {
    $$color: "$colors$secondary500",
    [`.${s} &`]: { $$color: "$colors$secondary400" },
    backgroundColor: "$$color",
    borderColor: "$$color",
  },
}),
  ei = n(vo.Indicator, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    "&::after": {
      content: "",
      display: "block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "$background",
    },
  });
function at(e) {
  let { value: t } = e;
  return oi.createElement(Qr, { value: t, id: t }, oi.createElement(ei, null));
}
o(at, "Radio");
import * as ti from "@radix-ui/react-radio-group";
var st = n(ti.Root, {
  variants: {
    direction: {
      horizontal: { display: "flex", flexDirection: "row", flexWrap: "wrap" },
      vertical: { display: "grid", gridGap: "$24" },
    },
  },
}),
  ni = n("div", { display: "flex", alignItems: "center", marginRight: "$8" }),
  ri = n("div", { display: "flex" }),
  ii = n("label", {
    paddingLeft: "$8",
    cursor: "pointer",
    color: "$foreground",
    "& > span": { display: "block" },
  });
function W6(e) {
  let {
    value: t,
    onChange: r,
    direction: l = "vertical",
    style: a,
    options: p,
  } = e;
  return l1.createElement(
    ri,
    null,
    l1.createElement(
      st,
      { onValueChange: r, value: t, direction: l, style: a },
      p.map((c) =>
        l1.createElement(
          ni,
          { key: c.value },
          l1.createElement(at, { value: c.value }),
          l1.createElement(
            ii,
            { className: "_text", htmlFor: c.value },
            l1.createElement(d, { variant: "body", size: "small" }, c.label),
          ),
        ),
      ),
    ),
  );
}
o(W6, "RadioGroup");
import ke, { createElement as Z6 } from "react";
var ai = n("ellipse", {
  cx: "12.5px",
  cy: "12.5px",
  rx: "7.7px",
  ry: "7.7px",
  strokeLinecap: "round",
  fill: "none",
  strokeDasharray: 100,
  transform: "rotate(20deg)",
  transformOrigin: "center",
  variants: {
    type: {
      "in-progress": { stroke: "$info500", strokeWidth: 2 },
      basic: { strokeWidth: 1.8 },
    },
  },
}),
  lt = n("path", { fill: "$info500" });
var q6 = 59,
  j6 = 100,
  si = 41,
  O6 = 0,
  Y6 = 10,
  U6 = 82,
  _6 = 2,
  li = o((e) => {
    let t = e.progress ? "in-progress" : "basic";
    return ke.createElement(ai, {
      type: t,
      stroke: "currentColor",
      strokeDashoffset: e.progress || q6,
    });
  }, "Ellipse");
function R6(e) {
  let t = o((a) => (a - U6) / Y6, "normalizeValue"),
    r = Math.min(e.progress / _6, si),
    l = r !== si ? O6 : t(e.progress);
  return Z6(
    i,
    e,
    ke.createElement(
      "svg",
      { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      ke.createElement(li, null),
      ke.createElement(li, { progress: j6 - r }),
      ke.createElement("path", {
        d: "M19.2696 9.6089C19.1207 9.49207 19.0218 9.31141 19.01 9.10738L18.807 5.14476C18.788 4.77467 19.0763 4.45089 19.4464 4.43183C19.8165 4.41278 20.1402 4.70108 20.1593 5.07117L20.3622 9.0338C20.3813 9.40389 20.093 9.72767 19.7229 9.74672C19.5584 9.76661 19.3973 9.70903 19.2696 9.6089Z",
        fill: "currentColor",
      }),
      ke.createElement(lt, {
        d: "M19.2696 9.6089C19.1207 9.49207 19.0218 9.31141 19.01 9.10738L18.807 5.14476C18.788 4.77467 19.0763 4.45089 19.4464 4.43183C19.8165 4.41278 20.1402 4.70108 20.1593 5.07117L20.3622 9.0338C20.3813 9.40389 20.093 9.72767 19.7229 9.74672C19.5584 9.76661 19.3973 9.70903 19.2696 9.6089Z",
        fillOpacity: l,
      }),
      ke.createElement("path", {
        d: "M15.5108 9.47903C15.3476 9.35108 15.2457 9.14511 15.2505 8.9198C15.2639 8.55221 15.575 8.25778 15.9482 8.26404L19.707 8.3939C20.0802 8.40016 20.3691 8.71837 20.3628 9.09152C20.3565 9.46466 20.0383 9.75353 19.6652 9.74728L15.9007 9.62451C15.7529 9.62312 15.6243 9.56804 15.5108 9.47903Z",
        fill: "currentColor",
      }),
      ke.createElement(lt, {
        d: "M15.5108 9.47903C15.3476 9.35108 15.2457 9.14511 15.2505 8.9198C15.2639 8.55221 15.575 8.25778 15.9482 8.26404L19.707 8.3939C20.0802 8.40016 20.3691 8.71837 20.3628 9.09152C20.3565 9.46466 20.0383 9.75353 19.6652 9.74728L15.9007 9.62451C15.7529 9.62312 15.6243 9.56804 15.5108 9.47903Z",
        fillOpacity: l,
      }),
    ),
  );
}
o(R6, "RefreshProgressButton");
import { i18n as K6 } from "@lingui/core";
import Se from "react";
import { TransactionType as bo } from "rango-sdk";
var p1 = ((p) => (
  (p.ALL = "ALL"),
  (p.EVM = "EVM"),
  (p.COSMOS = "COSMOS"),
  (p.UTXO = "UTXO"),
  (p.OTHER = "OTHER"),
  p
))(p1 || {});
var pi = { EVM: No, COSMOS: Ao, UTXO: Yo, OTHER: Zo },
  ci = {
    ALL: "All",
    EVM: "EVM",
    COSMOS: "Cosmos",
    UTXO: "UTXO",
    OTHER: "Other",
  },
  di = o((e, t) => {
    switch (t) {
      case "ALL":
        return !0;
      case "UTXO":
        return e.type === bo.TRANSFER;
      case "OTHER":
        return (
          e.type !== bo.TRANSFER && e.type !== bo.COSMOS && e.type !== bo.EVM
        );
      default:
        return e.type === t;
    }
  }, "filterByType"),
  ui = o((e, t) => e.some((r) => di(r, t)), "hasAnyCategory"),
  G6 = o(
    (e) =>
      Object.values(p1)
        .filter((l) => l !== "ALL")
        .reduce((l, a) => {
          let p = e.some((c) => di(c, a));
          return l + (p ? 1 : 0);
        }, 0),
    "getCategoriesCount",
  );
var mi = n("div", {
  display: "grid",
  gap: "$10",
  gridTemplateColumns: "auto 1fr 1fr 1fr 1fr",
}),
  Ef = n("div", {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "$10",
  }),
  Ff = n("img", { position: "absolute", top: -2, width: 15, height: 15 });
function X6(e) {
  let { setCategory: t, category: r, isLoading: l, blockchains: a } = e,
    p = Object.keys(p1);
  return Se.createElement(
    mi,
    null,
    l &&
    Array.from(Array(5), (c, m) =>
      Se.createElement(T, {
        key: m,
        variant: "rounded",
        height: 70,
        width: m === 0 ? 45 : 65,
      }),
    ),
    !l &&
    p.map((c) => {
      let m = c !== "ALL" ? pi[c] : null;
      return (
        ui(a, c) &&
        Se.createElement(
          _o,
          { selected: r === c, key: c, onClick: () => t(c) },
          m &&
          Se.createElement(
            Se.Fragment,
            null,
            Se.createElement(m, { size: 28 }),
            Se.createElement(g, { size: 12 }),
          ),
          Se.createElement(
            d,
            {
              size: "xsmall",
              variant: "body",
              color: c === "ALL" ? "secondary500" : void 0,
            },
            `${ci[c]}`,
          ),
        )
      );
    }),
  );
}
o(X6, "SelectableCategoryList");
import G from "react";
import { i18n as pt } from "@lingui/core";
function hi(e) {
  switch (e) {
    case "failed":
      return pt.t("Failed");
    case "success":
      return pt.t("Completed");
    default:
      return pt.t("In progress");
  }
}
o(hi, "getStatus");
function gi(e, t) {
  if (!e) return "";
  let r = new Date(Number(e)),
    l = 12,
    a = 10;
  if (!t) {
    let D = { year: "numeric", month: "long", day: "numeric" };
    return r.toLocaleDateString(void 0, D);
  }
  let p = r.getHours(),
    c = r.getMinutes(),
    m = p >= l ? "pm" : "am",
    C = p % l === 0 ? l : p % l,
    k = c < a ? `0${c}` : c;
  return `${C}:${k} ${m}`;
}
o(gi, "formattedDateAndTime");
var Ci = n("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: 10,
}),
  ct = n("div", {
    display: "flex",
    padding: 0,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  }),
  fi = n("button", {
    $$color: "$colors$neutral100",
    [`.${s} &`]: { $$color: "$colors$neutral300" },
    backgroundColor: "$$color",
    border: "none",
    width: "100%",
    borderRadius: "$xm",
    gap: 10,
    padding: 15,
    cursor: "pointer",
    fontFamily: "inherit",
    "&:hover": {
      $$color: "$colors$secondary100",
      [`.${s} &`]: { $$color: "$colors$neutral100" },
      backgroundColor: "$$color",
    },
    "&:focus-visible": {
      $$color: "$colors$secondary100",
      [`.${s} &`]: { $$color: "$colors$info700" },
      backgroundColor: "$$color",
      outline: "none",
    },
  }),
  yi = n("div", { display: "flex", padding: "$2", alignItems: "flex-start" }),
  wi = n("div", {
    $$color: "$colors$neutral100",
    [`.${s} &`]: { $$color: "$colors$neutral300" },
    backgroundColor: "$$color",
    border: "none",
    width: "100%",
    borderRadius: "$xm",
    gap: 10,
    padding: 15,
  }),
  vi = n("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 25,
  });
var bi = { failed: "error500", running: "info500", success: "success500" };
import { i18n as J6 } from "@lingui/core";
import b from "react";
var dt = n("div", {
  display: "flex",
  padding: 0,
  alignItems: "center",
  gap: 10,
}),
  ut = n("div", {
    display: "flex",
    padding: 0,
    alignItems: "center",
    alignSelf: "stretch",
  }),
  mt = n("div", {
    display: "flex",
    alignItems: "flex-start",
    variants: {
      direction: {
        column: { flexDirection: "column", flex: "1 0 0" },
        row: { padding: 0 },
      },
    },
  }),
  ki = n("div", {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
  }),
  j1 = n("div", {
    display: "flex",
    padding: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  }),
  ht = n("div", {
    display: "flex",
    padding: "$4",
    width: "$32",
    height: "$32",
    justifyContent: "center",
    alignItems: "center",
  }),
  Si = n("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  xi = n("div", {
    display: "flex",
    width: "$24",
    height: "$24",
    justifyContent: "center",
    alignItems: "center",
  }),
  ay = n("div", { display: "flex", padding: 0, alignItems: "center", gap: 25 });
function gt(e) {
  if ("isLoading" in e)
    return b.createElement(
      dt,
      null,
      b.createElement(
        ut,
        null,
        b.createElement(
          "div",
          null,
          b.createElement(E, {
            tokenImage: "",
            chainImage: "",
            size: "medium",
            loading: !0,
          }),
        ),
        b.createElement(
          "div",
          { style: { transform: "translateX(-5px)" } },
          b.createElement(E, {
            tokenImage: "",
            chainImage: "",
            size: "medium",
            loading: !0,
          }),
        ),
      ),
      b.createElement(
        Si,
        null,
        b.createElement(
          j1,
          null,
          b.createElement(T, { variant: "text", size: "medium", width: 76 }),
          b.createElement(g, { size: 8 }),
          b.createElement(T, { variant: "text", size: "medium", width: 60 }),
        ),
        b.createElement(
          xi,
          null,
          b.createElement(Pe, { size: 12, color: "gray" }),
        ),
        b.createElement(
          j1,
          null,
          b.createElement(T, { variant: "text", size: "medium", width: 76 }),
          b.createElement(g, { size: 8 }),
          b.createElement(T, { variant: "text", size: "medium", width: 60 }),
        ),
      ),
    );
  let {
    data: {
      from: { token: t, amount: r, blockchain: l, realAmount: a },
      to: { token: p, amount: c, blockchain: m, realAmount: C },
    },
    status: k,
    tooltipContainer: S,
  } = e;
  return b.createElement(
    dt,
    null,
    b.createElement(
      ut,
      null,
      b.createElement(
        "div",
        null,
        b.createElement(E, {
          tokenImage: t.image,
          chainImage: l.image,
          size: "large",
        }),
      ),
      b.createElement(
        "div",
        { style: { transform: "translateX(-10px)" } },
        b.createElement(E, {
          tokenImage: p.image,
          chainImage: m.image,
          size: "large",
        }),
      ),
    ),
    k === "running"
      ? b.createElement(
        mt,
        { direction: "column" },
        b.createElement(
          ki,
          null,
          b.createElement(
            d,
            { size: "medium", variant: "title" },
            t.displayName,
          ),
          b.createElement(
            ht,
            null,
            b.createElement(Pe, { size: 24, color: "black" }),
          ),
          b.createElement(
            d,
            { size: "medium", variant: "title" },
            p.displayName,
          ),
        ),
        b.createElement(
          d,
          { size: "small", variant: "body", color: "neutral700" },
          J6.t("Waiting for bridge transaction"),
        ),
      )
      : b.createElement(
        mt,
        { direction: "row" },
        b.createElement(
          j1,
          null,
          b.createElement(
            d,
            { size: "medium", variant: "title" },
            t.displayName,
          ),
          !!r &&
          b.createElement(
            P,
            { content: a, container: S },
            b.createElement(
              d,
              { size: "small", variant: "body", color: "neutral700" },
              r,
            ),
          ),
        ),
        b.createElement(
          ht,
          null,
          b.createElement(Pe, { size: 24, color: "black" }),
        ),
        b.createElement(
          j1,
          null,
          b.createElement(
            d,
            { size: "medium", variant: "title" },
            p.displayName,
          ),
          b.createElement(
            P,
            { content: C, container: S },
            b.createElement(
              d,
              { size: "small", variant: "body", color: "neutral700" },
              c,
            ),
          ),
        ),
      ),
  );
}
o(gt, "SwapToken");
function Q6(e) {
  if ("isLoading" in e)
    return G.createElement(
      wi,
      null,
      G.createElement(
        vi,
        null,
        G.createElement(
          ct,
          null,
          G.createElement(T, { variant: "text", size: "medium", width: 76 }),
          G.createElement(T, { variant: "text", size: "medium", width: 76 }),
        ),
        G.createElement(gt, { isLoading: !0 }),
      ),
    );
  let {
    onClick: t,
    requestId: r,
    creationTime: l,
    onlyShowTime: a,
    status: p,
    swapTokenData: c,
    tooltipContainer: m,
  } = e;
  return G.createElement(
    fi,
    { onClick: t.bind(null, r) },
    G.createElement(
      Ci,
      null,
      G.createElement(
        ct,
        null,
        G.createElement(
          yi,
          null,
          G.createElement(
            d,
            { variant: "label", size: "medium", color: "neutral600" },
            gi(l, a),
          ),
        ),
        G.createElement(
          d,
          { variant: "label", size: "medium", color: bi[p] },
          hi(p),
        ),
      ),
      G.createElement(gt, { data: c, status: p, tooltipContainer: m }),
    ),
  );
}
o(Q6, "SwapListItem");
import $i from "react";
import * as ko from "@radix-ui/react-switch";
var Li = n(ko.Root, {
  boxSizing: "border-box",
  boxShadow: "none",
  width: "24px",
  height: "16px",
  $$color: "$colors$neutral600",
  [`.${s} &`]: { $$color: "$colors$neutral700" },
  backgroundColor: "$$color",
  border: "none",
  borderRadius: "99999px",
  padding: "0",
  cursor: "pointer",
  transition: "all 0.35s",
  overflow: "hidden",
  '&[data-state="checked"]': {
    $$color: "$colors$secondary500",
    [`.${s} &`]: { $$color: "$colors$secondary400" },
    backgroundColor: "$$color",
    borderColor: "$$color",
  },
  "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
}),
  Ti = n(ko.Thumb, {
    boxSizing: "border-box",
    position: "relative",
    left: "$2",
    display: "block",
    width: "12px",
    height: "12px",
    backgroundColor: "$background",
    borderColor: "$secondary100",
    transition: " transform 300ms",
    borderRadius: "999999px",
    willChange: "transform",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.6) 0px 3px 8px",
      "-moz-box-shadow": "rgba(0, 0, 0, 0.6) 0px 3px 8px",
      "-webkit-box-shadow": "rgba(0, 0, 0, 0.6) 0px 3px 8px",
      "-o-box-shadow": "rgba(0, 0, 0, 0.6) 0px 3px 8px",
    },
    '&[data-state="checked"]': { transform: "translateX(8px)" },
  });
function el(e) {
  let { checked: t, onChange: r } = e;
  return $i.createElement(
    Li,
    { checked: t, onCheckedChange: r },
    $i.createElement(Ti, null),
  );
}
o(el, "Switch");
import se from "react";
var Ii = n("div", {
  borderRadius: "$xs",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  variants: {
    fullWidth: { true: { width: "100%" }, false: { width: "fit-content" } },
    size: {
      small: { padding: "$5 $15" },
      large: { padding: "$10", borderRadius: "$xl" },
    },
    variant: {
      contained: {
        $$color: "$colors$neutral100",
        [`.${s} &`]: { $$color: "$colors$neutral300" },
        backgroundColor: "$$color",
        "&:hover": {
          $$color: "$colors$secondary100",
          [`.${s} &`]: { $$color: "$colors$neutral100" },
          backgroundColor: "$$color",
        },
      },
      outlined: {
        backgroundColor: "transparent",
        border: "1px solid $neutral100",
        "&:hover": {
          $$color: "$colors$secondary100",
          [`.${s} &`]: { $$color: "$colors$neutral400" },
          borderColor: "$$color",
        },
      },
      ghost: { background: "transparent" },
    },
    disabled: { true: {}, false: {} },
  },
  compoundVariants: [
    {
      variant: "contained",
      disabled: !0,
      css: { "&:hover": { backgroundColor: "$neutral100" } },
    },
    {
      variant: "outlined",
      disabled: !0,
      css: { "&:hover": { borderColor: "$neutral100" } },
    },
  ],
}),
  Pi = n("input", {
    flexGrow: 1,
    color: "$foreground",
    fontSize: "$14",
    lineHeight: "$20",
    fontWeight: 400,
    border: "none",
    outline: "none",
    fontFamily: "inherit",
    maxWidth: "100%",
    variants: { suffix: { true: { marginRight: "$10" } } },
    backgroundColor: "transparent",
    "-webkit-appearance": "none",
    margin: 0,
    "&:disabled": { cursor: "not-allowed" },
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    '&[type="number"]': { "-moz-appearance": "textfield" },
    "&::placeholder, &::-webkit-input-placeholder": { color: "$neutral700" },
    "&:focus-visible": { outline: "none" },
  }),
  Di = n("label", { display: "inline-block" });
function ol(e, t) {
  let {
    label: r,
    prefix: l,
    suffix: a,
    size: p = "small",
    style: c,
    variant: m,
    fullWidth: C,
    labelProps: k,
    ...S
  } = e,
    D = o((h) => {
      S?.type === "number" && ["-", "+"].includes(h.key) && h.preventDefault();
    }, "handleKeyDown");
  return se.createElement(
    se.Fragment,
    null,
    r &&
    se.createElement(
      se.Fragment,
      null,
      se.createElement(
        Di,
        { className: "_text", ...(S.id && { htmlFor: S.id }) },
        se.createElement(d, { variant: "label", size: "large", ...k }, r),
      ),
      se.createElement(g, { direction: "vertical", size: 4 }),
    ),
    se.createElement(
      Ii,
      {
        disabled: S.disabled,
        fullWidth: C,
        variant: m,
        size: p,
        style: c,
        className: "_text-field",
      },
      l || null,
      se.createElement(Pi, {
        ...S,
        onKeyDown: D,
        spellCheck: !1,
        suffix: !!a,
        ref: t,
      }),
      a || null,
    ),
  );
}
o(ol, "TextFieldComponent");
var O1 = se.forwardRef(ol);
O1.displayName = "TextField";
O1.toString = () => "._text-field";
import re, { useEffect as qi, useState as ji } from "react";
function zi() {
  let e = 1;
  return () => (e++, e);
}
o(zi, "idGenerator");
var Mi = 500,
  xe = 300,
  Ai = 200,
  Ni = 200;
import Ze, {
  createContext as tl,
  useContext as nl,
  useMemo as rl,
  useState as c1,
} from "react";
import { createPortal as il } from "react-dom";
var Hi = z({
  transition: `transform ${Ai}ms ease-in-out`,
  "&:hover": { transform: "scale(0.99)" },
}),
  Vi = n("div", {
    transition: `transform ${xe}ms cubic-bezier(0, 0, 0.75, 1.25)`,
    cursor: "pointer",
    variants: {
      isActive: { true: {} },
      isVisible: { true: {} },
      position: {
        "right-top": {},
        "right-bottom": {},
        "left-top": {},
        "left-bottom": {},
        "center-top": {},
        "center-bottom": {},
      },
    },
    compoundVariants: [
      {
        position: "right-top",
        isActive: !0,
        isVisible: !0,
        css: { transform: "translateX(0)", maxHeight: "200px" },
      },
      {
        position: "right-top",
        isActive: !1,
        isVisible: !0,
        css: { maxHeight: "200px", transform: "translateX(100%)" },
      },
      {
        position: "right-top",
        isActive: !1,
        isVisible: !1,
        css: {
          maxHeight: "0px",
          transform: "translateX(100%)",
          transition: `max-height ${xe}ms ease-in-out`,
        },
      },
      {
        position: "right-bottom",
        isActive: !0,
        isVisible: !0,
        css: { transform: "translateX(0)", maxHeight: "200px" },
      },
      {
        position: "right-bottom",
        isActive: !1,
        isVisible: !0,
        css: { transform: "translateX(100%)", maxHeight: "200px" },
      },
      {
        position: "right-bottom",
        isActive: !1,
        isVisible: !1,
        css: {
          transform: "translateX(100%)",
          maxHeight: "0px",
          transition: `max-height ${xe}ms ease-in-out`,
        },
      },
      {
        position: "left-top",
        isActive: !0,
        isVisible: !0,
        css: { transform: "translateX(0)", maxHeight: "200px" },
      },
      {
        position: "left-top",
        isActive: !1,
        isVisible: !0,
        css: { transform: "translateX(-100%)", maxHeight: "200px" },
      },
      {
        position: "left-top",
        isActive: !1,
        isVisible: !1,
        css: {
          transform: "translateX(-100%)",
          maxHeight: "0px",
          transition: `max-height ${xe}ms ease-in-out`,
        },
      },
      {
        position: "left-bottom",
        isActive: !0,
        isVisible: !0,
        css: { transform: "translateX(0)", maxHeight: "200px" },
      },
      {
        position: "left-bottom",
        isActive: !1,
        isVisible: !0,
        css: { transform: "translateX(-100%)", maxHeight: "200px" },
      },
      {
        position: "left-bottom",
        isActive: !1,
        isVisible: !1,
        css: {
          transform: "translateX(-100%)",
          maxHeight: "0px",
          transition: `max-height ${xe}ms ease-in-out`,
        },
      },
      {
        position: "center-top",
        isActive: !0,
        isVisible: !0,
        css: { maxHeight: "200px", transform: "translateY(0)", opacity: 1 },
      },
      {
        position: "center-top",
        isActive: !1,
        isVisible: !0,
        css: {
          maxHeight: "200px",
          transform: "translateY(-1000%)",
          opacity: 0,
        },
      },
      {
        position: "center-top",
        isActive: !1,
        isVisible: !1,
        css: {
          maxHeight: "0px",
          opacity: 0,
          transform: "translateY(-1000%)",
          transition: `max-height ${xe}ms ease-in-out`,
        },
      },
      {
        position: "center-bottom",
        isActive: !0,
        isVisible: !0,
        css: { transform: "translateY(0)", maxHeight: "200px", opacity: 1 },
      },
      {
        position: "center-bottom",
        isActive: !1,
        isVisible: !0,
        css: { transform: "translateY(1000%)", maxHeight: "200px", opacity: 0 },
      },
      {
        position: "center-bottom",
        isActive: !1,
        isVisible: !1,
        css: {
          transform: "translateY(1000%)",
          maxHeight: "0px",
          opacity: 0,
          transition: `max-height ${xe}ms ease-in-out`,
        },
      },
    ],
  }),
  Ei = n("div", {
    overflow: "hidden",
    position: "absolute",
    zIndex: 9999,
    display: "flex",
    gap: "$4",
    flexDirection: "column",
    variants: {
      position: {
        "right-top": { right: 12, top: 2 },
        "right-bottom": {
          right: 12,
          bottom: 2,
          flexDirection: "column-reverse",
        },
        "left-top": { left: 12, top: 2 },
        "left-bottom": { left: 12, bottom: 2, flexDirection: "column-reverse" },
        "center-top": { left: "50%", transform: "translateX(-50%)", top: 2 },
        "center-bottom": {
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 2,
          flexDirection: "column-reverse",
        },
      },
    },
  }),
  Fi = n("div", {
    display: "flex",
    borderRadius: "$sm",
    width: "292px",
    minHeight: "52px",
    variants: {
      variant: {
        custom: {
          backgroundColor: "$background",
          borderRight: "1px solid",
          "&:hover": {
            backgroundColor: "$secondary100",
            [`.${s} &`]: { backgroundColor: "$neutral300" },
          },
        },
        standard: {
          "& ._alert": {
            padding: "$10",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      },
      type: { error: {}, success: {}, warning: {}, info: {}, loading: {} },
    },
    compoundVariants: [
      {
        variant: "custom",
        type: "error",
        css: { borderRightColor: "$error500" },
      },
      {
        variant: "custom",
        type: "success",
        css: { borderRightColor: "$success500" },
      },
      {
        variant: "custom",
        type: "warning",
        css: { borderRightColor: "$warning500" },
      },
      {
        variant: "custom",
        type: "info",
        css: { borderRightColor: "$info500" },
      },
      {
        variant: "custom",
        type: "loading",
        css: { borderRightColor: "$info500" },
      },
    ],
  }),
  Bi = n("div", { display: "flex", padding: "$10", alignItems: "center" }),
  Wi = n(d, {
    variants: {
      hasColor: {
        false: {
          [`.${Yt} &`]: { color: "$neutral700" },
          [`.${s} &`]: { color: "$neutral900" },
        },
      },
    },
  });
var Zi = tl(void 0),
  d1 = o(
    (e, t) =>
      Ze.createElement(
        Ze.Fragment,
        null,
        e.length > 0 &&
        Ze.createElement(
          Ei,
          { style: e[0].containerStyle, position: t },
          e.map((r) => Ze.createElement(ft, { ...r, key: r.id })),
        ),
      ),
    "renderToastContainer",
  ),
  al = o((e) => {
    let t = rl(() => zi(), []),
      { children: r, container: l } = e,
      [a, p] = c1([]),
      [c, m] = c1([]),
      [C, k] = c1([]),
      [S, D] = c1([]),
      [h, B] = c1([]),
      [X, f] = c1([]),
      M = o((N) => {
        switch (N) {
          case "right-top":
            return k;
          case "right-bottom":
            return D;
          case "left-top":
            return p;
          case "left-bottom":
            return m;
          case "center-top":
            return B;
          default:
            return f;
        }
      }, "getToastSetter"),
      ee = o((N) => {
        o(() => M(N.position), "addToasts")()((he) =>
          he.find((Do) => Do.id === N.id)
            ? (console.warn(
              "Trying to send a toast with an existing ID. Please update the toast ID or use it after the toast is hidden",
            ),
              he)
            : [...he, { ...N, id: N.id || t() }],
        );
      }, "handleAddToast"),
      T1 = o((N, Xe) => {
        o(() => M(Xe), "removeFromToasts")()(($t) =>
          $t.filter((Do) => Do.id !== N),
        );
      }, "handleRemoveToast"),
      Te = { addToast: (N) => ee(N), removeToast: (N, Xe) => T1(N, Xe) };
    return Ze.createElement(
      Zi.Provider,
      { value: Te },
      r,
      l &&
      il(
        Ze.createElement(
          Ze.Fragment,
          null,
          d1(C, "right-top"),
          d1(a, "left-top"),
          d1(h, "center-top"),
          d1(S, "right-bottom"),
          d1(c, "left-bottom"),
          d1(X, "center-bottom"),
        ),
        l,
      ),
    );
  }, "ToastProvider");
function Ct() {
  let e = nl(Zi);
  if (!e)
    throw new Error(
      "useToast can only be used within the ToastProvider component",
    );
  return e;
}
o(Ct, "useToast");
var ft = o((e) => {
  let {
    id: t,
    autoHideDuration: r,
    onClose: l,
    type: a,
    title: p,
    position: c,
    hasCloseIcon: m = !0,
    hideOnTap: C = !0,
    variant: k = "standard",
  } = e,
    [S, D] = ji(!1),
    [h, B] = ji(!1),
    { removeToast: X } = Ct();
  qi(() => {
    let M;
    if (r) {
      let ee = setTimeout(() => {
        f();
      }, r);
      M = o(() => clearTimeout(ee), "cleanup");
    }
    return M;
  }, [t]);
  let f = o(() => {
    D(!1),
      setTimeout(() => {
        B(!1);
      }, Ni),
      setTimeout(() => {
        X(t, c), l?.();
      }, Mi);
  }, "handleClose");
  return (
    qi(() => {
      B(!0),
        setTimeout(() => {
          D(!0);
        }, 0);
    }, []),
    re.createElement(
      Vi,
      { isActive: S, position: c, isVisible: h },
      re.createElement(
        "div",
        { className: Hi() },
        re.createElement(
          Fi,
          { onClick: C ? f : void 0, variant: k, type: a },
          k === "custom"
            ? re.createElement(
              Bi,
              null,
              re.createElement(
                lo,
                { type: a, align: "center" },
                re.createElement(so, { type: a }),
              ),
              re.createElement(g, { direction: "horizontal", size: 10 }),
              re.createElement(
                Wi,
                { variant: "body", size: "small", align: "left" },
                e.title,
              ),
            )
            : re.createElement(po, {
              title: p,
              type: a,
              variant: "alarm",
              titleAlign: "left",
              action: m
                ? re.createElement(
                  ce,
                  { variant: "ghost", size: "xsmall", onClick: f },
                  re.createElement(P1, { size: 12 }),
                )
                : void 0,
            }),
        ),
      ),
    )
  );
}, "Toast");
import { detectInstallLink as sl } from "@rango-dev/wallets-shared";
import K, { Fragment as ll } from "react";
import { i18n as ue } from "@lingui/core";
var Y1 = ((a) => (
  (a.NOT_INSTALLED = "not_installed"),
  (a.DISCONNECTED = "disconnected"),
  (a.CONNECTING = "connecting"),
  (a.CONNECTED = "connected"),
  a
))(Y1 || {});
function So(e) {
  switch (e) {
    case "connected":
      return {
        color: "success500",
        description: ue.t("Connected"),
        tooltipText: ue.t("Disconnect"),
      };
    case "not_installed":
      return {
        color: "info500",
        description: ue.t("Install"),
        tooltipText: ue.t("Install"),
      };
    case "connecting":
      return {
        color: "neutral600",
        description: ue.t("Connecting..."),
        tooltipText: ue.t("Connecting"),
      };
    case "disconnected":
      return {
        color: "neutral600",
        description: ue.t("Disconnected"),
        tooltipText: ue.t("Connect"),
      };
    default:
      throw new Error(ue.t("you need to pass a correct state to Wallet."));
  }
}
o(So, "makeInfo");
var xo = n("div", { "& img": { borderRadius: "50%" } }),
  Lo = n(d, { textTransform: "capitalize" }),
  To = n("div", { display: "flex", flexDirection: "column", marginTop: "$10" }),
  $o = n("button", {
    borderRadius: "$xm",
    padding: "$10",
    border: "0",
    display: "flex",
    flexDirection: "column",
    $$color: "$colors$neutral100",
    [`.${s} &`]: { $$color: "$colors$neutral300" },
    backgroundColor: "$$color",
    alignItems: "center",
    cursor: "pointer",
    width: 100,
    position: "relative",
    fontFamily: "inherit",
    "&:hover": {
      $$color: "$colors$secondary100",
      [`.${s} &`]: { $$color: "$colors$neutral100" },
      backgroundColor: "$$color",
    },
    "&:focus-visible": {
      $$color: "$colors$secondary100",
      [`.${s} &`]: { $$color: "$colors$info700" },
      backgroundColor: "$$color",
      outline: 0,
    },
    "&:disabled": { filter: "grayscale(1)", pointerEvents: "none" },
    variants: {
      selected: {
        true: {
          outlineWidth: 1,
          $$outline: "$colors$secondary500",
          [`.${s} &`]: { $$outline: "$colors$secondary400" },
          outlineColor: "$$outline",
          outlineStyle: "solid",
        },
      },
    },
  }),
  Oi = n("div", {
    borderRadius: "$xm",
    padding: "$10 0",
    border: "0",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "$neutral100",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  });
function pl(e) {
  let {
    title: t,
    type: r,
    image: l,
    onClick: a,
    isLoading: p,
    disabled: c = !1,
  } = e,
    m = So(e.state);
  return p
    ? K.createElement(
      Oi,
      null,
      K.createElement(T, { variant: "circular", width: 35, height: 35 }),
      K.createElement(g, { size: 12 }),
      K.createElement(T, { variant: "text", width: 85, size: "medium" }),
      K.createElement(g, { size: 4 }),
      K.createElement(T, { variant: "text", width: 64, size: "medium" }),
    )
    : K.createElement(
      c ? ll : P,
      { container: e.container, content: m.tooltipText, side: "top" },
      K.createElement(
        $o,
        {
          disabled: e.state == "connecting" || c,
          onClick: () => {
            e.state === "not_installed"
              ? window.open(sl(e.link), "_blank")
              : a(r);
          },
        },
        K.createElement(xo, null, K.createElement(W, { src: l, size: 35 })),
        K.createElement(
          To,
          null,
          K.createElement(
            Lo,
            { variant: "label", size: "medium", noWrap: !1 },
            t,
          ),
          K.createElement(
            d,
            { variant: "body", size: "xsmall", noWrap: !1, color: m.color },
            m.description,
          ),
        ),
      ),
    );
}
o(pl, "Wallet");
var yt = pl;
import { detectInstallLink as cl } from "@rango-dev/wallets-shared";
import u1 from "react";
function dl(e) {
  let {
    title: t,
    type: r,
    image: l,
    onClick: a,
    selected: p,
    description: c,
    state: m,
    disabled: C = !1,
  } = e,
    k = So(e.state);
  return u1.createElement(
    $o,
    {
      selected: p,
      disabled: e.state == "connecting" || C,
      onClick: () => {
        e.state === "not_installed" ? window.open(cl(e.link), "_blank") : a(r);
      },
    },
    u1.createElement(xo, null, u1.createElement(W, { src: l, size: 35 })),
    u1.createElement(
      To,
      null,
      u1.createElement(Lo, { variant: "label", size: "medium", noWrap: !1 }, t),
      u1.createElement(
        d,
        {
          variant: "body",
          size: "xsmall",
          noWrap: !1,
          color: m === "connected" ? "neutral700" : k.color,
        },
        c || k.description,
      ),
    ),
  );
}
o(dl, "SelectableWallet");
import { GroupedVirtuoso as ul, Virtuoso as ml } from "react-virtuoso";
import hl from "react";
import m1 from "react";
var Yi = n("li", {
  width: "100%",
  overflow: "hidden",
  borderRadius: "$xs",
  display: "flex",
  alignItems: "center",
  padding: "$10 $5",
  border: 0,
  backgroundColor: "transparent",
  ".item-start-container": {
    paddingRight: "$10",
    flexShrink: 0,
    "& svg": { display: "block" },
  },
  ".item-text-container": {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    textAlign: "left",
    "._description": {
      $$color: "$colors$neutral600",
      [`.${s} &`]: { $$color: "$colors$neutral700" },
      color: "$$color",
    },
    ".item-text-title": {
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      color: "$foreground",
    },
  },
  ".item-end-container": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "$10",
    overflow: "hidden",
    flexShrink: 0,
  },
  variants: {
    hasDivider: {
      true: {
        borderBottom: "1px solid",
        borderColor: "$neutral300",
        [`.${s} &`]: { borderColor: "$neutral400" },
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        "&:hover": { borderRadius: 0 },
      },
    },
  },
});
function U1(e) {
  let {
    start: t,
    title: r,
    description: l,
    end: a,
    onClick: p,
    hasDivider: c,
    ...m
  } = e;
  return m1.createElement(
    Yi,
    { hasDivider: c, onClick: p, ...m },
    t && m1.createElement("div", { className: "item-start-container" }, t),
    m1.createElement(
      "div",
      { className: "item-text-container" },
      r && m1.createElement("div", { className: "item-text-title" }, r),
      l &&
      m1.createElement(
        d,
        { variant: "body", className: "_description", size: "small" },
        l,
      ),
    ),
    a && m1.createElement("div", { className: "item-end-container" }, a),
  );
}
o(U1, "ListItem");
var Ui = n(U1, {
  transition: "all 0.35s",
  "&:hover": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$neutral100" },
    backgroundColor: "$$color",
    cursor: "pointer",
  },
  "&:active": { transform: "scale(0.99)" },
  "&:focus-visible": {
    borderRadius: "$xs",
    outline: 0,
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$info700" },
    backgroundColor: "$$color",
  },
  variants: {
    selected: {
      true: { outline: "1px solid $secondary500" },
      false: { outline: 0 },
    },
  },
});
function gl(e) {
  let { onClick: t, id: r, selected: l, ...a } = e,
    p = o(() => {
      t && t(r);
    }, "onClickWithKey");
  return hl.createElement(Ui, {
    onClick: p,
    "aria-label": "button",
    selected: l,
    onKeyUp: (c) => {
      c.key === "Enter" && p();
    },
    tabIndex: 0,
    ...a,
  });
}
o(gl, "ListItemButton");
import wt from "react";
var _i = n("ul", { padding: 0, margin: 0, listStyle: "none" });
function Cl(e) {
  return wt.createElement(
    _i,
    { as: e.as },
    e.items.map((t) => {
      let { id: r, type: l, ...a } = t,
        p = l || e.type;
      return p
        ? wt.cloneElement(p, { ...a, key: r, id: r })
        : wt.createElement(U1, { key: r, ...a });
    }),
  );
}
o(Cl, "List");
import _1 from "react";
var Ri = n("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});
function fl(e) {
  return _1.createElement(
    Ri,
    null,
    _1.createElement(jo, { color: "secondary", size: 26 }),
    _1.createElement(g, { size: 4 }),
    _1.createElement(d, { variant: "title", size: "medium" }, e.title),
    _1.createElement(
      d,
      { variant: "body", size: "medium", color: "neutral700" },
      e.description,
    ),
  );
}
o(fl, "NotFound");
import q from "react";
var Gi = n("div", {
  display: "flex",
  justifyContent: "space-between",
  variants: {
    direction: {
      vertical: { flexDirection: "column", alignItems: "start" },
      horizontal: { flexDirection: "row", width: "100%", alignItems: "end" },
    },
    centerAlign: { true: { alignItems: "center", justifyContent: "center" } },
  },
}),
  Ki = z({ display: "flex", justifyContent: "center", alignItems: "center" }),
  Xi = z({ display: "flex", paddingTop: "$5" });
function yl(e) {
  return q.createElement(
    Gi,
    { direction: e.direction, centerAlign: e.centerAlign },
    q.createElement(
      "div",
      { className: Ki() },
      q.createElement(E, {
        chainImage: e.chain.image,
        tokenImage: e.token.image,
        size: "medium",
      }),
      q.createElement(g, { direction: "horizontal", size: 4 }),
      q.createElement(
        "div",
        null,
        e.label &&
        q.createElement(
          d,
          { size: "xsmall", variant: "body", color: "$neutral700" },
          e.label,
        ),
        q.createElement(
          "div",
          null,
          q.createElement(
            P,
            {
              content: e.price.realValue,
              open: e.price.realValue ? void 0 : !1,
              container: e.tooltipContainer,
            },
            q.createElement(
              d,
              { size: "medium", variant: "title", style: { fontWeight: 600 } },
              e.price.value,
            ),
            q.createElement(g, { direction: "horizontal", size: 8 }),
            q.createElement(
              d,
              { size: "medium", variant: "title", style: { fontWeight: 400 } },
              e.token.displayName,
            ),
          ),
        ),
      ),
    ),
    e.price.usdValue &&
    e.price.usdValue !== "0" &&
    q.createElement(
      "div",
      { className: Xi() },
      q.createElement(
        P,
        { content: e.price.realUsdValue, container: e.tooltipContainer },
        e.type === "input" &&
        q.createElement(
          q.Fragment,
          null,
          q.createElement(
            d,
            { size: "small", variant: "body", color: "$neutral700" },
            `~$${e.price.usdValue}`,
          ),
          q.createElement(g, { direction: "horizontal", size: 4 }),
        ),
      ),
      e.type === "output" &&
      q.createElement(We, {
        size: "small",
        tooltipProps: { container: e.tooltipContainer, side: "top" },
        outputUsdValue: e.price.usdValue,
        percentageChange: e.percentageChange,
        warningLevel: e.warningLevel,
        realOutputUsdValue: e.price.realUsdValue,
      }),
    ),
  );
}
o(yl, "TokenAmount");
import { i18n as kt } from "@lingui/core";
import $, {
  forwardRef as wl,
  Fragment as vl,
  memo as bl,
  useEffect as kl,
  useRef as Sl,
} from "react";
import { css as R1 } from "@stitches/react";
var Ji = n("div", {
  width: "100%",
  position: "relative",
  padding: "0 0.5rem",
  boxSizing: "border-box",
  border: "1px solid transparent",
  variants: {
    type: {
      "quote-details": { border: "none" },
      "swap-progress": {
        backgroundColor: "$neutral100",
        $$color: "$colors$neutral100",
        [`.${s} &`]: { $$color: "$colors$neutral300" },
        borderRadius: "$xm",
        padding: "$10 $15",
        marginBottom: "15px",
      },
    },
    state: {
      default: { borderColor: "transparent" },
      "in-progress": { borderColor: "$info500" },
      completed: { borderColor: "$success500" },
      warning: { borderColor: "$warning500" },
      error: { borderColor: "$error500" },
    },
  },
}),
  vt = n("div", {
    borderRadius: "100%",
    width: "24px",
    height: "24px",
    overflow: "hidden",
    border: "1.5px solid transparent",
    variants: {
      state: {
        default: { borderColor: "transparent" },
        "in-progress": { borderColor: "$info500" },
        completed: { borderColor: "$success500" },
        warning: { borderColor: "$warning500" },
        error: { borderColor: "$error500" },
      },
    },
  }),
  Qi = n("div", {
    width: "100%",
    variants: { pb: { true: { paddingBottom: "35px" } } },
  }),
  ea = n("div", {
    borderLeft: "1px dashed $foreground",
    minHeight: "64px",
    margin: "0 11.5px",
    alignSelf: "stretch",
    variants: {
      invisible: { true: { visibility: "hidden", minHeight: "unset" } },
    },
  }),
  oa = n("div", {
    borderLeft: "1px solid transparent",
    margin: "0 $12",
    display: "block",
    height: "8px",
    variants: {
      state: {
        default: { borderColor: "transparent" },
        "in-progress": { borderColor: "$info500" },
        completed: { borderColor: "$success500" },
        warning: { borderColor: "$warning500" },
        error: { borderColor: "$error500" },
      },
    },
  }),
  ta = n("div", {
    borderLeft: "1px dashed transparent",
    margin: "0 $10",
    alignSelf: "stretch",
    display: "block",
    height: "15px",
    position: "absolute",
    top: "-16px",
    left: "16px",
    variants: {
      state: {
        default: { borderColor: "transparent" },
        "in-progress": { borderColor: "$info500" },
        completed: { borderColor: "$success500" },
        warning: { borderColor: "$warning500" },
        error: { borderColor: "$error500" },
      },
    },
  }),
  na = R1({ width: "100%", overflow: "hidden" }),
  ra = R1({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
  bt = R1({ display: "flex", alignItems: "center" }),
  ia = R1({
    display: "flex",
    flex: "1",
    width: "100%",
    alignItems: "start",
    variants: { tx: { true: { paddingLeft: "36px" } } },
  }),
  aa = R1({
    display: "flex",
    paddingTop: "$5",
    paddingBottom: "$10",
    alignItems: "center",
  });
var sa = wl((e, t) => {
  let {
    step: r,
    hasSeparator: l,
    type: a,
    state: p,
    isFocused: c,
    tabIndex: m,
    tooltipContainer: C,
  } = e,
    { from: k, to: S, swapper: D } = r,
    h = Sl(null),
    B = p === "completed" || p === "error",
    X = r.internalSwaps?.length
      ? r.internalSwaps
      : [{ from: k, to: S, swapper: D }];
  return (
    kl(() => {
      let f = t?.current,
        M = h.current;
      c && M && f && (f.scrollTop = M.offsetTop - f.offsetTop);
    }, [c]),
    $.createElement(
      Ji,
      { type: a, state: p, ref: h, tabIndex: m },
      a === "quote-details" &&
      $.createElement(
        "div",
        { className: bt() },
        $.createElement(
          vt,
          { state: p },
          $.createElement(W, { size: 22, src: r.swapper.image }),
        ),
        $.createElement(g, { direction: "horizontal", size: 8 }),
        $.createElement(
          d,
          { size: "medium", variant: "label" },
          `Swap on ${r.from.chain.displayName} via ${r.swapper.displayName}`,
        ),
      ),
      a === "swap-progress" &&
      $.createElement(
        "div",
        { className: ra() },
        l && $.createElement(ta, { state: p }),
        X.map((f, M) => {
          let ee = `${f.swapper.displayName}-${M}`;
          return $.createElement(
            vl,
            { key: ee },
            $.createElement(
              "div",
              { id: f.swapper.displayName, className: bt() },
              $.createElement(
                vt,
                { state: p },
                $.createElement(W, { size: 22, src: f.swapper.image }),
              ),
              $.createElement(g, { direction: "horizontal", size: 8 }),
              $.createElement(
                d,
                { size: "medium", variant: "label" },
                f?.swapper.type === "DEX"
                  ? `Swap on ${f.from.chain.displayName} via ${f.swapper.displayName}`
                  : `Bridge to ${f.to.chain.displayName} via ${f.swapper.displayName}`,
              ),
            ),
            M !== X.length - 1 && $.createElement(oa, { state: p }),
          );
        }),
      ),
      $.createElement(
        "div",
        { className: ia() },
        $.createElement(ea, { invisible: !l || a === "swap-progress" }),
        $.createElement(
          "div",
          { className: na() },
          $.createElement(
            "div",
            { className: aa() },
            $.createElement(E, {
              chainImage: r.from.chain.image,
              tokenImage: r.from.token.image,
              size: "small",
            }),
            $.createElement(
              P,
              { content: r.from.price.realValue, container: C },
              $.createElement(g, { direction: "horizontal", size: 4 }),
              $.createElement(
                d,
                { size: "small", color: "$neutral700", variant: "body" },
                `${r.from.price.value} ${r.from.token.displayName}`,
              ),
            ),
            $.createElement(g, { direction: "horizontal", size: 4 }),
            $.createElement(Pe, { color: "gray" }),
            $.createElement(g, { size: 4, direction: "horizontal" }),
            $.createElement(E, {
              chainImage: r.to.chain.image,
              tokenImage: r.to.token.image,
              size: "small",
            }),
            $.createElement(
              P,
              { content: r.to.price.realValue, container: C },
              $.createElement(g, { direction: "horizontal", size: 4 }),
              $.createElement(
                d,
                { size: "small", color: "$neutral700", variant: "body" },
                `${B ? "" : "~"}${r.to.price.value} ${r.to.token.displayName}`,
              ),
            ),
          ),
          $.createElement(Qi, { pb: l && a === "quote-details" }, r.alerts),
        ),
      ),
    )
  );
});
sa.displayName = "StepDetailsComponent";
var xl = bl(sa);
import * as h1 from "@radix-ui/react-popover";
import qe from "react";
import * as Io from "@radix-ui/react-popover";
var la = n(Io.Content, {
  borderRadius: "$sm",
  filter: "drop-shadow(0px 5px 20px rgba(130, 130, 130, 0.20))",
  backgroundColor: "$neutral100",
  [`.${s} &`]: { backgroundColor: "$neutral300" },
}),
  pa = n(Io.Arrow, {
    fill: "$neutral100",
    [`.${s} &`]: { fill: "$neutral300" },
    width: "$16",
    height: "$8",
  });
var Ll = 0,
  Tl = 0,
  $l = o((e, t) => {
    let { container: r, children: l, styles: a, hasArrow: p = !0, ...c } = e;
    return qe.createElement(
      h1.Portal,
      { container: r },
      qe.createElement(
        la,
        { ...c, ref: t },
        l,
        p && qe.createElement(pa, { css: a?.arrowStyles }),
      ),
    );
  }, "PopoverContentComponent"),
  ca = qe.forwardRef($l);
ca.displayName = "PopoverContent";
function Il(e) {
  let {
    children: t,
    content: r,
    side: l = "bottom",
    sideOffset: a = Ll,
    alignOffset: p = Tl,
    align: c = "center",
    collisionBoundary: m = [],
    collisionPadding: C = 0,
    container: k = document.body,
    onOpenChange: S,
    ...D
  } = e;
  return qe.createElement(
    h1.Root,
    { onOpenChange: S },
    qe.createElement(h1.Trigger, { asChild: !0 }, t),
    qe.createElement(
      ca,
      {
        align: c,
        alignOffset: p,
        collisionBoundary: m,
        collisionPadding: C,
        side: l,
        sideOffset: a,
        container: k,
        ...D,
      },
      r,
    ),
  );
}
o(Il, "Popover");
import g1 from "react";
var w = "1em";
function da(e) {
  let { size: t = w } = e;
  return g1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    g1.createElement(
      "mask",
      { id: "a" },
      g1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    g1.createElement(
      "g",
      { mask: "url(#a)" },
      g1.createElement("path", { fill: "#496e2d", d: "M0 0h512v512H0z" }),
      g1.createElement("circle", {
        cx: 200.3,
        cy: 256,
        r: 111.3,
        fill: "#d80027",
      }),
    ),
  );
}
o(da, "Bengali");
import C1 from "react";
function ua(e) {
  let { size: t = w } = e;
  return C1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    C1.createElement(
      "mask",
      { id: "a" },
      C1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    C1.createElement(
      "g",
      { mask: "url(#a)" },
      C1.createElement("path", { fill: "#d80027", d: "M0 0h512v512H0z" }),
      C1.createElement("path", {
        fill: "#ffda44",
        d: "m140.1 155.8 22.1 68h71.5l-57.8 42.1 22.1 68-57.9-42-57.9 42 22.2-68-57.9-42.1H118zm163.4 240.7-16.9-20.8-25 9.7 14.5-22.5-16.9-20.9 25.9 6.9 14.6-22.5 1.4 26.8 26 6.9-25.1 9.6zm33.6-61 8-25.6-21.9-15.5 26.8-.4 7.9-25.6 8.7 25.4 26.8-.3-21.5 16 8.6 25.4-21.9-15.5zm45.3-147.6L370.6 212l19.2 18.7-26.5-3.8-11.8 24-4.6-26.4-26.6-3.8 23.8-12.5-4.6-26.5 19.2 18.7zm-78.2-73-2 26.7 24.9 10.1-26.1 6.4-1.9 26.8-14.1-22.8-26.1 6.4 17.3-20.5-14.2-22.7 24.9 10.1z",
      }),
    ),
  );
}
o(ua, "Chinese");
import je from "react";
function ma(e) {
  let { size: t = w } = e;
  return je.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    je.createElement(
      "mask",
      { id: "a" },
      je.createElement("circle", {
        cx: "256",
        cy: "256",
        r: "256",
        fill: "#fff",
      }),
    ),
    je.createElement(
      "g",
      { mask: "url(#a)" },
      je.createElement("path", {
        fill: "#eee",
        d: "m0 0 8 22-8 23v23l32 54-32 54v32l32 48-32 48v32l32 54-32 54v68l22-8 23 8h23l54-32 54 32h32l48-32 48 32h32l54-32 54 32h68l-8-22 8-23v-23l-32-54 32-54v-32l-32-48 32-48v-32l-32-54 32-54V0l-22 8-23-8h-23l-54 32-54-32h-32l-48 32-48-32h-32l-54 32L68 0H0z",
      }),
      je.createElement("path", {
        fill: "#0052b4",
        d: "M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z",
      }),
      je.createElement("path", {
        fill: "#d80027",
        d: "M0 0v45l131 131h45L0 0zm208 0v208H0v96h208v208h96V304h208v-96H304V0h-96zm259 0L336 131v45L512 0h-45zM176 336 0 512h45l131-131v-45zm160 0 176 176v-45L381 336h-45z",
      }),
    ),
  );
}
o(ma, "English");
import f1 from "react";
function ha(e) {
  let { size: t = w } = e;
  return f1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    f1.createElement(
      "mask",
      { id: "a" },
      f1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    f1.createElement(
      "g",
      { mask: "url(#a)" },
      f1.createElement("path", {
        fill: "#eee",
        d: "M0 0h133.6l35.3 16.7L200.3 0H512v222.6l-22.6 31.7 22.6 35.1V512H200.3l-32-19.8-34.7 19.8H0V289.4l22.1-33.3L0 222.6z",
      }),
      f1.createElement("path", {
        fill: "#0052b4",
        d: "M133.6 0v222.6H0v66.8h133.6V512h66.7V289.4H512v-66.8H200.3V0h-66.7z",
      }),
    ),
  );
}
o(ha, "Finland");
import Oe from "react";
function ga(e) {
  let { size: t = w } = e;
  return Oe.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    Oe.createElement(
      "mask",
      { id: "a" },
      Oe.createElement("circle", {
        cx: "256",
        cy: "256",
        r: "256",
        fill: "#fff",
      }),
    ),
    Oe.createElement(
      "g",
      { mask: "url(#a)" },
      Oe.createElement("path", {
        fill: "#eee",
        d: "M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z",
      }),
      Oe.createElement("path", { fill: "#0052b4", d: "M0 0h167v512H0z" }),
      Oe.createElement("path", { fill: "#d80027", d: "M345 0h167v512H345z" }),
    ),
  );
}
o(ga, "French");
import Ye from "react";
function Ca(e) {
  let { size: t = w } = e;
  return Ye.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    Ye.createElement(
      "mask",
      { id: "a" },
      Ye.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    Ye.createElement(
      "g",
      { mask: "url(#a)" },
      Ye.createElement("path", {
        fill: "#ffda44",
        d: "m0 345 256.7-25.5L512 345v167H0z",
      }),
      Ye.createElement("path", {
        fill: "#d80027",
        d: "m0 167 255-23 257 23v178H0z",
      }),
      Ye.createElement("path", { fill: "#333", d: "M0 0h512v167H0z" }),
    ),
  );
}
o(Ca, "German");
import y1 from "react";
function fa(e) {
  let { size: t = w } = e;
  return y1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    y1.createElement(
      "mask",
      { id: "a" },
      y1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    y1.createElement(
      "g",
      { mask: "url(#a)" },
      y1.createElement("path", {
        fill: "#0052b4",
        d: "M0 0h99l29 32 28-32h356v57l-32 28 32 29v57l-32 28 32 29v57l-32 28 32 28v57l-32 29 32 28v57H0v-57l32-28-32-29v-56l32-29-32-28V171l32-29-32-28Z",
      }),
      y1.createElement("path", {
        fill: "#eee",
        d: "M99 0v114H0v57h99v114H0v57h512v-57H156V171h100v-57H156V0Zm157 57v57h256V57Zm0 114v57h256v-57ZM0 398v57h512v-57z",
      }),
    ),
  );
}
o(fa, "Greece");
import le from "react";
function ya(e) {
  let { size: t = w } = e;
  return le.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    le.createElement(
      "mask",
      { id: "a" },
      le.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    le.createElement(
      "g",
      { mask: "url(#a)" },
      le.createElement("path", {
        fill: "#eee",
        d: "m0 160 256-32 256 32v192l-256 32L0 352z",
      }),
      le.createElement("path", { fill: "#ff9811", d: "M0 0h512v160H0Z" }),
      le.createElement("path", { fill: "#6da544", d: "M0 352h512v160H0Z" }),
      le.createElement("circle", { cx: 256, cy: 256, r: 72, fill: "#0052b4" }),
      le.createElement("circle", { cx: 256, cy: 256, r: 48, fill: "#eee" }),
      le.createElement("circle", { cx: 256, cy: 256, r: 24, fill: "#0052b4" }),
    ),
  );
}
o(ya, "Hindi");
import w1 from "react";
function wa(e) {
  let { size: t = w } = e;
  return w1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    w1.createElement(
      "mask",
      { id: "a" },
      w1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    w1.createElement(
      "g",
      { mask: "url(#a)" },
      w1.createElement("path", {
        fill: "#eee",
        d: "m0 256 249.6-41.3L512 256v256H0z",
      }),
      w1.createElement("path", { fill: "#a2001d", d: "M0 0h512v256H0z" }),
    ),
  );
}
o(wa, "Indonesian");
import Ue from "react";
function va(e) {
  let { size: t = w } = e;
  return Ue.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    Ue.createElement(
      "mask",
      { id: "a" },
      Ue.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    Ue.createElement(
      "g",
      { mask: "url(#a)" },
      Ue.createElement("path", {
        fill: "#eee",
        d: "M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z",
      }),
      Ue.createElement("path", { fill: "#6da544", d: "M0 0h167v512H0z" }),
      Ue.createElement("path", { fill: "#d80027", d: "M345 0h167v512H345z" }),
    ),
  );
}
o(va, "Italian");
import v1 from "react";
function ba(e) {
  let { size: t = w } = e;
  return v1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    v1.createElement(
      "mask",
      { id: "a" },
      v1.createElement("circle", {
        cx: "256",
        cy: "256",
        r: "256",
        fill: "#fff",
      }),
    ),
    v1.createElement(
      "g",
      { mask: "url(#a)" },
      v1.createElement("path", { fill: "#eee", d: "M0 0h512v512H0z" }),
      v1.createElement("circle", {
        cx: "256",
        cy: "256",
        r: "111.3",
        fill: "#d80027",
      }),
    ),
  );
}
o(ba, "Japanese");
import _e from "react";
function ka(e) {
  let { size: t = w } = e;
  return _e.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    _e.createElement(
      "mask",
      { id: "a" },
      _e.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    _e.createElement(
      "g",
      { mask: "url(#a)" },
      _e.createElement("path", {
        fill: "#ffda44",
        d: "m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z",
      }),
      _e.createElement("path", { fill: "#d80027", d: "M0 0h512v167H0z" }),
      _e.createElement("path", { fill: "#338af3", d: "M0 345h512v167H0z" }),
    ),
  );
}
o(ka, "Malay");
import Re from "react";
function Sa(e) {
  let { size: t = w } = e;
  return Re.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    Re.createElement(
      "mask",
      { id: "a" },
      Re.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    Re.createElement(
      "g",
      { mask: "url(#a)" },
      Re.createElement("path", {
        fill: "#eee",
        d: "m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z",
      }),
      Re.createElement("path", { fill: "#a2001d", d: "M0 0h512v167H0z" }),
      Re.createElement("path", { fill: "#0052b4", d: "M0 345h512v167H0z" }),
    ),
  );
}
o(Sa, "Netherlands");
import b1 from "react";
function xa(e) {
  let { size: t = w } = e;
  return b1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    b1.createElement(
      "mask",
      { id: "a" },
      b1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    b1.createElement(
      "g",
      { mask: "url(#a)" },
      b1.createElement("path", {
        fill: "#d80027",
        d: "m0 256 256.4-44.3L512 256v256H0z",
      }),
      b1.createElement("path", { fill: "#eee", d: "M0 0h512v256H0z" }),
    ),
  );
}
o(xa, "Poland");
import me from "react";
function La(e) {
  let { size: t = w } = e;
  return me.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    me.createElement(
      "mask",
      { id: "a" },
      me.createElement("circle", {
        cx: "256",
        cy: "256",
        r: "256",
        fill: "#fff",
      }),
    ),
    me.createElement(
      "g",
      { mask: "url(#a)" },
      me.createElement("path", {
        fill: "#6da544",
        d: "M0 512h167l37.9-260.3L167 0H0z",
      }),
      me.createElement("path", { fill: "#d80027", d: "M512 0H167v512h345z" }),
      me.createElement("circle", {
        cx: "167",
        cy: "256",
        r: "89",
        fill: "#ffda44",
      }),
      me.createElement("path", {
        fill: "#d80027",
        d: "M116.9 211.5V267a50 50 0 1 0 100.1 0v-55.6H117z",
      }),
      me.createElement("path", {
        fill: "#eee",
        d: "M167 283.8c-9.2 0-16.7-7.5-16.7-16.7V245h33.4v22c0 9.2-7.5 16.7-16.7 16.7z",
      }),
    ),
  );
}
o(La, "Portuguese");
import Ge from "react";
function Ta(e) {
  let { size: t = w } = e;
  return Ge.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    Ge.createElement(
      "mask",
      { id: "a" },
      Ge.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    Ge.createElement(
      "g",
      { mask: "url(#a)" },
      Ge.createElement("path", {
        fill: "#0052b4",
        d: "M512 170v172l-256 32L0 342V170l256-32z",
      }),
      Ge.createElement("path", { fill: "#eee", d: "M512 0v170H0V0Z" }),
      Ge.createElement("path", { fill: "#d80027", d: "M512 342v170H0V342Z" }),
    ),
  );
}
o(Ta, "Russian");
import x from "react";
function $a(e) {
  let { size: t = w } = e;
  return x.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    x.createElement(
      "mask",
      { id: "a" },
      x.createElement("circle", {
        cx: "256",
        cy: "256",
        r: "256",
        fill: "#fff",
      }),
    ),
    x.createElement(
      "g",
      { mask: "url(#a)" },
      x.createElement("path", {
        fill: "#ffda44",
        d: "m0 128 256-32 256 32v256l-256 32L0 384Z",
      }),
      x.createElement("path", {
        fill: "#d80027",
        d: "M0 0h512v128H0zm0 384h512v128H0z",
      }),
      x.createElement(
        "g",
        { fill: "#eee" },
        x.createElement("path", {
          d: "M144 304h-16v-80h16zm128 0h16v-80h-16z",
        }),
        x.createElement("ellipse", {
          cx: "208",
          cy: "296",
          rx: "48",
          ry: "32",
        }),
      ),
      x.createElement(
        "g",
        { fill: "#d80027" },
        x.createElement("rect", {
          width: "16",
          height: "24",
          x: "128",
          y: "192",
          rx: "8",
        }),
        x.createElement("rect", {
          width: "16",
          height: "24",
          x: "272",
          y: "192",
          rx: "8",
        }),
        x.createElement("path", {
          d: "M208 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z",
        }),
      ),
      x.createElement("rect", {
        width: "32",
        height: "16",
        x: "120",
        y: "208",
        fill: "#ff9811",
        ry: "8",
      }),
      x.createElement("rect", {
        width: "32",
        height: "16",
        x: "264",
        y: "208",
        fill: "#ff9811",
        ry: "8",
      }),
      x.createElement("rect", {
        width: "32",
        height: "16",
        x: "120",
        y: "304",
        fill: "#ff9811",
        rx: "8",
      }),
      x.createElement("rect", {
        width: "32",
        height: "16",
        x: "264",
        y: "304",
        fill: "#ff9811",
        rx: "8",
      }),
      x.createElement("path", {
        fill: "#ff9811",
        d: "M160 272v24c0 8 4 14 9 19l5-6 5 10a21 21 0 0 0 10 0l5-10 5 6c6-5 9-11 9-19v-24h-9l-5 8-5-8h-10l-5 8-5-8z",
      }),
      x.createElement("path", { d: "M122 252h172m-172 24h28m116 0h28" }),
      x.createElement("path", {
        fill: "#d80027",
        d: "M122 248a4 4 0 0 0-4 4 4 4 0 0 0 4 4h172a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm0 24a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4z",
      }),
      x.createElement("path", {
        fill: "#eee",
        d: "M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4 16 16 0 0 0 17 4 16 16 0 1 0 10-20 16 16 0 0 0-27-5c-3-4-7-6-12-6zm0 8c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm24 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm-44 10 4 1 4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8zm64 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-7l4-8z",
      }),
      x.createElement("path", {
        fill: "none",
        d: "M220 284v12c0 7 5 12 12 12s12-5 12-12v-12z",
      }),
      x.createElement("path", { fill: "#ff9811", d: "M200 160h16v32h-16z" }),
      x.createElement("path", { fill: "#eee", d: "M208 224h48v48h-48z" }),
      x.createElement("path", {
        fill: "#d80027",
        d: "m248 208-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24zm-88 16h48v48h-48z",
      }),
      x.createElement("rect", {
        width: "20",
        height: "32",
        x: "222",
        y: "232",
        fill: "#d80027",
        rx: "10",
        ry: "10",
      }),
      x.createElement("path", {
        fill: "#ff9811",
        d: "M168 232v8h8v16h-8v8h32v-8h-8v-16h8v-8zm8-16h64v8h-64z",
      }),
      x.createElement(
        "g",
        { fill: "#ffda44" },
        x.createElement("circle", { cx: "186", cy: "202", r: "6" }),
        x.createElement("circle", { cx: "208", cy: "202", r: "6" }),
        x.createElement("circle", { cx: "230", cy: "202", r: "6" }),
      ),
      x.createElement("path", {
        fill: "#d80027",
        d: "M169 272v43a24 24 0 0 0 10 4v-47h-10zm20 0v47a24 24 0 0 0 10-4v-43h-10z",
      }),
      x.createElement(
        "g",
        { fill: "#338af3" },
        x.createElement("circle", { cx: "208", cy: "272", r: "16" }),
        x.createElement("rect", {
          width: "32",
          height: "16",
          x: "264",
          y: "320",
          ry: "8",
        }),
        x.createElement("rect", {
          width: "32",
          height: "16",
          x: "120",
          y: "320",
          ry: "8",
        }),
      ),
    ),
  );
}
o($a, "Spanish");
import k1 from "react";
function Ia(e) {
  let { size: t = w } = e;
  return k1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    k1.createElement(
      "mask",
      { id: "a" },
      k1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    k1.createElement(
      "g",
      { mask: "url(#a)" },
      k1.createElement("path", {
        fill: "#0052b4",
        d: "M0 0h133.6l35.3 16.7L200.3 0H512v222.6l-22.6 31.7 22.6 35.1V512H200.3l-32-19.8-34.7 19.8H0V289.4l22.1-33.3L0 222.6z",
      }),
      k1.createElement("path", {
        fill: "#ffda44",
        d: "M133.6 0v222.6H0v66.8h133.6V512h66.7V289.4H512v-66.8H200.3V0z",
      }),
    ),
  );
}
o(Ia, "Swedish");
import Ke from "react";
function Pa(e) {
  let { size: t = w } = e;
  return Ke.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    Ke.createElement(
      "mask",
      { id: "a" },
      Ke.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    Ke.createElement(
      "g",
      { mask: "url(#a)" },
      Ke.createElement("path", {
        fill: "#d80027",
        d: "M0 0h512v89l-79.2 163.7L512 423v89H0v-89l82.7-169.6L0 89z",
      }),
      Ke.createElement("path", {
        fill: "#eee",
        d: "M0 89h512v78l-42.6 91.2L512 345v78H0v-78l40-92.5L0 167z",
      }),
      Ke.createElement("path", { fill: "#0052b4", d: "M0 167h512v178H0z" }),
    ),
  );
}
o(Pa, "Thai");
import Le from "react";
function Da(e) {
  let { size: t = w } = e;
  return Le.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    Le.createElement(
      "mask",
      { id: "a" },
      Le.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    Le.createElement(
      "g",
      { mask: "url(#a)" },
      Le.createElement("path", { fill: "#d80027", d: "M0 0h512v512H0z" }),
      Le.createElement(
        "g",
        { fill: "#eee" },
        Le.createElement("path", {
          d: "m245.5 209.2 21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11z",
        }),
        Le.createElement("path", {
          d: "M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z",
        }),
      ),
    ),
  );
}
o(Da, "Turkish");
import S1 from "react";
function za(e) {
  let { size: t = w } = e;
  return S1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    S1.createElement(
      "mask",
      { id: "a" },
      S1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    S1.createElement(
      "g",
      { mask: "url(#a)" },
      S1.createElement("path", {
        fill: "#ffda44",
        d: "m0 256 258-39.4L512 256v256H0z",
      }),
      S1.createElement("path", { fill: "#338af3", d: "M0 0h512v256H0z" }),
    ),
  );
}
o(za, "Ukrainian");
import x1 from "react";
function Ma(e) {
  let { size: t = w } = e;
  return x1.createElement(
    "svg",
    {
      width: t,
      height: t,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
    },
    x1.createElement(
      "mask",
      { id: "a" },
      x1.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#fff" }),
    ),
    x1.createElement(
      "g",
      { mask: "url(#a)" },
      x1.createElement("path", { fill: "#d80027", d: "M0 0h512v512H0z" }),
      x1.createElement("path", {
        fill: "#ffda44",
        d: "m256 133.6 27.6 85H373L300.7 271l27.6 85-72.3-52.5-72.3 52.6 27.6-85-72.3-52.6h89.4z",
      }),
    ),
  );
}
o(Ma, "Vietnamese");
import * as j from "@radix-ui/react-select";
import F, { useEffect as Dl, useRef as zl, useState as Ml } from "react";
import * as L1 from "@radix-ui/react-select";
var Pl = 300,
  Aa = n(L1.Trigger, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    outline: 0,
    whiteSpace: "nowrap",
    width: "100%",
    "& svg": { transition: `all ${Pl}ms ease` },
    "& ._typography": { whiteSpace: "nowrap" },
    variants: {
      open: {
        true: { "& svg": { transform: "rotate(180deg)" } },
        false: { "& svg": { transform: "rotate(0)" } },
      },
      variant: {
        filled: {
          border: 0,
          borderRadius: "$sm",
          padding: "$5 $10",
          backgroundColor: "$neutral300",
          [`.${s} &`]: { backgroundColor: "$neutral400" },
          "&:hover": {
            backgroundColor: "$secondary100",
            [`.${s} &`]: { backgroundColor: "$neutral" },
          },
        },
        outlined: {
          backgroundColor: "transparent",
          padding: "$10",
          border: "1px solid $neutral300",
          borderRadius: "$xm",
          "&:hover": {
            borderColor: "$info300",
            "& svg": { color: "$secondary500" },
          },
        },
      },
    },
  }),
  Na = n(L1.Content, {
    width: "var(--radix-select-trigger-width)",
    maxHeight: "var(--radix-select-content-available-height)",
    overflowY: "auto",
    borderRadius: "$sm",
    boxShadow: "-5px 5px 10px 0px rgba(86, 86, 86, 0.10)",
    backgroundColor: "$background",
  }),
  Ha = n(L1.Item, {
    padding: "$10",
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    "&:focus": { outline: "none" },
    "&:hover": {
      backgroundColor: "$secondary100",
      "& ._text": { color: "$secondary500" },
      [`.${s} &`]: { backgroundColor: "$neutral", color: "$secondary500" },
    },
  });
function Al(e) {
  let [t, r] = Ml(!1),
    l = zl(null),
    { options: a, value: p, container: c, handleItemClick: m, variant: C } = e,
    k = o(() => {
      r((h) => !h);
    }, "handleToggle"),
    S = o((h) => {
      l.current && !l.current.contains(h.target) && r(!1);
    }, "handleClickOutside");
  Dl(
    () => (
      document.addEventListener("click", S),
      () => {
        document.removeEventListener("click", S);
      }
    ),
    [],
  );
  let D = a.find((h) => h.value === p)?.label;
  return F.createElement(
    "div",
    { ref: l },
    F.createElement(
      j.Root,
      { value: p, open: t },
      F.createElement(
        Aa,
        {
          variant: C,
          onKeyDown: (h) => h.key === "Enter" && k(),
          onClick: k,
          open: t,
          "aria-label": D,
        },
        F.createElement(
          j.Value,
          null,
          F.createElement(d, { variant: "body", size: "small" }, D),
        ),
        F.createElement(
          j.Icon,
          { className: "SelectIcon" },
          F.createElement(Je, { size: 12, color: "black" }),
        ),
      ),
      F.createElement(
        j.Portal,
        { container: c },
        F.createElement(
          Na,
          { position: "popper", sideOffset: 5 },
          F.createElement(
            j.ScrollUpButton,
            { className: "SelectScrollButton" },
            F.createElement(I1, null),
          ),
          F.createElement(
            j.Viewport,
            { className: "SelectViewport" },
            F.createElement(
              j.Group,
              null,
              a.map((h) =>
                F.createElement(
                  Ha,
                  {
                    onClick: () => {
                      m && m(h), k();
                    },
                    key: h.value,
                    value: h.value,
                  },
                  F.createElement(
                    j.ItemText,
                    null,
                    F.createElement(
                      d,
                      { variant: "body", size: "small", className: "_text" },
                      h.label,
                    ),
                  ),
                  h.value === p &&
                  F.createElement(z1, { size: 14, color: "secondary" }),
                ),
              ),
            ),
          ),
          F.createElement(
            j.ScrollDownButton,
            { className: "SelectScrollButton" },
            F.createElement(Je, null),
          ),
        ),
      ),
    ),
  );
}
o(Al, "SelectComponent");
import G1, { useEffect as Ba, useRef as Nl, useState as Wa } from "react";
var Va = n("div", {
  display: "flex",
  flexDirection: "row",
  position: "relative",
  justifyContent: "space-between",
  height: "100%",
  variants: {
    type: {
      secondary: {
        border: "3px solid $neutral100",
        backgroundColor: "$neutral100",
      },
      primary: {
        $$color: "$colors$neutral200",
        [`.${s} &`]: { $$color: "$colors$neutral500" },
        borderColor: "$$color",
        borderWidth: "5px",
        borderStyle: "solid",
        backgroundColor: "$$color",
      },
    },
    borderRadius: {
      small: { borderRadius: "$xs" },
      medium: { borderRadius: "$sm" },
      full: { borderRadius: "$xm" },
    },
  },
}),
  Ea = n(ie, {
    color: "$neutral700",
    backgroundColor: "transparent",
    height: "100%",
    zIndex: 10,
    "& ._text": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    variants: {
      borderRadius: {
        small: { borderRadius: "$xs" },
        medium: { borderRadius: "$sm" },
        full: { borderRadius: "$xm" },
      },
      type: { primary: { padding: "$5 $10", height: "100%" }, secondary: {} },
      isActive: { true: { transition: "color 0.8s linear" }, false: {} },
    },
    compoundVariants: [
      {
        type: "secondary",
        isActive: !0,
        css: {
          $$color: "$colors$background",
          [`.${s} &`]: { $$color: "$colors$foreground" },
          color: "$$color",
        },
      },
      {
        type: "secondary",
        isActive: !1,
        css: {
          "&:hover": {
            backgroundColor: "$secondary100",
            color: "$secondary500",
            [`.${s} &`]: {
              backgroundColor: "transparent",
              color: "$neutral700",
            },
          },
        },
      },
      {
        type: "primary",
        isActive: !0,
        css: { color: "$secondary", "& svg": { color: "$secondary" } },
      },
      {
        type: "primary",
        isActive: !1,
        css: { "&:hover": { backgroundColor: "transparent" } },
      },
    ],
  }),
  Fa = n("div", {
    padding: "$4",
    position: "absolute",
    inset: 0,
    transition: "transform 0.2s cubic-bezier(0, 0, 0.86, 1.2)",
    "&.no-transition": { transition: "none" },
    variants: {
      type: {
        secondary: { backgroundColor: "$secondary500" },
        primary: { backgroundColor: "$background" },
      },
      borderRadius: {
        small: { borderRadius: "$xs" },
        medium: { borderRadius: "$sm" },
        full: { borderRadius: "$xm" },
      },
    },
  });
var Hl = 100;
function Vl(e) {
  let {
    items: t,
    onChange: r,
    container: l = document.body,
    value: a,
    type: p,
    borderRadius: c = "medium",
    className: m,
  } = e,
    [C, k] = Wa(0),
    S = Nl(null),
    D = t.findIndex((f) => f.id === a),
    [h, B] = Wa(!0),
    X = D * C;
  return (
    Ba(() => {
      let f = o(() => {
        if (S.current) {
          let M = S.current.getBoundingClientRect();
          k(M.width);
        }
      }, "updateTabWidth");
      return (
        f(),
        window.addEventListener("resize", f),
        () => {
          window.removeEventListener("resize", f);
        }
      );
    }, []),
    Ba(() => {
      let f = setTimeout(() => {
        B(!1), clearTimeout(f);
      }, Hl);
    }, []),
    G1.createElement(
      Va,
      { className: `_tabs ${m || ""}`, type: p, borderRadius: c },
      t.map((f, M) =>
        G1.createElement(
          P,
          {
            key: f.id,
            styles: { root: { width: "100%" } },
            container: l,
            side: "bottom",
            sideOffset: 2,
            content: f.tooltip,
            open: f.tooltip ? void 0 : !1,
          },
          G1.createElement(
            Ea,
            {
              className: "_tab",
              ref: M === 0 ? S : null,
              type: p,
              fullWidth: !0,
              disableRipple: !0,
              borderRadius: c,
              onClick: () => r(f),
              size: "small",
              isActive: f.id === a,
              variant: "default",
            },
            f.icon,
            !!f.icon &&
            !!f.title &&
            G1.createElement(g, { direction: "horizontal", size: "2" }),
            f.title,
          ),
        ),
      ),
      G1.createElement(Fa, {
        type: p,
        borderRadius: c,
        className: `_backdrop-tab ${h ? "no-transition" : ""}`,
        css: { width: C, transform: `translateX(${X}px)` },
      }),
    )
  );
}
o(Vl, "TabsComponent");
import { i18n as El } from "@lingui/core";
import St from "react";
var Za = n("div", {
  display: "grid",
  gap: "$8",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  overflow: "auto",
});
function Fl(e) {
  let { open: t, list: r, onSelect: l, onClose: a } = e;
  return St.createElement(
    rt,
    {
      title: El.t("Connect Wallets"),
      open: t,
      onClose: a,
      styles: { container: { width: "75%", maxWidth: "30rem", height: "60%" } },
    },
    St.createElement(
      Za,
      null,
      r.map((p) => St.createElement(yt, { ...p, key: p.title, onClick: l })),
    ),
  );
}
o(Fl, "ConnectWalletsModal");
import K1 from "react";
var Bl = n("ul", { padding: "$0 $0 $40 $0", margin: 0 }),
  Wl = n("li", { paddingBottom: "$10" }),
  Zl = n(d, { display: "block" });
function ql({ messages: e }) {
  return K1.createElement(
    K1.Fragment,
    null,
    K1.createElement(
      Bl,
      null,
      e.map((t, r) => {
        let l = r + t;
        return K1.createElement(
          Wl,
          { key: l },
          K1.createElement(
            Zl,
            { variant: "body", size: "medium", color: "$neutral700" },
            t,
          ),
        );
      }),
    ),
  );
}
o(ql, "BalanceErrors");
import { i18n as n2 } from "@lingui/core";
import I from "react";
var X1 = {
  SWAP_FROM_INPUT_CONTAINER_ID: "rango-swap-from-input-container",
  SWAP_TO_INPUT_CONTAINER_ID: "rango-swap-to-input-container",
  SWAP_FROM_CHAIN_IMAGE_ID: "rango-swap-from-chain-image",
  SWAP_TO_CHAIN_IMAGE_ID: "rango-swap-to-chain-image",
};
var Po = z(),
  qa = n("div", {
    $$color: "$colors$neutral100",
    [`.${s} &`]: { $$color: "$colors$neutral300" },
    backgroundColor: "$$color",
    borderRadius: "$xm",
    padding: "$15",
    variants: {
      sharpBottomStyle: {
        true: { borderBottomLeftRadius: "$0", borderBottomRightRadius: "$0" },
      },
    },
    [`& .${Po}`]: {
      $$color: "$colors$neutral600",
      [`.${s} &`]: { $$color: "$colors$neutral700" },
      color: "$$color",
    },
  }),
  ja = n(O1, {
    width: "100%",
    padding: "0",
    fontSize: "$18",
    lineHeight: "$26",
    fontWeight: "$medium",
    textAlign: "right",
    "&:disabled": { cursor: "unset" },
    variants: {
      isZero: {
        true: {
          $$color: "$colors$neutral700",
          [`.${s} &`]: { $$color: "$colors$neutral900" },
          color: "$$color",
        },
      },
    },
  }),
  Oa = n(ie, {
    $$color: "$colors$info300",
    [`.${s} &`]: { $$color: "$colors$secondary800" },
    backgroundColor: "$$color",
    "& ._typography": {
      color: "$colors$secondary500",
      [`.${s} &`]: { color: "$colors$secondary400" },
    },
  }),
  Ya = n("div", {
    display: "flex",
    width: "100%",
    textAlign: "right",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    variants: {
      hasWarning: {
        true: { "& ._typography": { color: "$warning500" } },
        false: {
          "& ._typography": {
            $$color: "$colors$neutral600",
            [`.${s} &`]: { $$color: "$colors$neutral700" },
            color: "$$color",
          },
        },
      },
    },
  }),
  Ua = z({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  _a = z({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  xt = z({ display: "flex", justifyContent: "center", alignItems: "center" }),
  Ra = z({
    width: "45%",
    maxWidth: "170px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "end",
    flexGrow: 1,
  }),
  Ga = z({ paddingBottom: "$5" }),
  Ka = n(d, {
    width: "100%",
    textAlign: "right",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });
import { i18n as o2 } from "@lingui/core";
import Q from "react";
var Xa = n(ie, {
  maxWidth: "180px",
  minWidth: "130px",
  flexGrow: 1,
  backgroundColor: "transparent",
  borderRadius: "$xs",
  color: "$neutral700",
  "&:disabled": { color: "$neutral600" },
  "&:focus-visible": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$info700" },
    backgroundColor: "$$color !important",
    outline: 0,
  },
  "&:disabled:hover": { backgroundColor: "transparent" },
  "&:hover": {
    $$color: "$colors$secondary100",
    [`.${s} &`]: { $$color: "$colors$neutral100" },
    backgroundColor: "$$color !important",
    [`& ${ho}`]: {
      $$color: "$colors$secondary100",
      [`.${s} &`]: { $$color: "$colors$neutral100" },
      backgroundColor: "$$color !important",
    },
  },
}),
  Lt = z(),
  Ja = n("div", {
    maxWidth: "170px",
    padding: "$2 $5",
    display: "flex",
    borderRadius: "$xs",
    justifyContent: "start",
    boxSizing: "border-box",
    alignItems: "center",
    [`& .${Lt}`]: {
      $$color: "$colors$neutral600",
      [`.${s} &`]: { $$color: "$colors$neutral700" },
      color: "$$color",
    },
  }),
  Qa = z({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    paddingLeft: "$10",
    flexGrow: 1,
    textAlign: "left",
  }),
  e2 = z({ width: "100%", padding: "$5 $0" });
function t2(e) {
  let {
    error: t,
    chainImage: r,
    tokenImage: l,
    tokenSymbol: a,
    chain: p,
    chianImageId: c,
    onClick: m,
    loading: C,
  } = e;
  return Q.createElement(
    Xa,
    { variant: "default", disabled: t || C, onClick: m },
    Q.createElement(
      Ja,
      null,
      Q.createElement(E, {
        chianImageId: c,
        size: "large",
        useAsPlaceholder: t,
        chainImage: r,
        tokenImage: l,
        loading: C,
      }),
      Q.createElement(
        "div",
        { className: Qa() },
        C
          ? Q.createElement(
            "div",
            { className: e2() },
            Q.createElement(T, { variant: "text", size: "large" }),
            Q.createElement(g, { size: 8 }),
            Q.createElement(T, { variant: "text", size: "medium" }),
          )
          : Q.createElement(
            Q.Fragment,
            null,
            Q.createElement(
              d,
              { variant: "title", size: "medium" },
              t || (!C && !a) ? o2.t("Select Token") : a,
            ),
            Q.createElement(
              d,
              { variant: "body", size: "medium", className: Lt() },
              t || (!C && !p) ? o2.t("Select Chain") : p,
            ),
          ),
      ),
    ),
  );
}
o(t2, "TokenSection");
function jl(e) {
  let t =
    "balance" in e && !e.loading && !e.loadingBalance && e.token.displayName,
    r = "balance" in e && (e.loading || e.loadingBalance);
  return I.createElement(
    qa,
    {
      id:
        e.mode === "To"
          ? X1.SWAP_TO_INPUT_CONTAINER_ID
          : X1.SWAP_FROM_INPUT_CONTAINER_ID,
      sharpBottomStyle: e.sharpBottomStyle,
    },
    I.createElement(
      "div",
      { className: Ga() },
      I.createElement(
        "div",
        { className: _a() },
        I.createElement(
          d,
          { variant: "body", size: "small", className: Po() },
          e.label,
        ),
        t &&
        I.createElement(
          "div",
          { className: xt() },
          I.createElement(
            d,
            { className: Po(), variant: "body", size: "xsmall" },
            n2.t("Balance"),
            ": ",
            e.balance,
          ),
          I.createElement(g, { direction: "horizontal", size: 4 }),
          I.createElement(
            Oa,
            {
              variant: "default",
              size: "xsmall",
              onClick: e.onSelectMaxBalance,
            },
            I.createElement(
              d,
              { variant: "body", size: "xsmall" },
              n2.t("Max"),
            ),
          ),
        ),
        r &&
        I.createElement(
          "div",
          { className: xt() },
          I.createElement(T, { variant: "text", size: "large", width: 105 }),
        ),
      ),
    ),
    I.createElement(
      "div",
      { className: Ua() },
      I.createElement(t2, {
        chain: e.chain.displayName,
        chianImageId:
          e.mode === "To"
            ? X1.SWAP_TO_CHAIN_IMAGE_ID
            : X1.SWAP_FROM_CHAIN_IMAGE_ID,
        tokenSymbol: e.token.displayName,
        error: e.error,
        chainImage: e.chain.image,
        tokenImage: e.token.image,
        onClick: e.onClickToken,
        loading: e.loading,
      }),
      I.createElement(
        "div",
        { className: Ra() },
        e.loading || (e.mode === "To" && e.fetchingQuote)
          ? I.createElement(
            I.Fragment,
            null,
            I.createElement(T, { variant: "text", size: "large" }),
            I.createElement(g, { size: 8 }),
            I.createElement(T, { variant: "text", size: "medium" }),
          )
          : I.createElement(
            I.Fragment,
            null,
            I.createElement(
              P,
              {
                content: e.price.realValue,
                container: e.tooltipContainer,
                open:
                  !e.price.realValue || e.price.realValue === "0"
                    ? !1
                    : void 0,
              },
              I.createElement(ja, {
                disabled: e.disabled || e.mode === "To",
                style: { padding: 0 },
                value: e.price.value,
                type: "onInputChange" in e ? "number" : "text",
                size: "large",
                placeholder: "0",
                variant: "ghost",
                isZero: e.price.value === "0",
                min: 0,
                ...("onInputChange" in e && {
                  onChange: (l) => e.onInputChange(l.target.value),
                }),
              }),
            ),
            "percentageChange" in e
              ? I.createElement(We, {
                size: "medium",
                tooltipProps: {
                  container: e.tooltipContainer,
                  side: "bottom",
                },
                outputUsdValue: e.price.usdValue,
                realOutputUsdValue: e.price.realUsdValue,
                error: e.price.error,
                percentageChange: e.percentageChange,
                warningLevel: e.warningLevel,
              })
              : I.createElement(
                P,
                {
                  content: e.price.realUsdValue,
                  container: e.tooltipContainer,
                  open:
                    !e.price.realUsdValue || e.price.realUsdValue === "0"
                      ? !1
                      : void 0,
                  side: "bottom",
                },
                I.createElement(
                  Ya,
                  { hasWarning: !!e.price.error },
                  I.createElement(
                    Ka,
                    { variant: "body", size: "medium" },
                    e.price.usdValue
                      ? e.price.usdValue === "0"
                        ? "0.00"
                        : `~$${e.price.usdValue}`
                      : e.price.error,
                  ),
                ),
              ),
          ),
      ),
    ),
  );
}
o(jl, "SwapInput");
import Ol from "copy-to-clipboard";
import Tt from "react";
function Yl(e) {
  let [t, r] = Tt.useState(!1),
    l = Tt.useCallback((a) => {
      Ol(a.toString()), r(!0);
    }, []);
  return (
    Tt.useEffect(() => {
      let a;
      return (
        t && e && (a = setTimeout(() => r(!1), e)),
        () => {
          clearTimeout(a);
        }
      );
    }, [t, e]),
    [t, l]
  );
}
o(Yl, "useCopyToClipboard");


export {
  S2 as AddIcon,
  po as Alert,
  T2 as AutoThemeIcon,
  P2 as AutorenewIcon,
  ql as BalanceErrors,
  da as Bengali,
  p1 as BlockchainCategories,
  _o as BlockchainsChip,
  M2 as BorderRadiusIcon,
  Go as BottomLogo,
  H2 as BridgesIcon,
  I0 as BullhornIcon,
  ie as Button,
  E as ChainToken,
  z0 as ChainsIcon,
  v6 as Checkbox,
  Je as ChevronDownIcon,
  W2 as ChevronLeftIcon,
  Q1 as ChevronRightIcon,
  I1 as ChevronUpIcon,
  ua as Chinese,
  b6 as Chip,
  P1 as CloseIcon,
  w6 as Collapsible,
  B6 as CollapsibleMessageBox,
  N0 as ColorsIcon,
  D1 as CompleteIcon,
  Fl as ConnectWalletsModal,
  X2 as CopyIcon,
  Ao as CosmosCategoryIcon,
  ts as CustomColorsIcon,
  is as DarkModeIcon,
  ls as DeleteIcon,
  ds as DesktopIcon,
  E0 as DiscordIcon,
  g as Divider,
  hs as DocumentIcon,
  z1 as DoneIcon,
  ma as English,
  $e as ErrorIcon,
  No as EvmCategoryIcon,
  Ss as ExchangeIcon,
  Ts as ExitIcon,
  Ps as ExplorerIcon,
  Ms as ExternalLinkIcon,
  ha as Finland,
  Hs as FontIcon,
  ga as French,
  P6 as FullExpandedQuote,
  Vo as GasIcon,
  Ca as German,
  fa as Greece,
  ul as GroupedVirtualizedList,
  ae as HEADER_CORNDER_RADIUS,
  z6 as Header,
  Ws as HeightIcon,
  ya as Hindi,
  p2 as I18nManager,
  ce as IconButton,
  W as Image,
  co as ImageContainer,
  js as InProgressIcon,
  wa as Indonesian,
  W0 as InfinityIcon,
  A1 as InfoErrorIcon,
  Rs as InfoIcon,
  va as Italian,
  ba as Japanese,
  j0 as KeyIcon,
  Xs as LanguageIcon,
  e3 as LightModeIcon,
  n3 as LinkIcon,
  Cl as List,
  U1 as ListItem,
  gl as ListItemButton,
  Fo as LoadingIcon,
  l3 as LogoWithTextIcon,
  ka as Malay,
  U0 as MediumIcon,
  d3 as MenuIcon,
  it as MessageBox,
  rt as Modal,
  nt as ModalHeader,
  h3 as MoreIcon,
  Sa as Netherlands,
  Pe as NextIcon,
  k3 as NoNotificationIcon,
  f3 as NoRouteIcon,
  fl as NotFound,
  w2 as NotSelectableTypography,
  L3 as NotificationNumberIcon,
  I3 as NotificationsIcon,
  Wo as NumberIcon,
  Zo as OtherCategoryIcon,
  H3 as PinIcon,
  xa as Poland,
  Il as Popover,
  La as Portuguese,
  We as PriceImpact,
  B1 as QuoteCost,
  Jo as QuoteTag,
  at as Radio,
  W6 as RadioGroup,
  st as RadioRoot,
  F3 as RefreshIcon,
  R6 as RefreshProgressButton,
  Z3 as ReportIcon,
  O3 as RequestIcon,
  _3 as ReverseIcon,
  K3 as RouteIcon,
  Ta as Russian,
  jo as SearchIcon,
  Al as Select,
  X6 as SelectableCategoryList,
  dl as SelectableWallet,
  G0 as SettingsIcon,
  T as Skeleton,
  $a as Spanish,
  Ae as Spinner,
  xl as StepDetailsSample,
  J0 as StyleIcon,
  o0 as SupportIcon,
  r0 as SwapIcon,
  jl as SwapInput,
  Q6 as SwapListItem,
  Ia as Swedish,
  el as Switch,
  Vl as Tabs,
  o6 as TelegramIcon,
  O1 as TextField,
  Pa as Thai,
  Oo as TimeIcon,
  ft as Toast,
  al as ToastProvider,
  yl as TokenAmount,
  P as Tooltip,
  p0 as TransactionIcon,
  u0 as TuneIcon,
  Da as Turkish,
  d as TypographySample,
  X1 as UI_ID,
  za as Ukrainian,
  Yo as UtxoCategoryIcon,
  Ma as Vietnamese,
  ml as VirtualizedList,
  yt as Wallet,
  f0 as WalletIcon,
  Y1 as WalletState,
  ze as WarningIcon,
  k0 as WidgetIcon,
  L0 as WidthIcon,
  r6 as XIcon,
  M5 as config,
  Ot as createTheme,
  z as css,
  h2 as darkColors,
  s as darkTheme,
  G6 as getCategoriesCount,
  z5 as globalCss,
  oe as keyframes,
  Yt as lightTheme,
  n as styled,
  d2 as theme,
  Yl as useCopyToClipboard,
  Ct as useToast,
};
//# sourceMappingURL=index.js.map
