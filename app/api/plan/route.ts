import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { PlanSchema, sampleMeals, totalMeals } from '@/lib/planner';
export async function POST(request: Request) {
 try {
  const profile = await request.json();
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ day: new Date().toLocaleDateString('en-US',{weekday:'long'}), meals: sampleMeals, dailyTotals: totalMeals(sampleMeals), source:'sample' });
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({ model:'gpt-4o-mini', response_format:{type:'json_object'}, messages:[{role:'system',content:'Create a practical personalized one-day meal plan. Respond only with valid JSON matching {day:string,meals:[{type,name,ingredients:[{name,quantity}],calories,protein,carbs,fat,preparationTime,instructions}],dailyTotals:{calories,protein,carbs,fat}}. Include five meals.'},{role:'user',content:`Profile: ${JSON.stringify(profile)}`}],temperature:0.7 });
  const data=PlanSchema.parse(JSON.parse(completion.choices[0].message.content||''));
  return NextResponse.json(data);
 } catch { return NextResponse.json({error:'We couldn’t create your plan just now. Please try again.'},{status:500}); }
}
