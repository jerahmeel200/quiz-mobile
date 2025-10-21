import { Question } from '@/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (optionIndex: number) => void;
  isReview?: boolean;
  correctAnswer?: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  isReview = false,
  correctAnswer
}: QuestionCardProps) {
  const getOptionStyle = (optionIndex: number) => {
    if (!isReview) {
      return selectedAnswer === optionIndex
        ? 'bg-blue-500 border-blue-500'
        : 'bg-white border-gray-300';
    }

    // Review mode styles
    if (optionIndex === correctAnswer) {
      return 'bg-green-500 border-green-500';
    }
    if (optionIndex === selectedAnswer && selectedAnswer !== correctAnswer) {
      return 'bg-red-500 border-red-500';
    }
    return 'bg-white border-gray-300';
  };

  const getTextStyle = (optionIndex: number) => {
    if (!isReview) {
      return selectedAnswer === optionIndex ? 'text-white' : 'text-gray-700';
    }

    if (optionIndex === correctAnswer || 
        (optionIndex === selectedAnswer && selectedAnswer !== correctAnswer)) {
      return 'text-white';
    }
    return 'text-gray-700';
  };

  return (
    <View className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-100">
      <View className="mb-2">
        <Text className="text-sm text-blue-500 font-semibold">
          {question.category}
        </Text>
      </View>
      
      <Text className="text-xl font-bold text-gray-800 mb-6 leading-7">
        {question.question}
      </Text>

      <View className="space-y-3">
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => !isReview && onAnswerSelect(index)}
            disabled={isReview}
            className={`border-2 rounded-2xl p-4 transition-all ${getOptionStyle(index)}`}
          >
            <Text className={`font-medium ${getTextStyle(index)}`}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isReview && selectedAnswer !== null && (
        <View className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <Text className="text-center text-blue-700 font-semibold">
            {selectedAnswer === correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
          </Text>
        </View>
      )}
    </View>
  );
}