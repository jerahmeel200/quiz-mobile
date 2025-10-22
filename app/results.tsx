import Button from '@/components/Button';
import QuestionCard from '@/components/QuestionCard';
import { QUESTIONS } from '@/contstants/questions';
import { Answer } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'score' | 'review'>('score');

  const answers: Answer[] = JSON.parse(params.answers as string);
  const startTime = new Date(params.startTime as string);
  const endTime = new Date(params.endTime as string);

  const calculateScore = () => answers.filter(a => a.isCorrect).length;
  const calculatePercentage = () => (calculateScore() / QUESTIONS.length) * 100;

  const getTimeSpent = () => {
    const diff = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { minutes, seconds };
  };

  const getPerformanceMessage = () => {
    const pct = calculatePercentage();
    if (pct >= 90) return 'Excellent! 🎉';
    if (pct >= 70) return 'Great job! 👍';
    if (pct >= 50) return 'Good effort! 💪';
    return 'Keep practicing! 📚';
  };

  const score = calculateScore();
  const percentage = calculatePercentage();
  const timeSpent = getTimeSpent();
  const performanceMessage = getPerformanceMessage();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#eef2ff', // matches gradient fallback
        paddingBottom: insets.bottom, // keeps bottom buttons visible
      }}
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View className="pt-4 px-6 pb-6 bg-white shadow-sm">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
          Quiz Completed!
        </Text>
        <Text className="text-lg text-center text-gray-600">{performanceMessage}</Text>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row bg-white px-6 border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 py-4 border-b-2 ${
            activeTab === 'score' ? 'border-blue-500' : 'border-transparent'
          }`}
          onPress={() => setActiveTab('score')}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === 'score' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            Score
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-4 border-b-2 ${
            activeTab === 'review' ? 'border-blue-500' : 'border-transparent'
          }`}
          onPress={() => setActiveTab('review')}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === 'review' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            Review
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'score' ? (
          // --- Score Tab ---
          <View className="items-center">
            <View className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-100 w-full max-w-sm">
              {/* Score Circle */}
              <View className="items-center mb-8">
                <View className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 justify-center items-center shadow-lg">
                  <Text className="text-5xl font-bold text-white">
                    {score}/{QUESTIONS.length}
                  </Text>
                  <Text className="text-3xl text-white mt-2">
                    {Math.round(percentage)}%
                  </Text>
                </View>
              </View>

              {/* Stats */}
              <View className="space-y-4">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Correct Answers:</Text>
                  <Text className="font-semibold text-green-600">{score}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Incorrect Answers:</Text>
                  <Text className="font-semibold text-red-600">
                    {QUESTIONS.length - score}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Time Spent:</Text>
                  <Text className="font-semibold text-gray-700">
                    {timeSpent.minutes}m {timeSpent.seconds}s
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Performance:</Text>
                  <Text className="font-semibold text-blue-600">
                    {performanceMessage}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          // --- Review Tab ---
          <View className="space-y-6">
            {QUESTIONS.map((question, index) => (
              <View key={question.id} className="mb-6">
                <QuestionCard
                  question={question}
                  selectedAnswer={answers[index].selectedOption}
                  correctAnswer={question.correctAnswer}
                  isReview
                  onAnswerSelect={() => {}}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View
        className="px-6 pt-4 "
        style={{ paddingBottom: insets.bottom + 8 }}
      >
        <View className=" mb-3">
          <Button
            title="Take Quiz Again"
            variant="primary"
            onPress={() => router.navigate('/quiz')}
          />
           </View>
           <View>

          <Button
            title="Back to Home"
            variant="outline"
            onPress={() => router.navigate('/')}
          />
           </View>
       
      </View>
    </SafeAreaView>
  );
}
