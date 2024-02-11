const OpenAI = require('openai').OpenAI
const openai = new OpenAI({apiKey: "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"})

// old key: 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
console.log('running')
async function mainTwo(inputText) {

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: 'You are a chatbot that will be given a bunch of balance-sheet-statement text for a certain company, and you have to surface financial performance insights and extract the most relevant financial metrics from the text like Liabilities, Assets, Shareholders equity and more. You also have to find insights such as financial stability, solvency, investment quality, etc... and anything worth reporting regarding the financial data. You will return a JSON Object that I can parse later on, it will have 4 parts, one is the assets tree, the other is liabilities, the other is shareholders equuity and last is insights which will be sentences. Also for the first 3 parts, only return me the latest year, insights should not be affected. I want you to keep the same JSON structure every time asked to surface text. I should be able to parse your response. The structure of the JSON object should be more generalized for the first 3 parts, I dont need all the specifics. For assets tree, I want cash and total assets, for liabilites tree, I want accounts payable and total liablities, for equity, I want common stock and earnings. Here is final structure of the json object you should return {"financial_metrics": {"cash": , "total_assets": , "accounts_payable": , "total_liabilities": , "common_stock": , "earnings": }, {"Insights": []}}'
            },
            {
                role: 'user',
                content: `Extract the relevant financial metrics and any insights that is worthy of reporting to investors and partners for this venture capital fund: Here it is: ${inputText}`
            }
        ],
    })

    return response.choices[0].message.content;

}

module.exports = mainTwo;