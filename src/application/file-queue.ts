class FileProcessingQueue {
    private queue: (() => Promise<void>)[] = [];
    private processing = false;

    add(task: () => Promise<void>) {
        this.queue.push(task);
        this.processNext();
    }

    private async processNext() {
        if (this.processing || this.queue.length === 0) return;
        this.processing = true;

        const nextTask = this.queue.shift();
        if (nextTask) {
            try {
                await nextTask();
            } catch (error) {
                console.error("Error processing task in queue:", error);
            }
        }

        this.processing = false;
        this.processNext();
    }
}

const fileQueue = new FileProcessingQueue();

export default fileQueue;