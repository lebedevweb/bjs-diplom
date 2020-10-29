'use strict';

// Выход из личного кабинета
const logoutBtn = new LogoutButton();

logoutBtn.action = function () {
  ApiConnector.logout(callback => {
      if (callback.success) {
        location.reload();
      }
    });
}

// Получение информации о пользователе
ApiConnector.current(callback => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
    }
  }
)

// Получение текущих курсов валюты
const getStocks = () => ApiConnector.getStocks(callback => {
  if (callback.success) {
    const ratesBoard = new RatesBoard();
    ratesBoard.clearTable();
    ratesBoard.fillTable(callback.data);
  }
  setInterval(getStocks, 60000);
});

getStocks();

// ===================
// Операции с деньгами
// ===================
const moneyManager = new MoneyManager();
// Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, callback => {
      if (callback.success) {
        ProfileWidget.showProfile(callback.data);
        moneyManager.setMessage(true, "Пополнение баланса выполненно успешно!");
      } else {
        moneyManager.setMessage(false, "Ошибка при пополнении баланса!");
      }
    });
}
// Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, callback => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(true, "Конвертация валюты прошло успешно!");
    } else {
      moneyManager.setMessage(false, "Ошибка при конвертации валюты!");
    }
  });
}
// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, callback => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(true, "Конвертация валюты прошло успешно!");
    } else {
      moneyManager.setMessage(false, "Ошибка при конвертации валюты!");
    }
  });
}
// ==================
// Работа с избранным
// ==================
const favoritesWidget = new FavoritesWidget();
// Начальный список избранного
ApiConnector.getFavorites(callback => {
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    moneyManager.updateUsersList(callback.data);
  }
});
// Добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data,callback => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage(true, "Пользователь добавлен в список избранных!");
    } else {
      favoritesWidget.setMessage(false, "Ошибка при добавлении в избранное!");
    }
  });
}
// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, callback => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage(true, "Пользователь удален из списка избранных!");
    } else {
      favoritesWidget.setMessage(false, "Ошибка при удалении из избранного!");
    }
  });
}
//