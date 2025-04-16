import { View, ScrollView, StyleSheet } from 'react-native';
import UnoCard from 'UnoCard.tsx';
import { CardColor, CardType } from 'UnoCard.tsx';

export interface Card {
  id: string;
  color: CardColor;
  value: string | number;
  type: CardType;
}

interface PlayerHandProps {
  cards: Card[];
  onCardPlay: (card: Card) => void;
  isCurrentPlayer: boolean;
}

export default function PlayerHand({ cards, onCardPlay, isCurrentPlayer }: PlayerHandProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cards.map((card) => (
          <UnoCard
            key={card.id}
            color={card.color}
            value={card.value}
            type={card.type}
            onPress={() => onCardPlay(card)}
            isPlayable={isCurrentPlayer}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
});