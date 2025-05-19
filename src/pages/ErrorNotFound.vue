<template>
  <div class="fullscreen bg-gradient text-white text-center q-pa-md flex flex-center">
    <div class="error-content">
      <div class="error-code animate-bounce">
        404
      </div>

      <div class="text-h2 error-message animate-fade">
        Oops. Nada por aqui...
      </div>

      <q-btn
        class="q-mt-xl home-btn animate-pulse"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Voltar para Home"
        no-caps
        icon="home"
      />
    </div>
  </div>
</template>

<style lang="scss">
.bg-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
}

.error-content {
  max-width: 600px;
  padding: 20px;
}

.error-code {
  font-size: 30vh;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 8px 8px 0 rgba(0,0,0,0.1);
  color: rgba(255,255,255,0.9);
}

.error-message {
  opacity: 0.8;
  margin-bottom: 30px;
  font-weight: 300;
}

.home-btn {
  transition: all 0.3s ease;
  border-radius: 50px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-fade {
  animation: fadeIn 1.5s ease-in-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
