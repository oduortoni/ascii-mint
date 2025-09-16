package auth

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	collection *mongo.Collection
	jwtSecret  string
}

func NewService(collection *mongo.Collection, jwtSecret string) *Service {
	return &Service{
		collection: collection,
		jwtSecret:  jwtSecret,
	}
}

func (s *Service) Register(ctx context.Context, req RegisterRequest) (*User, error) {
	var existingUser User
	err := s.collection.FindOne(ctx, bson.M{"email": req.Email}).Decode(&existingUser)
	if err == nil {
		return nil, errors.New("user already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := User{
		Email:     req.Email,
		Password:  string(hashedPassword),
		CreatedAt: time.Now().UTC(),
	}

	result, err := s.collection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = result.InsertedID.(primitive.ObjectID)
	return &user, nil
}

func (s *Service) Login(ctx context.Context, req LoginRequest) (*User, error) {
	var user User
	err := s.collection.FindOne(ctx, bson.M{"email": req.Email}).Decode(&user)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	return &user, nil
}

func (s *Service) GetUserByID(ctx context.Context, userID string) (*User, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}

	var user User
	err = s.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
