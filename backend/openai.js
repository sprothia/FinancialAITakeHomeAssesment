const OpenAI = require('openai').OpenAI
const openai = new OpenAI({apiKey: "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"})

console.log('running')
async function main(inputText) {

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: 'You are a chatbot that will be given a bunch of income-statement text for a certain company, and you have to surface financial performance insights and extract the most relevant financial metrics from the text like Revenue, Gross Profit, Operating Expenses and more. You also have to find insights such as growth over a period, revenue trends, profitability analysis, margin, and anything worth reporting regarding the financial data. You will return a JSON Object that I can parse later on, it will have 2 parts, one is the numbers/metrics you in one tree, and the other is insights which will be sentences. Also for the numbers/metrics part, only return me the latest year, insights should not be affected. I want you to keep the same JSON structure everytime you are asked to surface a statement, and only only return the JSON object, nothing else. I should be able to parse your response. The structure of the JSON object should be more generalized for the numbers/metrics, I dont need specifics, I only want 4 key-value pairs for the financial number/metrics tree, nothing else: Total Revenue, Total Expenses, Income/Gains, Losses, dont give me a breakdown of each, just the number. Here is final structure of the json object you should return {"financial_metrics": {"revenue": , "expenses": , "operating_income": , "gross_profit": ,}, {"Insights": []}}'
            },
            {
                role: 'user',
                content: `Extract the relevant financial metrics and any insights that is worthy of reporting to investors and partners for this venture capital fund: Here it is: ${inputText}`
            }
        ],
    })

    return response.choices[0].message.content;

}

module.exports = main;