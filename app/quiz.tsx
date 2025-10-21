import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
 
import { QuizState } from '@/types';
 
import Button from '@/components/Button';
import QuestionCard from '@/components/QuestionCard';
import Timer from '@/components/Timer';
import { QUESTIONS } from '@/contstants/questions';

const QUESTION_TIME = 30; // 30 seconds per question

export default function QuizScreen() {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: Array(QUESTIONS.length).fill(null).map((_, index) => ({
      questionId: QUESTIONS[index].id,
      selectedOption: null,
      isCorrect: false,
      timeSpent: 0
    })),
    startTime: new Date(),
    endTime: null
  });

  const currentQuestionData = QUESTIONS[quizState.currentQuestion];
  const currentAnswer = quizState.answers[quizState.currentQuestion];

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = {
      ...newAnswers[quizState.currentQuestion],
      selectedOption: optionIndex,
      isCorrect: optionIndex === currentQuestionData.correctAnswer
    };
    
    setQuizState(prev => ({ ...prev, answers: newAnswers }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < QUESTIONS.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const handleTimeUp = () => {
    // Auto-move to next question when time runs out
    if (quizState.currentQuestion < QUESTIONS.length - 1) {
      handleNext();
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const endTime = new Date();
    setQuizState(prev => ({ ...prev, endTime }));
    
    // Navigate to results with quiz data
    router.push({
      pathname: '/results',
      params: {
        answers: JSON.stringify(quizState.answers),
        startTime: quizState.startTime.toISOString(),
        endTime: endTime.toISOString()
      }
    });
  };

  const calculateProgress = () => {
    return ((quizState.currentQuestion + 1) / QUESTIONS.length) * 100;
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header */}
      <View className="pt-12 px-6 pb-4 bg-white shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">
            Question {quizState.currentQuestion + 1} of {QUESTIONS.length}
          </Text>
          <Text className="text-sm text-gray-600">
            {Math.round(calculateProgress())}%
          </Text>
        </View>
        
        {/* Progress Bar */}
        <View className="h-2 bg-gray-200 rounded-full">
          <View 
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingVertical: 24 }}>
        {/* Timer */}
        <Timer 
          duration={QUESTION_TIME}
          onTimeUp={handleTimeUp}
          isActive={true}
        />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestionData}
          selectedAnswer={currentAnswer.selectedOption}
          onAnswerSelect={handleAnswerSelect}
        />
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 pt-4 bg-white shadow-lg">
        <View className="flex-row justify-between space-x-4">
          <Button
            title="Previous"
            variant="outline"
            onPress={handlePrevious}
            disabled={quizState.currentQuestion === 0}
          />
          
          <Button
            title={quizState.currentQuestion === QUESTIONS.length - 1 ? "Finish" : "Next"}
            variant="primary"
            onPress={handleNext}
          />
        </View>
      </View>
    </View>
  );
}