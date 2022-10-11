import { computed } from 'vue'

// by convention, composable function names start with "use"
export const useChunk = (data, chunkLength) => {
    const chunkedArray = computed(() => {
        const chunkedArray = []
        const mappedArray = data.map(d => d)
        for (let i = 0; i < mappedArray.length; i += chunkLength) {
            const chunk = mappedArray.slice(i, i + chunkLength);
            chunkedArray.push(chunk);
        }
        return chunkedArray  ;
    })
    return {chunkedArray}
}