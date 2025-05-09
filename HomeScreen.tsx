import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import PlayerHand, { Card } from 'PlayerHand.tsx';
import UnoCard from 'UnoCard.tsx';

const COLORS: Array<'red' | 'blue' | 'green' | 'yellow'> = ['red', 'blue', 'green', 'yellow'];
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function HomeScreen() {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [opponentCardCount, setOpponentCardCount] = useState(7);

  const generateRandomCard = (): Card => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const value = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    return {
      id: Math.random().toString(),
      color,
      value,
      type: 'number',
    };
  };

  const initializeGame = () => {
    const initialCards = Array(7).fill(null).map(generateRandomCard);
    setPlayerCards(initialCards);
    setCurrentCard(generateRandomCard());
    setIsPlayerTurn(true);
    setOpponentCardCount(7);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardPlay = (card: Card) => {
    if (!currentCard) return;
    
    if (card.color === currentCard.color || card.value === currentCard.value) {
      setCurrentCard(card);
      setPlayerCards(cards => cards.filter(c => c.id !== card.id));
      setIsPlayerTurn(false);
      
      if (playerCards.length === 1) {
        toast.message("UNO!");
      }
      
      // Simulate opponent's turn
      setTimeout(() => {
        setOpponentCardCount(prev => prev - 1);
        setCurrentCard(generateRandomCard());
        setIsPlayerTurn(true);
      }, 1500);
    } else {
      toast.error("Invalid move!");
    }
  };

  const drawCard = () => {
    if (!isPlayerTurn) return;
    const newCard = generateRandomCard();
    setPlayerCards(cards => [...cards, newCard]);
    setIsPlayerTurn(false);
    
    // Simulate opponent's turn
    setTimeout(() => {
      setCurrentCard(generateRandomCard());
      setIsPlayerTurn(true);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.opponentHand}>
        {Array(opponentCardCount).fill(null).map((_, index) => (
          <View key={index} style={styles.opponentCard} />
        ))}
      </View>

      <View style={styles.gameArea}>
        {currentCard && (
          <View style={styles.currentCardContainer}>
            <UnoCard
              color={currentCard.color}
              value={currentCard.value}
              type={currentCard.type}
              isPlayable={false}
            />
          </View>
        )}
        
        <Pressable style={styles.deck} onPress={drawCard}>
          <MaterialCommunityIcons name="cards" size={40} color="white" />
        </Pressable>
      </View>

      <View style={styles.playerArea}>
        <PlayerHand
          cards={playerCards}
          onCardPlay={handleCardPlay}
          isCurrentPlayer={isPlayerTurn}
        />
      </View>

      <View style={styles.turnIndicator}>
        <Text style={styles.turnText}>
          {isPlayerTurn ? "Your turn" : "Opponent's turn"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  opponentHand: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    flexWrap: 'wrap',
  },
  opponentCard: {
    width: 30,
    height: 45,
    backgroundColor: '#E74C3C',
    margin: 2,
    borderRadius: 4,
    transform: [{ rotate: '180deg' }],
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  currentCardContainer: {
    marginRight: 20,
  },
  deck: {
    width: 70,
    height: 100,
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  playerArea: {
    padding: 20,
  },
  turnIndicator: {
    padding: 10,
    alignItems: 'center',
  },
  turnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});